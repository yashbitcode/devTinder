import { useRef } from "react";
import { CustomButton, CustomInput } from "../custom-components";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
    const formRef = useRef(null);

    return (
        <div className="w-full max-w-md mx-auto bg-primary-light p-4 mt-8 rounded-md ">
            <h1 className="text-3xl text-center mb-4">Change Password</h1>
            <form ref={formRef} className="w-full flex flex-col gap-3.5">
                <CustomInput name={"emailId"} label={"Email"} />
                <CustomInput name={"oldPassword"} label={"Old Password"} />
                <CustomInput name={"newPassword"} label={"New Password"} />
                <Link to={"/login"} className={"hover:underline w-fit"}>Back To Login?</Link>
                <CustomButton type="submit" className={"rounded-md"}>Submit</CustomButton>
            </form>
        </div>
    );
};

export default ForgotPassword;