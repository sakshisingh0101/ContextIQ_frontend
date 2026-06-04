import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { setCredentials } from "../redux/authSlice";
import { updateProfile, updatePassword} from "../services/userService";
import { deleteAllDocuments } from "../services/documentService";
import { setDocuments } from "../redux/documentSlice";

const SettingsPage = () => {
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [profile, setProfile] = useState({ username: user?.username || "", email: user?.email || "" });
    const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });
    const [profileMsg, setProfileMsg] = useState("");
    const [passwordMsg, setPasswordMsg] = useState("");
    const [profileLoading, setProfileLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);

    const handleProfileSave = async () => {
        setProfileLoading(true);
        setProfileMsg("");
        const res = await updateProfile(profile);
        if (res.statusCode === 200) {
            dispatch(setCredentials({ user: res.data }));
            setProfileMsg("✓ Profile saved");
        } else {
            setProfileMsg(res.message);
        }
        setProfileLoading(false);
    };

    const handlePasswordUpdate = async () => {
        setPasswordLoading(true);
        setPasswordMsg("");
        const res = await updatePassword(passwords);
        if (res.statusCode === 200) {
            setPasswordMsg("✓ Password updated");
            setPasswords({ currentPassword: "", newPassword: "" });
        } else {
            setPasswordMsg(res.message);
        }
        setPasswordLoading(false);
    };

    const handleDeleteAllDocs = async () => {
        if (!confirm("Delete all documents? This cannot be undone.")) return;
        const res = await deleteAllDocuments();
        if (res.statusCode === 200) {
            dispatch(setDocuments([]));
            alert("All documents deleted");
        }
    };

    return (
        <div className="flex min-h-screen bg-neutral-950">
            <Sidebar />

            <div className="flex-1 p-8 max-w-xl space-y-5">
                <h1 className="text-xl font-medium text-white mb-6">Settings</h1>

                {/* Profile */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
                    <h2 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
                        👤 Profile
                    </h2>
                    <div className="space-y-3">
                        {[
                            { label: "Username", key: "username" },
                            { label: "Email", key: "email", type: "email" }
                        ].map(f => (
                            <div key={f.key}>
                                <label className="text-xs text-neutral-400 block mb-1">{f.label}</label>
                                <input
                                    type={f.type || "text"}
                                    value={profile[f.key]}
                                    onChange={e => setProfile({ ...profile, [f.key]: e.target.value })}
                                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500"
                                />
                            </div>
                        ))}
                    </div>
                    {profileMsg && (
                        <p className={`text-xs mt-2 ${profileMsg.startsWith("✓") ? "text-green-400" : "text-red-400"}`}>
                            {profileMsg}
                        </p>
                    )}
                    <button
                        onClick={handleProfileSave}
                        disabled={profileLoading}
                        className="mt-4 px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-neutral-200 transition disabled:opacity-50"
                    >
                        {profileLoading ? "Saving..." : "Save changes"}
                    </button>
                </div>

                {/* Change password */}
                <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-5">
                    <h2 className="text-sm font-medium text-white mb-4 flex items-center gap-2">
                        🔒 Change password
                    </h2>
                    <div className="space-y-3">
                        {[
                            { label: "Current password", key: "currentPassword" },
                            { label: "New password", key: "newPassword" }
                        ].map(f => (
                            <div key={f.key}>
                                <label className="text-xs text-neutral-400 block mb-1">{f.label}</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    value={passwords[f.key]}
                                    onChange={e => setPasswords({ ...passwords, [f.key]: e.target.value })}
                                    className="w-full bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-neutral-500"
                                />
                            </div>
                        ))}
                    </div>
                    {passwordMsg && (
                        <p className={`text-xs mt-2 ${passwordMsg.startsWith("✓") ? "text-green-400" : "text-red-400"}`}>
                            {passwordMsg}
                        </p>
                    )}
                    <button
                        onClick={handlePasswordUpdate}
                        disabled={passwordLoading}
                        className="mt-4 px-4 py-2 bg-white text-black rounded-lg text-sm font-medium hover:bg-neutral-200 transition disabled:opacity-50"
                    >
                        {passwordLoading ? "Updating..." : "Update password"}
                    </button>
                </div>

                {/* Danger zone */}
                <div className="bg-neutral-900 border border-red-900 rounded-xl p-5">
                    <h2 className="text-sm font-medium text-red-400 mb-4">⚠ Danger zone</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-white">Delete all documents</p>
                                <p className="text-xs text-neutral-500 mt-0.5">Removes all uploaded docs and chunks</p>
                            </div>
                            <button
                                onClick={handleDeleteAllDocs}
                                className="px-3 py-1.5 rounded-lg border border-red-800 text-red-400 text-xs hover:bg-red-950 transition"
                            >
                                Delete all
                            </button>
                        </div>
                        <div className="h-px bg-neutral-800" />
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-white">Delete account</p>
                                <p className="text-xs text-neutral-500 mt-0.5">Permanently removes your account</p>
                            </div>
                            <button className="px-3 py-1.5 rounded-lg border border-red-800 text-red-400 text-xs hover:bg-red-950 transition">
                                Delete account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;