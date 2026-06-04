import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "../components/Header";
import { setCredentials } from "../redux/authSlice";
import { verifyEmail } from "../services/authService";

const OtpPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { state } = useLocation();
    const email = state?.email || "";
    const [otp, setOtp] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const res = await verifyEmail({ email, otp });
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
                    <h2 className="text-xl font-medium text-white mb-1">Verify your email</h2>
                    <p className="text-sm text-neutral-400 mb-6">
                        OTP sent to <span className="text-white">{email}</span>
                    </p>

                    {error && (
                        <div className="bg-red-950 border border-red-800 text-red-400 text-sm px-3 py-2 rounded-lg mb-4">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="text-xs text-neutral-400 block mb-1">Enter 6-digit OTP</label>
                            <input
                                type="text"
                                maxLength={6}
                                placeholder="123456"
                                value={otp}
                                onChange={e => setOtp(e.target.value.replace(/\D/g, ""))}
                                required
                                className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-3 text-white text-2xl tracking-[1rem] text-center placeholder-neutral-600 focus:outline-none focus:border-neutral-500"
                            />
                        </div>

                        <button type="submit" disabled={loading || otp.length !== 6}
                            className="w-full bg-white text-black rounded-lg py-2.5 text-sm font-medium hover:bg-neutral-200 transition disabled:opacity-40">
                            {loading ? "Verifying..." : "Verify & continue →"}
                        </button>
                    </form>

                    <p className="text-xs text-neutral-500 text-center mt-4">
                        Wrong email?{" "}
                        <span onClick={() => navigate("/signup")} className="text-white underline cursor-pointer">
                            Go back
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};
export default OtpPage;