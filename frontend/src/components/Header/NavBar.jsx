import { useSelector } from "react-redux";
import CustomInput from "../../custom-components/CustomInput";

const NavBar = () => {
    const user = useSelector((state) => state.userReducer.user);

    return (
        <div className="p-4 flex justify-between mx-4 rounded-md text-white bg-primary-light items-center">
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
                        </div>
                    </div>
                )
            }
        </div>
    );
};

export default NavBar;