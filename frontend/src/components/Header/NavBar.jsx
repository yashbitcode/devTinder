import { useDispatch, useSelector } from "react-redux";
import { CustomInput, CustomButton } from "../../custom-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { removeUser } from "../../store/store-slices/userSlice";
import { defaultPic } from "../../utils/constants";

const NavBar = () => {
    const user = useSelector((state) => state.userReducer.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logout = async () => {
        try {
            await axios.post("http://localhost:3000/logout", {}, {
                withCredentials: true
            });
            
            dispatch(removeUser());
            // navigate("/login");
            navigate("/login", { 
                replace: true
            });
            
            console.log(window.history)
        } catch(error) {
            console.error(error.response.data.message);
        } 
    };

    return (
        <div className="p-4 flex justify-between rounded-md text-white bg-primary-light items-center mb-5">
            <div>
                <h1 className="text-xl">DevTinder</h1>
            </div>
            {
                user && (
                    <div className="flex gap-4 items-center">
                        <CustomInput placeholder={"Search"} />
                        <div className="flex gap-5 items-center">
                            <div className="w-30 h-8 flex items-center">
                                <img className="rounded-full" src={user.photoUrl || defaultPic} alt="profile-pic" />
                            </div>
                            {/* <CustomButton onClick={() => navigate("/login")}>Logout</CustomButton> */}
                            <CustomButton onClick={logout}>Logout</CustomButton>
                            <CustomButton onClick={() => navigate("/profile")}>profile</CustomButton>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default NavBar;