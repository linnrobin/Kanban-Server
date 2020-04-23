const { Task } = require('../models')

class Controller {
    static findAll( req, res, next ) {
        Task.findAll({
            where: {
                UserId: req.currentUserId
            },order: [
                ['updatedAt', 'DESC']
            ]
        })
            .then( result => {
                return res.status(200).json({
                    result
                })
            })
            .catch( err => {
                return next(err)
            })
    }

    static create( req, res, next ){
        let { title, category } = req.body
        let newCreate = { title, category, UserId: req.currentUserId}
        Task.create(newCreate)
            .then( result => {
                return res.status(201).json({
                    result,
                    message: 'Successfully created new task'
                })
            })
            .catch( err => {
                return next(err)
            })
    }

    static delete( req, res, next ){
        Task.destroy({
            where: {
                id: req.params.id
            }
        })
            .then( result => {
                return res.status(200).json({ message: 'Successfully deleted task' })
            })
            .catch( err => {
                return next(err)
            })
    }

    static put( req, res, next ){
        let newUpdated = {}
        if (req.body.category) {
            let { category } = req.body
            newUpdated = { category }
        } else if (req.body.title) {
            let { title } = req.body
            newUpdated = { title }
        }
        Task.update(newUpdated, { 
            where: {
                id: req.params.id
            },
            returning: true
        })
            .then( result => {
                return res.status(200).json({
                    result
                })
            })
            .catch( err => {
                return next(err)
            })
    }
}

module.exports = Controller