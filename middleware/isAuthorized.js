const jwt = require('jsonwebtoken');
const config = require('config');
const login = config.get('adminLogin');
const secret = config.get('secret');

module.exports = async (req, res, next) => {
    const authorization = req.header('Authorization');
    try {
        const decoded = jwt.verify(authorization, secret);
        if (decoded.admin === login) {
            return next();
        } else {
            res.status(403);
            return res.json({ error: 'unauthorized' });
        }

    } catch (e) {
        res.status(403);
        return res.json({ error: 'unauthorized' });
    }
};