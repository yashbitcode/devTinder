import User from "../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { CustomButton, CustomInput } from "../custom-components";
import { addUser } from "../store/store-slices/userSlice";
import { toast } from "react-toastify";
import { profileInputs, validations } from "../utils/constants";
import { useForm } from "react-hook-form";

const Profile = () => {
    const user = useSelector((state) => state.userReducer.user);
    const dispatch = useDispatch();
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm();

    const handleUpdate = async (data) => {
        const payload = {};

        for(const key in data) {
            if(data[key]) payload[key] = data[key];
        }

        const res = await User.updateUserProfile(payload);

        if (res?.data?.success) {
            dispatch(addUser(res.data.user));
            toast.success(res.data.message);

        } else {
            toast.error(res?.response?.data?.error || "Something went wrong");
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-primary-light p-4 mt-8 rounded-md ">
            <h1 className="text-3xl text-center mb-4">Profile</h1>
            <form className="w-full flex flex-col gap-3.5" onSubmit={handleSubmit(handleUpdate)}>
                {
                    profileInputs.map((el) => (
                        <CustomInput key={el.name} {...register(el.name, {
                            ...validations[el.name],
                            required: false
                        }, [el.name])} label={el.label} defaultValue={user[el.name]} error={errors?.[el.name]?.message} />
                    ))
                }

                <CustomInput type="number" {...register("age")} label={"age"} defaultValue={user.age} onKeyDown={(e) => {
                    if (['e', 'E', '+', '-', '.'].includes(e.key)) {
                        e.preventDefault();
                    }
                }} />

                {/* <CustomInput name={"firstName"} label={"First Name"} defaultValue={user.firstName} />
                <CustomInput name={"lastName"} label={"Last Name"} defaultValue={user.lastName} />
                <CustomInput type="number" name={"age"} label={"Age"} defaultValue={user.age} />
                <CustomInput name={"gender"} label={"Gender"} defaultValue={user.gender} />
                <CustomInput name={"photoUrl"} label={"Photo URL"} defaultValue={user.photoUrl} />
                <CustomInput name={"about"} label={"About"} defaultValue={user.about} /> */}


                <CustomButton type="submit" className={"rounded-md"}>Update Profile</CustomButton>
            </form>
        </div>
    );
};

export default Profile;