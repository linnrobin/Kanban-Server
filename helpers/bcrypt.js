const bcrypt = require('bcryptjs')

function encryptPass(password) {
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(password, salt)
    return hash
}

function decryptPass(password, hash) {
    return bcrypt.compareSync(password, hash)
}

module.exports = { encryptPass, decryptPass }