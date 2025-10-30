import { useSelector } from "react-redux";
import { CustomInput, CustomButton } from "../../custom-components";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const user = useSelector((state) => state.userReducer.user);
    const navigate = useNavigate();

    // const logout = async () => {
    //     try {
    //         await axios.post
    //     } catch {

    //     } 
    // };

    return (
        <div className="p-4 flex justify-between rounded-md text-white bg-primary-light items-center">
            <div>
                <h1 className="text-xl">DevTinder</h1>
            </div>
            {
                user && (
                    <div className="flex gap-4 items-center">
                        <CustomInput placeholder={"Search"} />
                        <div>
                            <div className="w-10 h-10 flex items-center">
                                <img className="rounded-full" src={user.photoUrl} alt="profile-pic" />
                            </div>
                            {/* <CustomButton onClick={() => navigate("/login")}>Logout</CustomButton> */}
                            <CustomButton>Logout</CustomButton>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default NavBar;