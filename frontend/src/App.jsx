import { Outlet } from "react-router-dom";
import User from "./services/userService";
import { ToastContainer } from 'react-toastify';
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addUser } from "./store/store-slices/userSlice";
import NavBar from "./components/Header/NavBar";
import Footer from "./components/Header/Footer";

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        User.getUserProfile()
            .then((res) => {
                if (res?.data?.success) dispatch(addUser(res.data.user))
            })
            .finally(() => setLoading(false));
    }, []);

    return !loading && (
        <div className="bg-primary relative flex flex-col text-white py-4 px-4 min-h-screen h-full">
            <NavBar />
            <main className="grow">
                <Outlet />
            </main>
            <Footer />
            <ToastContainer
                position="top-left"
                autoClose={5000}
                pauseOnHover
                theme="light"
            />
        </div>

    );
};

export default App;