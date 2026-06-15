const { Decodetoken } = require('../utility/TokenHelper');

module.exports = async (req, res, next) => {
    let token = req.headers['token'];
    if (!token) {
        token = req.cookies['adminToken'] || req.cookies['token'];
    }

    let decoded = Decodetoken(token);
    if (decoded === null) {
        return res.status(401).json({ status: "fail", message: "Unauthorized" });
    }

    const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "khanshovo67@gmail.com").toLowerCase();
    if (decoded['email'].toLowerCase() !== ADMIN_EMAIL && decoded['user_id'] !== 'admin') {
        return res.status(403).json({ status: "fail", message: "Forbidden: Admin access only" });
    }

    req.headers.email = decoded['email'];
    req.headers.user_id = decoded['user_id'];
    next();
};
