import { useRef } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../../../store/store-slices/userSlice";
import { useNavigate } from "react-router-dom";
import { CustomButton, CustomInput } from "../../../custom-components";

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

        try {
            const res = await axios.post("http://localhost:3000/login", payload, {
                withCredentials: true
            });

            dispatch(addUser(res.data.user));
            navigate("/");
        } catch (error) {
            console.log(error.response.data.error)
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