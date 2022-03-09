module.exports = (err, req, res, next) => {
    let response = {message: err.message};

    if (process.env.NODE_ENV === 'development') {
        response.stack = err.stack;
    }
    
    res.status(500)
    res.send(response)
}
