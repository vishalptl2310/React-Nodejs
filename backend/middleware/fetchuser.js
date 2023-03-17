const jwt = require('jsonwebtoken');
const secretKey = "imvishal"

const fetchusers = async (req, res, next) => {

    try {

        const token = req.header('auth-token')
        if (!token) {
            res.status(401).send({ error: "please enter Valid token" })
        }

        const userData = jwt.verify(token, secretKey);
        console.log(userData)
        req.user = userData.userinfo.id
        next()

    } catch (error) {
        console.log("error  : " + error)

    }



}

module.exports = {fetchusers};