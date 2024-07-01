const crypto = require('crypto');
const CryptoJS = require('crypto-js');

export const  encryptId =(id:string):string =>{
    const secretKey= process.env.TOKEN_KEY || ''

    const ciphertext = CryptoJS.AES.encrypt(id, secretKey).toString();
    return ciphertext;
}

export const decryptId = (encryptedId:string) => {
    const secretKey= process.env.TOKEN_KEY || ''
    const bytes = CryptoJS.AES.decrypt(encryptedId, secretKey);
    const originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;
}
