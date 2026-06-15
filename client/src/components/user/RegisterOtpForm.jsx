import React from 'react'
import SubmitButton from './UserSubmitButton'
import userStore from '../../store/UserStroe'
import ValidationHelper from '../../utility/ValidatonHelper'
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom"

const RegisterOtpForm = () => {
    let navigate = useNavigate();
    let { RegisterOtpFormData, RegisterOtpFormOnChange, VerifyRegisterOTPRequest } = userStore();

    const onFormSubmit = async () => {
        if (ValidationHelper.IsEmpty(RegisterOtpFormData.otp || "")) {
            toast.error("Please enter the verification code");
            return;
        }

        let res = await VerifyRegisterOTPRequest(RegisterOtpFormData.otp);
        res
            ? (toast.success("Registration successful!"), navigate("/login"))
            : toast.error("Invalid OTP. Please try again.");
    };

    return (
        <div className="container section">
            <div className="row d-flex justify-content-center">
                <div className="col-md-5">
                    <div className="card p-5">
                        <h4>Verify Your Email</h4>
                        <p>Enter the 6-digit code sent to your email to complete registration.</p>

                        <input
                            placeholder="6-digit verification code"
                            type="text"
                            className="form-control"
                            value={RegisterOtpFormData.otp || ""}
                            onChange={(e) => RegisterOtpFormOnChange("otp", e.target.value)}
                        />

                        <SubmitButton
                            onClick={onFormSubmit}
                            className="btn mt-3 btn-success"
                            text="Verify & Register"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterOtpForm;