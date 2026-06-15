const { 
    UserOTPService, 
    VerifyOTPService, 
    SaveProfileService, 
    UpdateProfileService, 
    ReadProfileService,
    RegisterUserService,
    LoginWithPasswordService
} = require("../services/UserServices");

exports.UserOTP = async (req, res) => {
    return res.status(200).json({ status: "fail", message: "OTP login disabled" });
};

exports.VerifyLogin = async (req, res) => {
    return res.status(200).json({ status: "fail", message: "OTP login disabled" });
};

exports.UserLogout = async (req, res) => {
    let cookieOptions = { expires: new Date(Date.now() - 24 * 60 * 60 * 1000), httpOnly: false };
    res.cookie('token', "", cookieOptions);
    return res.status(200).json({ status: "success", message: "Logged out successfully" });
};

exports.CreateProfile = async (req, res) => {
    let result = await SaveProfileService(req);
    return res.status(200).json(result);
};

exports.UpdateProfile = async (req, res) => {
    let result = await SaveProfileService(req);
    return res.status(200).json(result);
};

exports.ReadProfile = async (req, res) => {
    let result = await ReadProfileService(req);
    return res.status(200).json(result);
};

// Direct Register - no OTP
exports.RegisterUser = async (req, res) => {
    let result = await RegisterUserService(req);
    return res.status(200).json(result);
};

// Unified Login - returns role: "admin" or "user"
exports.LoginWithPassword = async (req, res) => {
    let result = await LoginWithPasswordService(req);
    if (result.status === "success") {
        let cookieOptions = {
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
            httpOnly: false,
            sameSite: 'none',
            secure: true
        };
        if (result.role === "user") {
            // Only set token cookie for regular users (used by AuthVerification)
            res.cookie('token', result.token, cookieOptions);
        }
        // For admin, frontend stores adminToken in Cookies manually
    }
    return res.status(200).json(result);
};
