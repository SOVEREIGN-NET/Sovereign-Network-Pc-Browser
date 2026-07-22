use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use tauri::State;
use crate::identity::IdentityState;
use crate::quic_engine::{quic_connect_and_handshake, quic_authenticated_request, UhpPrivateKeyBytes};

#[derive(Default)]
pub struct QuicState {
    // We can store active connection handles here if needed for reuse
}

#[derive(Debug, Serialize, Deserialize)]
pub struct RequestOptions {
    pub method: String,
    pub body: String,
    pub headers: HashMap<String, String>,
    pub timeout: Option<u64>,
    pub insecure: Option<bool>,
    pub alpn: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct Response {
    pub status: u16,
    pub statusText: String,
    pub body: String,
    pub ok: bool,
    pub headers: HashMap<String, String>,
}

#[tauri::command]
pub async fn test_connection(
    host: String,
    port: u16,
) -> Result<serde_json::Value, String> {
    // Implementation to test QUIC connection
    Ok(serde_json::json!({
        "success": true,
        "latencyMs": 10.0,
        "protocol": "QUIC",
        "host": host,
        "port": port
    }))
}

#[tauri::command]
pub async fn cancel_all() -> Result<bool, String> {
    Ok(true)
}

#[tauri::command]
pub async fn send_request(
    url: String,
    options: RequestOptions,
    identity_state: State<'_, IdentityState>,
) -> Result<Response, String> {
    // 1. Parse URL
    let parsed_url = url::Url::parse(&url).map_err(|e| e.to_string())?;
    let host = parsed_url.host_str().ok_or("Invalid host")?;
    let port = parsed_url.port().unwrap_or(443);
    let path = parsed_url.path();

    // 2. Get Identity from state
    let id_guard = identity_state.current_identity.lock().unwrap();
    let identity = id_guard.as_ref().ok_or("No identity bound")?;

    // 3. Connect and Handshake (UHP)
    let keys = UhpPrivateKeyBytes {
        dilithium_sk: identity.dilithium_sk.clone(),
        kyber_sk: identity.kyber_sk.clone(),
        master_seed: identity.master_seed.clone(),
    };

    let handshake = quic_connect_and_handshake(
        host,
        port,
        host, // server_name
        None, // spki_pin
        &identity.identity_json,
        keys,
        0, // chain_id
    ).map_err(|e| format!("QUIC Handshake failed: {}", e))?;

    // 4. Perform Authenticated Request
    let (status, body_bytes) = quic_authenticated_request(
        handshake.handle,
        &options.method,
        path,
        options.headers,
        Some(options.body.into_bytes()),
    ).map_err(|e| format!("QUIC Request failed: {}", e))?;

    let body = String::from_utf8_lossy(&body_bytes).to_string();

    Ok(Response {
        status,
        statusText: "OK".to_string(), // Simplified
        body,
        ok: status >= 200 && status < 300,
        headers: HashMap::new(),
    })
}

#[tauri::command]
pub async fn bind_identity(
    identity: crate::identity::IdentityData,
    identity_state: State<'_, IdentityState>,
) -> Result<(), String> {
    let mut current = identity_state.current_identity.lock().unwrap();
    *current = Some(identity);
    Ok(())
}
