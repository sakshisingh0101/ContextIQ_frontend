import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { logout as logoutApi } from "../services/authService";

const Sidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);

    const handleLogout = async () => {
        await logoutApi();
        dispatch(logout());
        navigate("/");
    };

    const navItems = [
        { label: "Dashboard", path: "/dashboard", icon: "⊞" },
        { label: "Upload", path: "/upload", icon: "↑" },
        { label: "Settings", path: "/settings", icon: "⚙" },
    ];

    const initials = user?.username
        ? user.username.slice(0, 2).toUpperCase()
        : "U";

    return (
        <div className="w-56 min-h-screen bg-neutral-900 border-r border-neutral-800 flex flex-col px-3 py-4 flex-shrink-0">
            {/* User info */}
            <div className="flex items-center gap-3 px-2 pb-4 mb-2 border-b border-neutral-800">
                <div className="w-8 h-8 rounded-full bg-neutral-700 flex items-center justify-center text-xs font-medium text-white flex-shrink-0">
                    {initials}
                </div>
                <div className="overflow-hidden">
                    <p className="text-sm font-medium text-white truncate">{user?.username}</p>
                    <p className="text-xs text-neutral-500 truncate">{user?.email}</p>
                </div>
            </div>

            {/* Nav items */}
            <nav className="flex flex-col gap-1 flex-1">
                {navItems.map(item => (
                    <button
                        key={item.path}
                        onClick={() => navigate(item.path)}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-left transition w-full
                            ${location.pathname === item.path
                                ? "bg-neutral-800 text-white font-medium"
                                : "text-neutral-400 hover:bg-neutral-800 hover:text-white"
                            }`}
                    >
                        <span>{item.icon}</span>
                        {item.label}
                    </button>
                ))}
            </nav>

            {/* Logout at bottom */}
            <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-400 hover:bg-neutral-800 transition w-full mt-2"
            >
                <span>→</span> Logout
            </button>
        </div>
    );
};

export default Sidebar;