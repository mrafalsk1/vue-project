
const jwt = require('jsonwebtoken')

module.exports = verify = (req, res, next) => {
    console.log('VERIFY TOKEN');
    let token = req.get('Authorization')
    if (!token || !token.startsWith('Bearer ')) return res.status(401).send('Token inválio')

    token = token.replace('Bearer ', '')

    jwt.verify(token, process.env.SECRET_JWT, (err, authData) => {
        if (err) return res.status(401).send(err.message)
        console.log(authData);
        res.locals.usuario = authData.usuario
        next()
    })
    
}