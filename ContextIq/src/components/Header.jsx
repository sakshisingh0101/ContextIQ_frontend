import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, isAuthenticated } = useSelector(state => state.auth);

    const isActive = (path) => location.pathname === path;

    return (
        <div className="bg-neutral-900 border-b border-neutral-800 px-8 py-4 flex items-center justify-between">
            <button
                onClick={() => navigate("/")}
                className="text-xl font-semibold text-white hover:text-neutral-200 transition"
            >
                ContextIQ
            </button>

            {isAuthenticated && user ? (
                <div className="flex items-center gap-3">
                    <span className="text-sm text-neutral-400">{user.email}</span>
                    <span className="text-sm font-medium text-white">{user.username}</span>
                </div>
            ) : (
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => navigate("/")}
                        className={`text-sm px-3 py-2 rounded-lg transition ${
                            isActive("/")
                                ? "bg-neutral-800 text-white"
                                : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                        }`}
                    >
                        Home
                    </button>
                    <button
                        onClick={() => navigate("/login")}
                        className={`text-sm px-3 py-2 rounded-lg transition ${
                            isActive("/login")
                                ? "bg-neutral-800 text-white"
                                : "text-neutral-400 hover:text-white hover:bg-neutral-800"
                        }`}
                    >
                        Log in
                    </button>
                    <button
                        onClick={() => navigate("/signup")}
                        className="text-sm px-4 py-2 rounded-lg bg-white text-black font-medium hover:bg-neutral-200 transition"
                    >
                        Sign up
                    </button>
                </div>
            )}
        </div>
    );
};

export default Header;
