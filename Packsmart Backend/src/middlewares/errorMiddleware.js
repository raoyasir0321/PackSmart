const CustomErrorApi = require("../error");
module.exports = (err, req, res, next) => {
    if (err instanceof CustomErrorApi) {
        return res.status(err.statusCode).json({ error: err.message });
    }
    return res.status(500).json({ error: err.message });
};
