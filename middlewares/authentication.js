const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

function authentication(req, res, next) {
    try{
        let decoded = verifyToken(req.headers.access_token)
        User.findByPk(decoded.id)
            .then(result => {
                if(result) {
                    req.currentUserId = result.id
                    return next()
                } else {
                    return next({
                        name: "NotFound",
                        errors: [{ message: 'User Not Found' }]
                    })
                }
            })
            .catch(err => {
                return next({
                    name: "Unauthorized",
                    errors: [{ message: 'Unauthorized' }]
                })
            })
    } catch (err) {
        return next(err)
    }
}

module.exports = authentication