import React from 'react'
import SubmitButton from './UserSubmitButton'
import userStore from '../../store/UserStroe'
import ValidatonHelper from '../../utility/ValidatonHelper'
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom"

const OtpForm = () => {
    let navigate = useNavigate();
    let { OtpFormData, OtpFormOnChange, UserOTPRequest,VerifyLoginRequest } = userStore();

  const onFormSubmit = async () => {

    if (ValidatonHelper.IsEmpty(OtpFormData.otp)) {
        toast.error("Valid PIN required");
        return;
    }

    let res = await VerifyLoginRequest(OtpFormData.otp);

    res ? navigate("/") : toast.error("Something Went Wrong");
}

    return (
        <div className="container section">
            <div className="row d-flex justify-content-center">
                <div className="col-md-5">
                    <div className="card p-5">
                        <h4>Enter Verification Code</h4>
                        <p>A verification code has been sent to the email address you provided</p>

                        <input
                            placeholder="Verification"
                            type="text"
                            className="form-control"
                            value={OtpFormData.otp || ""}
                            onChange={(e) => OtpFormOnChange("otp", e.target.value)}
                        />

                        <SubmitButton
                            submit={false}
                            className="btn mt-3 btn-success"
                            text="Submit"
                            onClick={onFormSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OtpForm