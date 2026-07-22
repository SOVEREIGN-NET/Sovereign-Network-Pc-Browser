// Desktop shim for react-native-keychain
// In a real desktop app, this should use OS-native keyring (e.g. via Tauri commands)
// For now, we'll use a slightly safer memory-backed or encrypted storage approach

export enum ACCESS_CONTROL {
  BIOMETRY_ANY = 'BIOMETRY_ANY',
}

export enum ACCESSIBLE {
  WHEN_UNLOCKED = 'WHEN_UNLOCKED',
}

export const setGenericPassword = async (username: string, password: string, options?: any) => {
  // Mock secure storage
  localStorage.setItem(`secure_${username}`, password);
  return true;
};

export const getGenericPassword = async (options?: any) => {
  // This is simplified and not actually secure yet
  const password = localStorage.getItem(`secure_identity`);
  if (password) {
    return { username: 'identity', password };
  }
  return false;
};

export const resetGenericPassword = async (options?: any) => {
  localStorage.removeItem(`secure_identity`);
  return true;
};

const Keychain = {
  setGenericPassword,
  getGenericPassword,
  resetGenericPassword,
  ACCESS_CONTROL,
  ACCESSIBLE,
};

export default Keychain;
