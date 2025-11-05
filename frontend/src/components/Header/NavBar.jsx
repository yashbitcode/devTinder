import { useDispatch, useSelector } from "react-redux";
import { CustomButton } from "../../custom-components";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../../services/authService";
import { removeUser } from "../../store/store-slices/userSlice";
import { defaultPic, menuOptions } from "../../utils/constants";
import { useState } from "react";
import { toast } from "react-toastify";

const NavBar = () => {
    const user = useSelector((state) => state.userReducer.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showMenu, setShowMenu] = useState(false);

    const logout = async () => {
        const res = await Auth.logout();
        if (res?.data?.success) {
            dispatch(removeUser());
            navigate("/login", {
                replace: true
            });

            setShowMenu(false);
            toast.success(res.data.message);
        } else {
            toast.error(res?.response?.data?.error || "Something went wrong")
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
                        <h1 className="text-xl">Welcome, {user.firstName}</h1>
                        <div className="flex gap-5 items-center relative">
                            <CustomButton className="size-12 flex p-0 bg-transparent items-center" onClick={() => setShowMenu(!showMenu)}>
                                <img className="rounded-full w-full h-full object-cover" src={user.photoUrl || defaultPic} alt="profile-pic" />
                            </CustomButton>


                            {
                                showMenu && (
                                    <ul className="p-4 rounded-md bg-primary-light absolute -right-4.5 -bottom-60 text-[1.1rem] flex flex-col gap-1">
                                        {
                                            menuOptions.map((el) => (
                                                <Link to={el.href} onClick={() => setShowMenu(false)}>
                                                    <li>{el.label}</li>
                                                </Link>
                                            ))
                                        }
                                        <li>
                                            <CustomButton className={"bg-transparent p-0 text-start"} onClick={logout}>Logout</CustomButton>
                                        </li>
                                    </ul>
                                )
                            }
                        </div>
                    </div>
                )
            }
        </div>
    );
};
export default NavBar;