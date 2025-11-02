import { CustomButton, CustomInput } from "../custom-components";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { validations } from "../utils/constants";
import Auth from "../services/authService";
import { toast } from "react-toastify";

const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        getValues,
        formState: {
            errors
        }
    } = useForm();
    const navigate = useNavigate();

    const handleForgotPassword = async (payload) => {
        const res = await Auth.forgotPassword(payload);
        console.log(res)

        if (res?.data?.success) {
            toast.success(res.data.message);
            navigate("/login");
        } else {
            toast.error(res?.response?.data?.error || "Something went wrong")
        }
    }

    return (
        <div className="w-full max-w-md mx-auto bg-primary-light p-4 mt-8 rounded-md ">
            <h1 className="text-3xl text-center mb-4">Change Password</h1>
            <form className="w-full flex flex-col gap-3.5" onSubmit={handleSubmit(handleForgotPassword)}>
                <CustomInput {...register("emailId", validations.emailId)} error={errors?.emailId?.message} label={"Email"} />
                <CustomInput {...register("oldPassword", validations.password)} error={errors?.oldPassword?.message} label={"Old Password"} />
                <CustomInput {...register("newPassword", validations.password)} error={errors?.password?.message} label={"New Password"} />
                <CustomInput {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (confirmPassword) => {
                        if (confirmPassword !== getValues("newPassword")) return "confirm password is not same";
                    }
                })} error={errors?.confirmPassword?.message} label={"Confirm Password"} />
                <Link to={"/login"} className={"hover:underline w-fit"}>Back To Login?</Link>
                <CustomButton type="submit" className={"rounded-md"}>Submit</CustomButton>
            </form>
        </div>
    );
};

export default ForgotPassword;