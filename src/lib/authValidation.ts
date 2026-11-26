export const MIN_LOGIN_PASSWORD_LENGTH = 6;
export const MIN_REGISTER_PASSWORD_LENGTH = 8;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const FIREBASE_NOT_CONFIGURED_MESSAGE =
  "Firebase is not configured yet. Please add your Firebase credentials to .env.local to enable authentication. (See docs/firebase-setup-notes.md)";

export function validateEmailField(email: string): string | undefined {
  if (!email.trim()) {
    return "Email address is required.";
  }
  if (!EMAIL_PATTERN.test(email.trim())) {
    return "Please enter a valid email address.";
  }
  return undefined;
}

export function validatePasswordField(
  password: string,
  minLength: number
): string | undefined {
  if (!password) {
    return "Password is required.";
  }
  if (password.length < minLength) {
    return `Password must be at least ${minLength} characters.`;
  }
  return undefined;
}

export function getFirebaseAuthErrorMessage(
  err: unknown,
  fallbackMessage: string
): string {
  const error = err as { code?: string; message?: string };

  switch (error?.code) {
    case "auth/invalid-credential":
    case "auth/user-not-found":
    case "auth/wrong-password":
      return "Invalid email or password. Please check your credentials.";
    case "auth/email-already-in-use":
      return "This email address is already registered. Please sign in instead.";
    case "auth/invalid-email":
      return "Please enter a valid email address.";
    case "auth/weak-password":
      return `Password is too weak. Please use at least ${MIN_REGISTER_PASSWORD_LENGTH} characters.`;
    case "auth/user-disabled":
      return "This account has been disabled. Please contact support.";
    case "auth/too-many-requests":
      return "Too many failed attempts. Please try again in a few minutes.";
    case "auth/network-request-failed":
      return "Network error. Please check your internet connection.";
    default:
      return error?.message || fallbackMessage;
  }
}
