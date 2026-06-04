import { useEffect } from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
// import { setCredentials } from "./redux/authSlice";
import { getProfile } from "./services/userService";
import { setCredentials, setAuthLoading } from "./redux/authSlice";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import OtpPage from "./pages/OtpPage";
import Dashboard from "./pages/Dashboard";
import UploadPage from "./pages/UploadPage";
import ChatPage from "./pages/ChatPage";
import SettingsPage from "./pages/SettingsPage";
import ResultsPage from "./pages/ResultsPage";
import ProtectedRoute from "./components/ProtectedRoute";

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