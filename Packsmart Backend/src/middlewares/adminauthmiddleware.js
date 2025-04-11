const jwt = require("jsonwebtoken");
const { getById } = require("../utils");
const User = require("../modules/user/models");

module.exports = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Log in to view this page" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    } try {
        const decoded = jwt.verify(token, process.env.ACCESS_KEY);
        const user = await getById({ _id: decoded.id }, User);

        if (!user || !user.isAdmin) {
            return res.status(401).json({ message: "Unauthorized: Invalid token" });
        }

        req.user = {
            id: user._id,
            email: user.email,
            phone: user.phoneNumber,
            username: user.username,
            isAdmin: user.isAdmin
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