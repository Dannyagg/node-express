const authorize = (req, res, next) => {
    const { user } = req.query
    const message = (' user unauthorized')
    if (user === 'john') {
        req.query = { username: 'john', id: 3 }
        next()
    } else {
        res.status(401).send(message)
    }

}
    module.exports = authorize