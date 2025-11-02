import { Link, useNavigate } from "react-router-dom";
import { CustomButton, CustomInput } from "../custom-components";
import Auth from "../services/authService";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { signUpInputs, validations } from "../utils/constants";

/* 
    protected
        - main token even after refresh
        - auth wrapper if token valid fetch the user and update

        auth wrapper:
            - reqAuth -> T(protected)/F(un-pro.)
            - XNOR -> reqAuth and user
*/

const SignUp = () => {
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm();

    const navigate = useNavigate();

    const handleSignUp = async (payload) => {
        const res = await Auth.createAccount(payload);

        if (res?.data?.success) {
            toast.success(res.data.message);
            navigate("/login");
        } else {
            toast.error(res?.response?.data?.error || "Something went wrong")
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-primary-light p-4 mt-8 rounded-md ">
            <h1 className="text-3xl text-center mb-4">Sign Up</h1>
            <form className="w-full flex flex-col gap-3.5" onSubmit={handleSubmit(handleSignUp)}>
                {
                    signUpInputs.map((el) => (
                        <CustomInput key={el.name} {...register(el.name, validations[el.name])} label={el.label} error={errors?.[el.name]?.message} />
                    ))
                }
                <Link to={"/login"} className={"hover:underline mt-2"}>Already Have An Account?</Link>
                <CustomButton type="submit" className={"rounded-md"}>Sign Up</CustomButton>
            </form>
        </div>
    );
};

export default SignUp;