/**
 * SecurePass — Local Cryptographic Prototype (Web Crypto API)
 *
 * Implements client-side AES-256-GCM encryption and PBKDF2 key derivation.
 * Operates strictly in browser memory for academic demonstration.
 * No data is transmitted or stored on external servers.
 */

// Cryptographic parameters
export const CRYPTO_CONFIG = {
  ALGORITHM: "AES-GCM",
  KEY_LENGTH: 256, // 256-bit AES
  IV_LENGTH_BYTES: 12, // 96-bit standard nonce for AES-GCM
  SALT_LENGTH_BYTES: 16, // 128-bit salt for PBKDF2
  PBKDF2_ITERATIONS: 100000, // OWASP-recommended work factor
  HASH: "SHA-256",
};

export interface EncryptedPayload {
  ciphertext: string; // Base64 encoded ciphertext + auth tag
  iv: string; // Base64 encoded 96-bit nonce
  salt: string; // Base64 encoded 128-bit PBKDF2 salt
  timestamp: string; // ISO timestamp of demonstration
}

/**
 * Converts a Uint8Array buffer to a Base64 string for display.
 */
function bufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

/**
 * Converts a Base64 string back into a Uint8Array buffer.
 */
function base64ToBuffer(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

/**
 * Derives a 256-bit AES-GCM CryptoKey from a user's master passphrase
 * using PBKDF2 with SHA-256 and a random 128-bit salt.
 */
export async function deriveKeyFromPassphrase(
  passphrase: string,
  salt: BufferSource
): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const passphraseBytes = encoder.encode(passphrase);

  // 1. Import passphrase as raw key material for PBKDF2
  const baseKey = await window.crypto.subtle.importKey(
    "raw",
    passphraseBytes,
    { name: "PBKDF2" },
    false,
    ["deriveKey"]
  );

  // 2. Derive an AES-GCM 256-bit key
  return window.crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: CRYPTO_CONFIG.PBKDF2_ITERATIONS,
      hash: CRYPTO_CONFIG.HASH,
    },
    baseKey,
    { name: CRYPTO_CONFIG.ALGORITHM, length: CRYPTO_CONFIG.KEY_LENGTH },
    false, // Key cannot be exported in plaintext
    ["encrypt", "decrypt"]
  );
}

/**
 * Encrypts sample plaintext with AES-256-GCM.
 * Generates a fresh random 96-bit IV and 128-bit salt for every execution.
 */
export async function encryptPassword(
  plaintext: string,
  passphrase: string
): Promise<EncryptedPayload> {
  if (!plaintext || !passphrase) {
    throw new Error("Both password and master passphrase are required.");
  }

  // 1. Generate random 128-bit salt and 96-bit IV
  const salt = new Uint8Array(CRYPTO_CONFIG.SALT_LENGTH_BYTES);
  const iv = new Uint8Array(CRYPTO_CONFIG.IV_LENGTH_BYTES);
  window.crypto.getRandomValues(salt);
  window.crypto.getRandomValues(iv);

  // 2. Derive key using PBKDF2
  const cryptoKey = await deriveKeyFromPassphrase(passphrase, salt as unknown as BufferSource);

  // 3. Encrypt plaintext with AES-GCM
  const encoder = new TextEncoder();
  const plaintextBytes = encoder.encode(plaintext);

  const ciphertextBuffer = await window.crypto.subtle.encrypt(
    {
      name: CRYPTO_CONFIG.ALGORITHM,
      iv: iv as unknown as BufferSource,
    },
    cryptoKey,
    plaintextBytes
  );

  return {
    ciphertext: bufferToBase64(ciphertextBuffer),
    iv: bufferToBase64(iv),
    salt: bufferToBase64(salt),
    timestamp: new Date().toLocaleTimeString(),
  };
}

/**
 * Decrypts an AES-256-GCM ciphertext payload using the master passphrase.
 * Verifies the 128-bit GCM authentication tag automatically.
 * Throws an error if the passphrase is incorrect or the ciphertext was altered.
 */
export async function decryptPassword(
  payload: EncryptedPayload,
  passphrase: string
): Promise<string> {
  if (!passphrase) {
    throw new Error("Master passphrase is required for decryption.");
  }

  try {
    const salt = base64ToBuffer(payload.salt);
    const iv = base64ToBuffer(payload.iv);
    const ciphertext = base64ToBuffer(payload.ciphertext);

    // 1. Re-derive the key using the stored salt and entered passphrase
    const cryptoKey = await deriveKeyFromPassphrase(passphrase, salt as unknown as BufferSource);

    // 2. Decrypt with AES-GCM (verifies tag automatically)
    const decryptedBuffer = await window.crypto.subtle.decrypt(
      {
        name: CRYPTO_CONFIG.ALGORITHM,
        iv: iv as unknown as BufferSource,
      },
      cryptoKey,
      ciphertext as unknown as BufferSource
    );

    const decoder = new TextDecoder();
    return decoder.decode(decryptedBuffer);
  } catch {
    // Web Crypto throws OperationError if decryption or authentication tag check fails
    throw new Error(
      "Decryption failed: Incorrect master passphrase or corrupted ciphertext."
    );
  }
}
