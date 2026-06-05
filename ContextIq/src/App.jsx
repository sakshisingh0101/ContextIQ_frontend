import { useEffect } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { setCredentials } from "./redux/authSlice";
import { getProfile } from "./services/userService.js";
import { setCredentials, setAuthLoading } from "./redux/authSlice.js";
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignupPage from "./pages/SignupPage.jsx";
import OtpPage from "./pages/OtpPage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import UploadPage from "./pages/UploadPage.jsx";
import ChatPage from "./pages/ChatPage.jsx";
import SettingsPage from "./pages/SettingsPage.jsx";
import ResultsPage from "./pages/ResultsPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

const router = createBrowserRouter([
    { path: "/",          element: <LandingPage /> },
    { path: "/login",     element: <LoginPage /> },
    { path: "/signup",    element: <SignupPage /> },
    { path: "/verify-otp",element: <OtpPage /> },
    {
        // protected routes — ek wrapper ke andar sab
        element: <ProtectedRoute />,
        children: [
            { path: "/dashboard", element: <Dashboard /> },
            { path: "/upload",    element: <UploadPage /> },
            { path: "/results",   element: <ResultsPage /> },
            { path: "/chat/:documentId", element: <ChatPage /> },
            { path: "/settings",  element: <SettingsPage /> },
        ]
    }
]);

function App() {
    const dispatch = useDispatch();

    // page refresh pe cookie se user restore karo
   useEffect(() => {
    getProfile()
        .then(res => {
            if (res.statusCode === 200) {
                dispatch(setCredentials({ user: res.data }));
            }
        })
        .catch(() => {})
        .finally(() => {
            dispatch(setAuthLoading(false)); // ← check complete
        });
}, []);


    return <RouterProvider router={router} />;
}

export default App;