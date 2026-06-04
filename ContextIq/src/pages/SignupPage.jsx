import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import { register } from "../services/authService";

const SignupPage = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ userName: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await register(form);
            if (res.statusCode === 200) {
                navigate("/verify-otp", { state: { email: form.email } });
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
                    <h2 className="text-xl font-medium text-white mb-1">Create account</h2>
                    <p className="text-sm text-neutral-400 mb-6">Start chatting with your documents</p>

                    {error && (
                        <div className="bg-red-950 border border-red-800 text-red-400 text-sm px-3 py-2 rounded-lg mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {[
                            { label: "Username", key: "userName", type: "text", placeholder: "yourname" },
                            { label: "Email", key: "email", type: "email", placeholder: "you@example.com" },
                            { label: "Password", key: "password", type: "password", placeholder: "min 6 characters" }
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
                            className="w-full bg-white text-black rounded-lg py-2.5 text-sm font-medium hover:bg-neutral-200 transition disabled:opacity-50 mt-2">
                            {loading ? "Sending OTP..." : "Continue →"}
                        </button>
                    </form>

                    <p className="text-xs text-neutral-500 text-center mt-4">
                        Already have an account?{" "}
                        <Link to="/login" className="text-white underline">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};
export default SignupPage;