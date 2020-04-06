const { User } = require('../models')
const { decryptPass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class Controller {
    static register (req, res, next ) {
        let { email, password } = req.body
        let payload = { email, password }
        User.create(payload)
            .then(created => {
                return res.status(201).json({
                    id: created.id,
                    email: created.email,
                    msg: "Successfully created"
                })
            })
            .catch(err => {
                return next(err)
            })
    }

    static login ( req, res, next ) {
        let { email, password } = req.body
        let payload = { email, password }
        User.findOne({
            where: {
                email: payload.email
            }
        })
            .then( found => {
                if (found) {
                    let compare = decryptPass(payload.password, found.password)
                    if (compare) {
                        let { id, email } = found
                        let foundPayload = { id, email }
                        let token = generateToken(foundPayload)
                        return res.status(200).json({
                            id,
                            email,
                            access_token: token
                        })
                    } else {
                        console.log('Invalid Email / Password')
                        return next(err)
                    }
                } else {
                    console.log('User Not found')
                    return next(err)
                }
            })
            .catch( err => {
                return next(err)
            })
    }
}

module.exports = Controller