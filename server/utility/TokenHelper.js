const jwt = require("jsonwebtoken");

const KEY = process.env.JWT_SECRET || "123-ABC-XYZ"; // 🔥 safer

// CREATE TOKEN
exports.Encodetoken = (email, user_id) => {
    return jwt.sign(
        { email, user_id },
        KEY,
        { expiresIn: "24h" }
    );
};

// VERIFY TOKEN
exports.Decodetoken = (token) => {
    try {
        if (!token) return null;
        return jwt.verify(token, KEY);
    } catch (e) {
        return null;
    }
};