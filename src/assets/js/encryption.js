import CryptoJS from "crypto-js";

export function encrypt(string) {
  const encrypted = CryptoJS.AES.encrypt(
    string,
    process.env.REACT_APP_secretKey
  ).toString();
  return encrypted;
}

export function decrypt(string) {
  const decrypted = CryptoJS.AES.decrypt(
    string,
    process.env.REACT_APP_secretKey
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
}
