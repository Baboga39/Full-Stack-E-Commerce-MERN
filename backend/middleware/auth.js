const jwt = require('jsonwebtoken');


async function authToken(req, res, next) {
    try {
        const token = req.cookies?.accessToken || req.header
        if(!token) {
            console.log('No token provided')
            console.log('--------------------------------------------------------------------------------------------------------------------')
            return res.status(401).json({
                success: false,
                statusCode: 401,
                message: 'No token provided',
                result: null,
            });
        }
        
        jwt.verify(token,process.env.JWT_SECRET,function(err,decoded){
            if (err) {
                if (err.name === 'TokenExpiredError') {
                return res.status(401).json({
                    success: false,
                    statusCode: 401,
                    message: 'Token expired',
                    result: null,
                });
                } else {
                return res.status(403).json({
                    success: false,
                    statusCode: 403,
                    message: 'Invalid token',
                    result: err.message,
                });
                }
            }
            
            req.userId= decoded?.id;
            req.role = decoded?.role;

            next();
        })

    } catch (error) {
        console.log(error.message)
        console.log('--------------------------------------------------------------------------------------------------------------------')
        return res.status(401).json({
            success: false,
            statusCode: 401,
            message: 'Invalid token',
            result: error.message,
        });
    }
}

module.exports = authToken;