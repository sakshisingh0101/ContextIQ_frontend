import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "../components/Header.jsx";
import { setCredentials } from "../redux/authSlice.jsx";
import { login } from "../services/authService.jsx";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await login(form);
            if (res.statusCode === 200) {
                dispatch(setCredentials({ user: res.data }));
                navigate("/dashboard");
            } else {
                setError(res.message);
            }
        } catch {
            setError("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-neutral-950 flex flex-col">
            <Header />
            <div className="flex-1 flex items-center justify-center px-4">
                <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-8 w-full max-w-sm">
                    <h2 className="text-xl font-medium text-white mb-1">Welcome back</h2>
                    <p className="text-sm text-neutral-400 mb-6">Log in to your ContextIQ account</p>

                    {error && (
                        <div className="bg-red-950 border border-red-800 text-red-400 text-sm px-3 py-2 rounded-lg mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {[
                            { label: "Email", key: "email", type: "email", placeholder: "you@example.com" },
                            { label: "Password", key: "password", type: "password", placeholder: "••••••••" }
                        ].map(field => (
                            <div key={field.key}>
                                <label className="text-xs text-neutral-400 block mb-1">{field.label}</label>
                                <input
                                    type={field.type}
                                    placeholder={field.placeholder}
                                    value={form[field.key]}
                                    onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                                    required
                                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-500"
                                />
                            </div>
                        ))}

                        <button type="submit" disabled={loading}
                            className="w-full bg-white text-black rounded-lg py-2.5 text-sm font-medium hover:bg-neutral-200 transition disabled:opacity-50">
                            {loading ? "Logging in..." : "Log in →"}
                        </button>
                    </form>

                    <p className="text-xs text-neutral-500 text-center mt-4">
                        No account?{" "}
                        <Link to="/signup" className="text-white underline">Sign up free</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
export default LoginPage;