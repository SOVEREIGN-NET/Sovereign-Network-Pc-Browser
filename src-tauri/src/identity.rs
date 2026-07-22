use serde::{Deserialize, Serialize};
use std::sync::Mutex;
use tauri::State;

#[derive(Default)]
pub struct IdentityState {
    pub current_identity: Mutex<Option<IdentityData>>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct IdentityData {
    pub did: String,
    pub identity_json: String,
    pub dilithium_sk: Vec<u8>,
    pub kyber_sk: Vec<u8>,
    pub master_seed: Vec<u8>,
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
