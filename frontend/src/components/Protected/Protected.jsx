import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Protected = ({ reqAuth = true, children }) => {
    let user = useSelector((state) => state.userReducer.user);

    if(user && !reqAuth) return <Navigate to="/" replace />;
    if(!user && reqAuth) return <Navigate to="/login" replace />

    return children;
};

export default Protected;