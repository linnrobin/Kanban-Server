function errorHandler( err, req, res, next ) {
    switch(err.name) {
        default: 
            res.status(500).json({
                errors: err.errors
            })
    }
}

module.exports = errorHandler