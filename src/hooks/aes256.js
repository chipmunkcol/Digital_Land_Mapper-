import crypto from 'crypto';

const IV_LENGTH = 16;

export function encrypt(password) {
  let iv = crypto.randomBytes(IV_LENGTH);
  let cipher = crypto.createCipheriv(process.env.REACT_APP_ENC_ALGORITHM, Buffer.from(process.env.REACT_APP_ENC_KEY), iv);
  let encrypted = cipher.update(password);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv.toString('hex')+':'+encrypted.toString('hex');
}
