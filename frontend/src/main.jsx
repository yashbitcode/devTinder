import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom"
import { Provider } from 'react-redux';
import { store } from "./store/appStore.js";
import Protected from './components/Protected/Protected.jsx';
import { Feed, Login, SignUp, Profile, AllConnections } from "./pages/index.js";
import AllRequests from './pages/AllRequests.jsx'
import ForgotPassword from './pages/ForgotPassword.jsx'

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <App />,
//         children: [
//             {
//                 path: "/",
//                 element: (
//                     <Protected>
//                         <Feed />
//                     </Protected>
//                 )
//             },
//             {
//                 path: "/connections",
//                 element: (
//                     <Protected>
//                         <AllConnections />
//                     </Protected>
//                 )
//             },
//             {
//                 path: "/profile",
//                 element: (
//                     <Protected>
//                         <Profile />
//                     </Protected>
//                 )
//             },
//             {
//                 path: "/requests",
//                 element: (
//                     <Protected>
//                         <AllRequests />
//                     </Protected>
//                 )
//             },
//             {
//                 path: "/login",
//                 element: (
//                     <Protected reqAuth={false}>
//                         <Login />
//                     </Protected>
//                 )
//             },
//             {
//                 path: "/signup",
//                 element: (
//                     <Protected reqAuth={false}>
//                         <SignUp />
//                     </Protected>
//                 )
//             },
//             {
//                 path: "/forgot-password",
//                 element: (
//                     <Protected reqAuth={false}>
//                         <ForgotPassword />
//                     </Protected>
//                 )
//             },
//         ]
//     }
// ]);

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            {/* <RouterProvider router={router} /> */}

            <BrowserRouter>
                <Routes>
                    <Route element={<App />}>
                        <Route element={<Protected />}>
                            <Route index element={<Feed />} />
                            <Route path="connections" element={<AllConnections />} />
                            <Route path="profile" element={<Profile />} />
                            <Route path="requests" element={<AllRequests />} />
                        </Route>

                        <Route element={<Protected reqAuth={false} />}>
                            <Route path="login" element={<Login />} />
                            <Route path="signup" element={<SignUp />} />
                            <Route path="forgot-password" element={<ForgotPassword />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    </StrictMode>,
);
