import CryptoJS from 'crypto-js';

/**
 * Encrypts the given plain text.
 * @param key   A random integer
 * @param input A string 
 * @returns     The encrypted string
 */
function encrypt(key: number, input: string): string {
    const hash: string = CryptoJS.SHA256(key.toString()).toString();
    const result: string = CryptoJS.AES.encrypt(input, hash).toString();
    return result;
}

/**
 * Decrypts the given cipher text.
 * @param key   The integer used for encryption
 * @param input The encrypted text
 * @returns     The decrypted string
 */
function decrypt(key: number, input: string): string {
    const hash: string = CryptoJS.SHA256(key.toString()).toString();
    const result: string = CryptoJS.AES.decrypt(input, hash).toString(CryptoJS.enc.Utf8);
    return result;
}

export {
    encrypt,
    decrypt
}
