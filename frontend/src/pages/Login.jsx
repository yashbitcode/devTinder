import { useRef } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../store/store-slices/userSlice";
import { useNavigate } from "react-router-dom";
import { CustomButton, CustomInput } from "../custom-components";
import Auth from "../services/authService";
import { toast } from "react-toastify";

/* 
    protected
        - main token even after refresh
        - auth wrapper if token valid fetch the user and update

        auth wrapper:
            - reqAuth -> T(protected)/F(un-pro.)
            - XNOR -> reqAuth and user
*/
const Login = () => {
    const formRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        const formData = new FormData(formRef.current);
        const payload = {};

        for (const [key, val] of formData) {
            payload[key] = val;
        }

        const res = await Auth.loginAccount(payload);

        if(res?.data?.success) {
            dispatch(addUser(res.data.user));
            toast.success(res.data.message);

            navigate("/", { replace: true });
        } else {
            toast.error(res?.response?.data?.error || "Something went wrong")
        }
    }
    return (
        <div className="w-full max-w-md mx-auto bg-primary-light p-4 mt-8 rounded-md ">
            <h1 className="text-3xl text-center mb-4">Login</h1>
            <form ref={formRef} className="w-full flex flex-col gap-3.5" onSubmit={handleLogin}>
                <CustomInput name={"emailId"} label={"Email"} />
                <CustomInput name={"password"} label={"Password"} />
                <CustomButton type="submit" className={"rounded-md"}>Login</CustomButton>
            </form>
        </div>
    );
};

export default Login;