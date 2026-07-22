// Desktop shim for react-native-keychain
// In a real desktop app, this should use OS-native keyring (e.g. via Tauri commands)
// For now, we'll use a slightly safer memory-backed or encrypted storage approach

export enum ACCESS_CONTROL {
  BIOMETRY_ANY = 'BIOMETRY_ANY',
  BIOMETRY_ANY_OR_DEVICE_PASSCODE = 'BIOMETRY_ANY_OR_DEVICE_PASSCODE',
  BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE = 'BIOMETRY_CURRENT_SET_OR_DEVICE_PASSCODE',
}

export enum ACCESSIBLE {
  WHEN_UNLOCKED = 'WHEN_UNLOCKED',
  WHEN_UNLOCKED_THIS_DEVICE_ONLY = 'WHEN_UNLOCKED_THIS_DEVICE_ONLY',
}

export enum SECURITY_LEVEL {
  SECURE_HARDWARE = 'SECURE_HARDWARE',
  SECURE_SOFTWARE = 'SECURE_SOFTWARE',
}

export enum BIOMETRY_TYPE {
  NONE = 'NONE',
  TOUCH_ID = 'TouchID',
  FACE_ID = 'FaceID',
  FINGERPRINT = 'Fingerprint',
}

export enum AUTHENTICATION_TYPE {
  BIOMETRICS_OR_PASSCODE = 'BIOMETRICS_OR_PASSCODE',
  DEVICE_PASSCODE_OR_BIOMETRICS = 'DEVICE_PASSCODE_OR_BIOMETRICS',
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

export const getSupportedBiometryType = async () => {
  return BIOMETRY_TYPE.NONE;
};

const Keychain = {
  setGenericPassword,
  getGenericPassword,
  resetGenericPassword,
  getSupportedBiometryType,
  ACCESS_CONTROL,
  ACCESSIBLE,
  SECURITY_LEVEL,
  BIOMETRY_TYPE,
  AUTHENTICATION_TYPE,
};

export default Keychain;
