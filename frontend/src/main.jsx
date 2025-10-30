import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Feed from "./pages/Feed";
import { Provider } from 'react-redux';
import { store } from "./store/appStore.js";
import Protected from './components/Protected/Protected.jsx';
import SignUp from './pages/SignUp.jsx';

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
            }
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
