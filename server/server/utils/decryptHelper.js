const { AES, enc} = require('crypto-js');
// const config = require('@config/index')

const CRYPTO_SECRET = 'secret'

const decryptPayload = data => {
    try {
        if (typeof data === 'object') {
            return JSON.parse(AES.decrypt(data, CRYPTO_SECRET).toString(enc.Utf8));
        }
        if (typeof data === 'string') {
            return AES.decrypt(data, CRYPTO_SECRET).toString(enc.Utf8);
        }
    } catch (error) {
        Promise.reject(error)
    }
}

module.exports = {
    decryptPayload
}