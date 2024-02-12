const CryptoJS = require('crypto-js');
// const config = require('@config/index')

const CRYPTO_SECRET = 'secret'

const decryptObjectPayload = (token) => {
    try {
        const bytes = CryptoJS.AES.decrypt(token, CRYPTO_SECRET)
        return JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
    } catch (error) {
        return null
    }
}
const decryptTextPayload = (token) => {
    try {
        const bytes = CryptoJS.AES.decrypt(token, CRYPTO_SECRET)
        return bytes.toString(CryptoJS.enc.Utf8)
    } catch (error) {
        return null
    }
}

module.exports = {
    decryptObjectPayload,
    decryptTextPayload,
}