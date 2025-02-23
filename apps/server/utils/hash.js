const crypto = require('crypto');

function generateHashedPassword(password) {
    const salt = crypto.randomBytes(16).toString('hex'); 
    const hash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512').toString('hex');
    return {
        salt,
        hash
    };
}

module.exports = { generateHashedPassword }