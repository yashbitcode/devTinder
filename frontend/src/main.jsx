import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Provider } from 'react-redux';
import { store } from "./store/appStore.js";
import Protected from './components/Protected/Protected.jsx';
import { Feed, Login, SignUp, Profile } from "./pages/index.js";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: (
                    <Protected>
                        <Feed />
                    </Protected>
                )
            },
            {
                path: "/login",
                element: (
                    <Protected reqAuth={false}>
                        <Login />
                    </Protected>
                )
            },
            {
                path: "/signup",
                element: (
                    <Protected reqAuth={false}>
                        <SignUp />
                    </Protected>
                )
            },
            {
                path: "/profile",
                element: (
                    <Protected>
                        <Profile />
                    </Protected>
                )
            },
        ]
    }
]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>,
);
