import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import NavBar from "./components/Header/NavBar";
import Footer from "./components/Header/Footer";
import Login from "./components/Auth/Login/Login";
import { Provider } from 'react-redux'
import { store } from "./store/appStore";
import Feed from "./pages/Feed";

function AppLayout() {
    return (
        <Provider store={store}>
            <div className="bg-primary text-white relative pt-4 min-h-screen">
                <NavBar />
                <Outlet />
                <Footer />
            </div>
        </Provider>
    );
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                path: "/",
                element: <Feed />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/signup",
                element: (
                    <div>signup</div>
                )
            }
        ]
    }
]);

const App = () => {
    return <RouterProvider router={router} />
};

export default App;