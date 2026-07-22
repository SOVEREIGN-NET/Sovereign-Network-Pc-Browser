#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

mod quic;
mod identity;
mod quic_engine;
mod identity_engine;
mod zhtp_auth;
mod zhtp_auth_request;
mod zhtp_codec;
mod zhtp_types;
mod zhtp_framing;
mod zhtp_request;

use crate::quic::QuicState;
use crate::identity::IdentityState;

fn main() {
  tauri::Builder::default()
    .manage(QuicState::default())
    .manage(IdentityState::default())
    .invoke_handler(tauri::generate_handler![
      quic::send_request,
      quic::test_connection,
      quic::bind_identity,
      quic::cancel_all,
      identity::get_identity,
      identity::set_identity,
      identity::generate_local_identity,
    ])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
