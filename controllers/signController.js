const jwt = require('jsonwebtoken');

const config = require('config');
const secret = config.get('secret');
const adminLogin = config.get('adminLogin');
const adminPassword = config.get('adminPassword');

exports.sign = async (req, res, next) => {
    const { login, password } = req.body;

    const duration = '7d';

    if (adminLogin === login && adminPassword === password) {
        const accessToken = jwt.sign({ admin: login }, secret, { expiresIn: duration });

        res.send({ accessToken, duration });
    } else {
        res.status(400);

        res.send({ error: 'Wrong login or password' });
    }
};