const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const auth = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer")) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("Unauthorized access");
            }
            req.user = decoded.user;
            next();
        })
        if(!token) {
            res.status(401);
            throw new Error("Unauthorized access or token expired/missing");
        }
    } else {
        res.status(401);
        throw new Error("Unauthorized access, authorization header missing");
    }
});

module.exports = auth;