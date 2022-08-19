import { COOKIE_KEY } from '../../config';

const CryptoJS = require("crypto-js");


export function Encrypt(data, key = COOKIE_KEY) {
  let encJson = CryptoJS.AES.encrypt(data, key).toString()
  let encData = CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(encJson))
  return encData
}

export function Decrypt(data, key = COOKIE_KEY) {
  let decData = CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8)
  let bytes = CryptoJS.AES.decrypt(decData, key).toString(CryptoJS.enc.Utf8)
  return bytes
}