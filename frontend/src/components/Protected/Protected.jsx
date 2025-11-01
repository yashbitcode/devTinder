import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const Protected = ({ reqAuth = true }) => {
    const user = !!useSelector((state) => state.userReducer.user);

    if(user && !reqAuth) return <Navigate to="/" replace />;
    if(!user && reqAuth) return <Navigate to="/login" replace />

    // if(reqAuth && (user !== reqAuth)) return <Navigate to="/login" replace />;
    // if(!reqAuth && (user !== reqAuth)) return <Navigate to="/" replace />;

    return <Outlet />;
};

export default Protected;