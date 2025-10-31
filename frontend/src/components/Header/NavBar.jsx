import { useDispatch, useSelector } from "react-redux";
import { CustomInput, CustomButton } from "../../custom-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { removeUser } from "../../store/store-slices/userSlice";
import { defaultPic } from "../../utils/constants";
import { useState } from "react";

const NavBar = () => {
    const user = useSelector((state) => state.userReducer.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [showMenu, setShowMenu] = useState(false);

    const logout = async () => {
        try {
            await axios.post("http://localhost:3000/logout", {}, {
                withCredentials: true
            });

            dispatch(removeUser());
            navigate("/login", {
                replace: true
            });

            console.log(window.history)
        } catch (error) {
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
                        <div className="flex gap-5 items-center relative">
                            <CustomButton className="size-12 flex p-0 bg-transparent items-center" onClick={() => setShowMenu(!showMenu)}>
                                <img className="rounded-full w-full h-full object-cover" src={user.photoUrl || defaultPic} alt="profile-pic" />
                            </CustomButton>


                            {
                                showMenu && (
                                    <ul className="p-4 bg-primary-light absolute -right-4.5 -bottom-50 text-[1.1rem] flex flex-col gap-1">
                                        <Link to={'/profile'}>
                                            <li>
                                                Profile
                                            </li>
                                        </Link>
                                        <Link to={'/'}>
                                            <li>
                                                Feed
                                            </li>
                                        </Link>
                                        <Link to={'/connections'}>
                                            <li>
                                                Connections
                                            </li>
                                        </Link>
                                        <Link to={'/requests'}>
                                            <li>
                                                Requests
                                            </li>
                                        </Link>
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