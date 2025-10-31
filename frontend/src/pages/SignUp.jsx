import { useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { CustomButton, CustomInput } from "../custom-components";

/* 
    protected
        - main token even after refresh
        - auth wrapper if token valid fetch the user and update

        auth wrapper:
            - reqAuth -> T(protected)/F(un-pro.)
            - XNOR -> reqAuth and user
*/

const SignUp = () => {
    const formRef = useRef(null);
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();

        const formData = new FormData(formRef.current);
        const payload = {};

        for (const [key, val] of formData) {
            payload[key] = val;
        }

        try {
            await axios.post("http://localhost:3000/signup", payload, {
                withCredentials: true
            });
            
            navigate("/login");
        } catch (error) {
            console.log(error.response.data.error)
        }
    }
    return (
        <div className="w-full max-w-md mx-auto bg-primary-light p-4 mt-8 rounded-md ">
            <h1 className="text-3xl text-center mb-4">Sign Up</h1>
            <form ref={formRef} className="w-full flex flex-col gap-3.5" onSubmit={handleSignUp}>
                <CustomInput name={"firstName"} label={"First Name"} />
                <CustomInput name={"lastName"} label={"Last Name"} />
                <CustomInput name={"emailId"} label={"Email"} />
                <CustomInput name={"password"} label={"Password"} />
                <CustomButton type="submit" className={"rounded-md"}>Sign Up</CustomButton>
            </form>
        </div>
    );
};

export default SignUp;