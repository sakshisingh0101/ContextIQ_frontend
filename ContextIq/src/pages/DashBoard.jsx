import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import { setDocuments, removeDocument } from "../redux/documentSlice";
import { getDocuments, deleteDocument } from "../services/documentService";

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { documents } = useSelector(state => state.documents);

    useEffect(() => {
        getDocuments().then(res => {
            if (res.statusCode === 200) {
                dispatch(setDocuments(res.data));
            }
        });
    }, []);

    const handleDelete = async (id) => {
        const res = await deleteDocument(id);
        if (res.statusCode === 200) {
            dispatch(removeDocument(id));
        }
    };

    const handleOpenChat = (doc) => {
        navigate(`/chat/${doc.id}`, { state: { document: doc } });
    };

    return (
        <div className="flex min-h-screen bg-neutral-950">
            <Sidebar />

            <div className="flex-1 p-8">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-xl font-medium text-white">My documents</h1>
                    <button
                        onClick={() => navigate("/upload")}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-neutral-700 text-sm text-white hover:bg-neutral-800 transition"
                    >
                        + Upload new
                    </button>
                </div>

                {documents.length === 0 ? (
                    <div className="flex flex-col items-center justify-center mt-32 text-center">
                        <p className="text-4xl mb-4">📄</p>
                        <p className="text-neutral-400 text-sm mb-4">No documents yet</p>
                        <button
                            onClick={() => navigate("/upload")}
                            className="px-5 py-2.5 bg-white text-black rounded-lg text-sm font-medium hover:bg-neutral-200 transition"
                        >
                            Upload your first doc
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {documents.map(doc => (
                            <div
                                key={doc.id}
                                className="flex items-center gap-4 bg-neutral-900 border border-neutral-800 rounded-xl px-5 py-4 cursor-pointer hover:border-neutral-600 transition"
                                onClick={() => handleOpenChat(doc)}
                            >
                                <span className="text-2xl text-neutral-400">📄</span>

                                <div className="flex-1 overflow-hidden">
                                    <p className="text-sm font-medium text-white truncate">{doc.title}</p>
                                    <p className="text-xs text-neutral-500 mt-0.5">
                                        {new Date(doc.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                                        {doc.file_type && ` · ${doc.file_type.split("/")[1]?.toUpperCase()}`}
                                    </p>
                                </div>

                                <span className="text-xs px-2.5 py-1 rounded-full bg-green-950 text-green-400 border border-green-900 flex-shrink-0">
                                    {doc.processing_status}
                                </span>

                                {/* Chat icon */}
                                <button
                                    onClick={e => { e.stopPropagation(); handleOpenChat(doc); }}
                                    className="p-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition flex-shrink-0"
                                    title="Open chat"
                                >
                                    💬
                                </button>

                                {/* Delete icon */}
                                <button
                                    onClick={e => { e.stopPropagation(); handleDelete(doc.id); }}
                                    className="p-2 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-neutral-800 transition flex-shrink-0"
                                    title="Delete"
                                >
                                    🗑
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;