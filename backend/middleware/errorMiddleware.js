//middleware = functions that execute during req res cycle

//going to overwite express default error handler
const errorHandler = (err, req, res, next) => {

    //ternary conditional, if res has status code use it otherwise set statusCode to 500
    const statusCode = res.statusCode ? res.statusCode : 500

    res.status(statusCode)

    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })
}

module.exports = {
    errorHandler
}