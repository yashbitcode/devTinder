import { Outlet } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addUser } from "./store/store-slices/userSlice";
import NavBar from "./components/Header/NavBar";
import Footer from "./components/Header/Footer";

function App() {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get("http://localhost:3000/profile/view", {
            withCredentials: true
        })
            .then((userData) => {
                if (userData) dispatch(addUser(userData.data))
            })
            .finally(() => setLoading(false));
    }, []);

    return !loading && (
        <>
            <div className="bg-primary text-white relative py-4 px-4 min-h-screen">
                <NavBar />
                <Outlet />
                <Footer />
            </div>
            
        </>
    );
};

export default App;