import { useDispatch } from "react-redux";
import { addUser } from "../store/store-slices/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { CustomButton, CustomInput } from "../custom-components";
import Auth from "../services/authService";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { loginInputs, validations } from "../utils/constants";

/* 
    protected
        - main token even after refresh
        - auth wrapper if token valid fetch the user and update

        auth wrapper:
            - reqAuth -> T(protected)/F(un-pro.)
            - XNOR -> reqAuth and user
*/
const Login = () => {
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (payload) => {
        const res = await Auth.loginAccount(payload);

        if (res?.data?.success) {
            dispatch(addUser(res.data.user));
            toast.success(res.data.message);

            navigate("/", { replace: true });
        } else {
            toast.error(res?.response?.data?.error || "Something went wrong")
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-primary-light p-4 mt-8 rounded-md ">
            <h1 className="text-3xl text-center mb-4">Login</h1>
            <form className="w-full flex flex-col gap-3.5" onSubmit={handleSubmit(handleLogin)}>
                {
                    loginInputs.map((el) => (
                        <CustomInput key={el.name} {...register(el.name, validations[el.name])} label={el.label} error={errors?.[el.name]?.message} />
                    ))
                }
                <div className="mt-2 flex gap-2">
                    <Link to={"/signup"} className={"hover:underline"}>New Here?</Link>
                    <Link to={"/forgot-password"} className={"hover:underline"}>Forgot Password?</Link>
                </div>
                <CustomButton type="submit" className={"rounded-md"}>Login</CustomButton>
            </form>
        </div>
    );
};

export default Login;