const { BadRequest } = require('../errors')
const jwt = require('jsonwebtoken')

const login = async (req, res) => {
    const { username, password } = req.body;

    // mongoose validation
    // Joi
    // check in the controller

    if (!username || !password) {
        throw new BadRequest('Please provide valid email and password!')
    }

    // just for demo, normally provided by DB
    const id = new Date().getDate()

    // try to keep payload small, better experience for user
    const token = jwt.sign({ id, username }, process.env.JWT_SECRET, { expiresIn: '30d' })

    res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {

    console.log(req.user);  // get user info from auth.js

    const lottoNumber = Math.floor(Math.random() * 100)

    res.status(200).json({ msg: `Hello, ${req.user.username} `, secret: ` Your lotto number is ${lottoNumber}` })

    //console.log(req.headers);


}

module.exports = {
    login,
    dashboard,
}
