const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
        res.status(401).json({
            status: "error",
            code: 401,
            message: "Not authorizaed"
        });
        return;
    }

    try {
        
    } catch (error) {
        
    }

};

module.exports = authenticate;