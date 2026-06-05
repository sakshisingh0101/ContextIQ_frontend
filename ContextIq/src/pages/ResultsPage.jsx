import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar.jsx";

const ResultsPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = location.state?.document;

    // Clean markdown and format text
    const formatSummary = (text) => {
        if (!text) return "";
        return text
            .replace(/#{1,6}\s+/g, "") // Remove markdown headers
            .replace(/\[.*?\]/g, "") // Remove brackets
            .replace(/\*{2}/g, "") // Remove bold markers
            .replace(/_{2}/g, "") // Remove underscores
            .replace(/\n\n+/g, "\n") // Clean multiple newlines
            .replace(/\\n/g, "\n")
            .trim();
    };

    // Check if field has content
    const hasContent = (field) => {
        if (!field) return false;
        if (Array.isArray(field)) return field.length > 0;
        if (typeof field === "string") return field.trim().length > 0;
        return false;
    };

    if (!data) {
        return (
            <div className="flex min-h-screen bg-neutral-950">
                <Sidebar />
                <div className="flex-1 p-8 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-neutral-400 mb-4">No document data found</p>
                        <button
                            onClick={() => navigate(-1)}
                            className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:bg-neutral-200 transition"
                        >
                            ← Go Back
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen bg-neutral-950">
            <Sidebar />
            
            <div className="flex-1 p-8 overflow-y-auto">
                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center gap-2 text-neutral-400 hover:text-white transition text-sm"
                >
                    ← Back
                </button>

                {/* Results content */}
                <div className="max-w-4xl">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-4xl font-bold text-white mb-2">✓ Document Processed</h1>
                        <p className="text-neutral-400">Your document is ready to chat with</p>
                    </div>

                    {/* Document Title */}
                    {data.title && (
                        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-6">
                            <h2 className="text-2xl font-semibold text-white">{data.title}</h2>
                        </div>
                    )}

                    {/* Summary Section */}
                    {hasContent(data.summary) && (
                        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-6">
                            <h3 className="text-lg font-bold text-white mb-4">📋 Summary</h3>
                            <p className="text-neutral-300 leading-relaxed whitespace-pre-wrap break-words">
                                {formatSummary(data.summary)}
                            </p>
                        </div>
                    )}

                    {/* Key Points */}
                    {hasContent(data.key_points) && (
                        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-6">
                            <h3 className="text-lg font-bold text-white mb-4">🎯 Key Points</h3>
                            <ul className="space-y-3">
                                {data.key_points.map((item, idx) => (
                                    <li key={idx} className="flex gap-3 text-neutral-300">
                                        <span className="text-blue-400 font-bold flex-shrink-0">•</span>
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Action Items */}
                    {hasContent(data.action_items) && (
                        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-6">
                            <h3 className="text-lg font-bold text-white mb-4">✅ Action Items</h3>
                            <ul className="space-y-3">
                                {data.action_items.map((item, idx) => (
                                    <li key={idx} className="flex gap-3 text-neutral-300">
                                        <span className="text-green-400 font-bold flex-shrink-0">→</span>
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Decisions */}
                    {hasContent(data.decisions) && (
                        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-6">
                            <h3 className="text-lg font-bold text-white mb-4">⚡ Decisions</h3>
                            <ul className="space-y-3">
                                {data.decisions.map((item, idx) => (
                                    <li key={idx} className="flex gap-3 text-neutral-300">
                                        <span className="text-yellow-400 font-bold flex-shrink-0">◆</span>
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Follow-up Questions */}
                    {hasContent(data.follow_up_questions) && (
                        <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 mb-6">
                            <h3 className="text-lg font-bold text-white mb-4">❓ Follow-up Questions</h3>
                            <ul className="space-y-3">
                                {data.follow_up_questions.map((item, idx) => (
                                    <li key={idx} className="flex gap-3 text-neutral-300">
                                        <span className="text-purple-400 font-bold flex-shrink-0">?</span>
                                        <span className="leading-relaxed">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Stats Section */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-neutral-800 rounded-lg p-4 text-center">
                            <p className="text-xs text-neutral-500 mb-2 uppercase">Status</p>
                            <p className="text-lg font-bold text-green-400">✓ Ready</p>
                        </div>
                        {data.chunkCount && (
                            <div className="bg-neutral-800 rounded-lg p-4 text-center">
                                <p className="text-xs text-neutral-500 mb-2 uppercase">Chunks</p>
                                <p className="text-lg font-bold text-white">{data.chunkCount}</p>
                            </div>
                        )}
                        {data.createdAt && (
                            <div className="bg-neutral-800 rounded-lg p-4 text-center">
                                <p className="text-xs text-neutral-500 mb-2 uppercase">Processed</p>
                                <p className="text-sm text-white">{new Date(data.createdAt).toLocaleDateString()}</p>
                            </div>
                        )}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-4 pt-4">
                        <button
                            onClick={() => navigate("/upload")}
                            className="flex-1 bg-neutral-800 text-white rounded-lg py-3 text-sm font-bold hover:bg-neutral-700 transition"
                        >
                            ↑ Upload More
                        </button>
                        <button
                            onClick={() => navigate(`/chat/${data._id || data.id}`, { state: { document: data } })}
                            className="flex-1 bg-white text-black rounded-lg py-3 text-sm font-bold hover:bg-neutral-200 transition"
                        >
                            💬 Chat with Document →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResultsPage;