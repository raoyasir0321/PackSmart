const jwt = require("jsonwebtoken");
const { getById } = require("../utils");
const User = require("../modules/user/models");

async function authMiddleware(req, res, next) {
    const allowedPaths = ["/register", "/login", "/login", "/register"];
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        if (allowedPaths.includes(req.path)) return next();
        return res.status(401).json({ message: "Log in to view this page" });
    }

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Log in to view this page" });
    }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_KEY);
        const result = await getById({ _id: decoded.id }, User);

        if (!result || !result.email) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        req.user = {
            id: result._id,
            email: result.email,
            phone: result.phoneNumber,
            username: result.username,
            isAdmin: result.isAdmin,
        };

        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Unauthorized: Token expired" });
        } else {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }
    }
}

module.exports = authMiddleware;
