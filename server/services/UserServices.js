const UserModel = require("../models/UserModel");
const { Encodetoken } = require("../utility/TokenHelper");
const ProfileModel = require("../models/ProfileModel");
const bcrypt = require("bcrypt");

// Direct Register - No OTP
const RegisterUserService = async (req) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return { status: "fail", message: "Email and password are required" };
        }
        let existingUser = await UserModel.findOne({ email: email.toLowerCase() });
        if (existingUser) {
            return { status: "fail", message: "Email already registered. Please login." };
        }
        if (password.length < 6) {
            return { status: "fail", message: "Password must be at least 6 characters" };
        }
        let hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.create({
            email: email.toLowerCase(),
            password: hashedPassword,
            is_verified: true
        });
        return { status: "success", message: "Registration complete! You can now login." };
    } catch (error) {
        return { status: "fail", message: "Something went wrong" };
    }
};

// Login with password - also checks if admin
const LoginWithPasswordService = async (req) => {
    try {
        let { email, password } = req.body;
        if (!email || !password) {
            return { status: "fail", message: "Email and password are required" };
        }

        // Check admin first
        const ADMIN_EMAIL = (process.env.ADMIN_EMAIL || "khanshovo67@gmail.com").toLowerCase();
        const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "12369874";

        if (email.toLowerCase() === ADMIN_EMAIL) {
            if (password === ADMIN_PASSWORD) {
                let token = Encodetoken(email, "admin");
                return { status: "success", message: "Admin login successful", token, role: "admin" };
            } else {
                return { status: "fail", message: "Invalid password" };
            }
        }

        // Regular user login
        let user = await UserModel.findOne({ email: email.toLowerCase(), is_verified: true });
        if (!user) {
            return { status: "fail", message: "Email not registered. Please register first." };
        }
        let isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return { status: "fail", message: "Incorrect password" };
        }
        let token = Encodetoken(email, user._id.toString());
        return { status: "success", message: "Login successful", token, role: "user" };
    } catch (e) {
        return { status: "fail", message: "Something went wrong" };
    }
};

// OTP Login (kept for compatibility - legacy)
const UserOTPService = async (req) => {
    return { status: "fail", message: "OTP login disabled" };
};
const VerifyOTPService = async (req) => {
    return { status: "fail", message: "OTP login disabled" };
};

const SaveProfileService = async (req) => {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = user_id;
    await ProfileModel.updateOne({ userID: user_id }, { $set: reqBody }, { upsert: true });
    return { status: "success", message: "Profile Saved Successfully" };
};

const UpdateProfileService = async (req) => {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    delete reqBody.userID;
    await ProfileModel.updateOne({ userID: user_id }, { $set: reqBody });
    return { status: "success", message: "Profile Updated Successfully" };
};

const ReadProfileService = async (req) => {
    try {
        let user_id = req.headers.user_id;
        let result = await ProfileModel.find({ userID: user_id });
        return { status: "success", data: result };
    } catch (e) {
        return { status: "failed", message: "Failed To Read Data From Profile" };
    }
};

module.exports = {
    UserOTPService,
    VerifyOTPService,
    SaveProfileService,
    UpdateProfileService,
    ReadProfileService,
    RegisterUserService,
    LoginWithPasswordService
};
