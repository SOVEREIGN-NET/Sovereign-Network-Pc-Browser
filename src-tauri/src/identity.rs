use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::State;
use crate::identity_engine::{generate_identity_bundle, GeneratedIdentity};

#[derive(Default)]
pub struct IdentityState {
    pub current_identity: Mutex<Option<IdentityData>>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct IdentityData {
    pub did: String,
    pub device_id: String,
    pub identity_json: String,
    pub dilithium_sk: Vec<u8>,
    pub kyber_sk: Vec<u8>,
    pub master_seed: Vec<u8>,
}

#[tauri::command]
pub fn generate_local_identity(display_name: String) -> Result<serde_json::Value, String> {
    // Note: in a real desktop app, we'd use a more stable device_id
    let bundle = generate_identity_bundle("desktop-device-1").map_err(|e| e.to_string())?;

    Ok(serde_json::json!({
        "status": "generated",
        "did": bundle.did,
        "deviceId": bundle.device_id,
        "publicDilithium": base64::encode(bundle.public_key),
        "publicKyber": base64::encode(bundle.kyber_public_key),
        "timestamp": bundle.created_at,
        "masterSeedHex": hex::encode(bundle.master_seed)
    }))
}

#[tauri::command]
pub fn get_identity(state: State<'_, IdentityState>) -> Result<Option<String>, String> {
    let id = state.current_identity.lock().unwrap();
    Ok(id.as_ref().map(|i| i.did.clone()))
}

#[tauri::command]
pub fn set_identity(identity: IdentityData, state: State<'_, IdentityState>) -> Result<(), String> {
    let mut current = state.current_identity.lock().unwrap();
    *current = Some(identity);
    Ok(())
}
