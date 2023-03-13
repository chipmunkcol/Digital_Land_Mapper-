import CryptoJS from "crypto-js";

const secretKey = 'this_is_komapper_encryption_key!'
// REACT_APP_ENC_ALGORITHM='aes-256-cbc'
// randomBytes(16)
const iv = 'd0ab3f4a6aab91b6fd2fedf5cb101285';
const asdasd = '002980663db3adbe00432c9ddb08ef3f';

export const encrypt = (password) => {
  const cipher = CryptoJS.AES.encrypt(password, CryptoJS.enc.Utf8.parse(secretKey), {
      iv: CryptoJS.enc.Utf8.parse(16),
      // padding: cryptoJs.pad.Pkcs7,
      // mode: cryptoJs.mode.CBC,
  });

  // const iv = CryptoJS.enc.Utf8.parse(16);

  return iv+':'+ asdasd;
}