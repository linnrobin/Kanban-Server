const { User } = require('../models')
const { decryptPass } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const { OAuth2Client } = require('google-auth-library')

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
                        return next({
                            name: 'BadRequest',
                            errors: [{ message: 'Invalid Email / Password' }]
                        })
                    }
                } else {
                    return next({
                        name: 'NotFound',
                        errors: [{ message: 'User Not found' }]
                    })
                }
            })
            .catch( err => {
                return next({
                    name: 'InternalServerError',
                    errors: err
                })
            })
    }

    static googleSign(req, res, next){
        let email = ''
        const client = new OAuth2Client(process.env.CLIENT_ID);

        client.verifyIdToken({
            idToken: req.body.id_token,
            audience: process.env.CLIENT_ID
        })
            .then( ticket => {
                email = ticket.getPayload().email
                return User.findOne({
                    where: {
                        email
                    }
                })
            })
            .then( data => {
                if (data) {
                    let payload = {
                        id: data.id,
                        email: data.email
                    }
                    let token = generateToken(payload)
                    return res.status(200).json({
                        'access_token' : token,
                        'msg': 'Welcome Back, ' + data.email
                    })
                } else {
                    return User.create({
                        email,
                        password: process.env.DEFAULT_PASSWORD
                    })
                        .then( newCreate => {
                            let payload = {
                                id: newCreate.id,
                                email: newCreate.email
                            }
                            let token = generateToken(payload)
                            return res.status(201).json({
                                'access_token': token,
                                "msg": "First Time Google Sign In Successful, Email created in database"
                            })
                        })
                        .catch( err => {
                            return next(err)
                        })
                }
            })
            .catch( err => {
                console.log('==============GOOGLE===============')
                return next(err)
            })
    }
}

module.exports = Controller