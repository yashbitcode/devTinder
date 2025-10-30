import { useRef } from "react";
import { useSelector } from "react-redux";
import { CustomButton, CustomInput } from "../custom-components";

const Profile = () => {
    const formRef = useRef(null);
    const user = useSelector((state) => state.userReducer.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData(formRef.current);
        const payload = {};

        for(const [val, key] of formData) {
            payload[val] = key;
        }

        console.log(payload)
    };

    return (
        <div className="w-full max-w-md mx-auto bg-primary-light p-4 mt-8 rounded-md ">
            <h1 className="text-3xl text-center mb-4">Profile</h1>
            <form ref={formRef} className="w-full flex flex-col gap-3.5" onSubmit={handleSubmit}>
                <CustomInput name={"firstName"} label={"First Name"} defaultValue={user.firstName} />
                <CustomInput name={"lastName"} label={"Last Name"} defaultValue={user.lastName} />
                <CustomInput name={"age"} label={"Age"} defaultValue={user.age} />
                <CustomInput name={"gender"} label={"Gender"} defaultValue={user.gender} />
                <CustomInput name={"photoUrl"} label={"Photo URL"} defaultValue={user.photoUrl} />
                <CustomInput name={"about"} label={"About"} defaultValue={user.about} />

                <CustomButton type="submit" className={"rounded-md"}>Update Profile</CustomButton>
            </form>
        </div>
    );
};

export default Profile;