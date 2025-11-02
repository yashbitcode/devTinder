import { CustomButton, CustomInput } from "../custom-components";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { validations } from "../utils/constants";

const ForgotPassword = () => {
    const {
        register,
        handleSubmit,
        getValues,
        formState: {
            errors
        }
    } = useForm();

    const handleForgotPassword = async (data) => { console.log(data) }

    return (
        <div className="w-full max-w-md mx-auto bg-primary-light p-4 mt-8 rounded-md ">
            <h1 className="text-3xl text-center mb-4">Change Password</h1>
            <form className="w-full flex flex-col gap-3.5" onSubmit={handleSubmit(handleForgotPassword)}>
                <CustomInput {...register("emailId", validations.emailId)} error={errors?.emailId?.message} label={"Email"} />
                <CustomInput {...register("oldPassword", validations.password)} error={errors?.oldPassword?.message} label={"Old Password"} />
                <CustomInput {...register("password", validations.password)} error={errors?.password?.message} label={"New Password"} />
                <CustomInput {...register("confirmPassword", {
                    required: "Confirm password is required",
                    validate: (val) => {
                        if (val === getValues("confirmPassword")) return "confirm password is not same"
                    }
                })} error={errors?.confirmPassword?.message} label={"Confirm Password"} />
                <Link to={"/login"} className={"hover:underline w-fit"}>Back To Login?</Link>
                <CustomButton type="submit" className={"rounded-md"}>Submit</CustomButton>
            </form>
        </div>
    );
};

export default ForgotPassword;