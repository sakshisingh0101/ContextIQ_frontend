import { useState, useEffect, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import {
    setConversationId,
    setMessages,
    addMessage,
    setLoading,
    resetChat
} from "../redux/chatSlice";
import {
    createConversation,
    sendMessage,
    getConversation
} from "../services/chatService";

const ChatPage = () => {
    const { documentId } = useParams();
    const { state } = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { conversationId, messages, loading } = useSelector(s => s.chat);
    const doc = state?.document;

    const [input, setInput] = useState("");
    const [sources, setSources] = useState([]);
    const bottomRef = useRef(null);

    // ── 1. Init conversation on mount ──────────────────────────
    useEffect(() => {
        dispatch(resetChat());

        const init = async () => {
            const res = await createConversation({
                documentId,
                title: doc?.title || "New Conversation"
            });
            if (res.statusCode === 201) {
                dispatch(setConversationId(res.data.id));

                // fetch existing messages if any
                const history = await getConversation(res.data.id);
                if (history.statusCode === 200 && history.data.length > 0) {
                    dispatch(setMessages(history.data));
                } else {
                    // first time — show welcome message
                    dispatch(setMessages([{
                        id: "welcome",
                        role: "assistant",
                        content: `Hi! I've read **${doc?.title || "your document"}**. Ask me anything about it.`
                    }]));
                }
            }
        };

        init();
    }, [documentId]);

    // ── 2. Auto scroll to bottom ────────────────────────────────
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    // ── 3. Send message ─────────────────────────────────────────
    const handleSend = async () => {
        if (!input.trim() || loading || !conversationId) return;

        const userMsg = { id: Date.now(), role: "user", content: input.trim() };
        dispatch(addMessage(userMsg));
        setInput("");
        setSources([]);
        dispatch(setLoading(true));

        try {
            const res = await sendMessage(conversationId, input.trim());
            if (res.statusCode === 200) {
                dispatch(addMessage(res.data.message));
                setSources(res.data.sources || []);
            } else {
                dispatch(addMessage({
                    id: Date.now() + 1,
                    role: "assistant",
                    content: "Sorry, something went wrong. Please try again."
                }));
            }
        } catch {
            dispatch(addMessage({
                id: Date.now() + 1,
                role: "assistant",
                content: "Network error. Please try again."
            }));
        } finally {
            dispatch(setLoading(false));
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    // parse **bold** text simply
    const renderContent = (text) => {
        const parts = text.split(/\*\*(.*?)\*\*/g);
        return parts.map((part, i) =>
            i % 2 === 1
                ? <strong key={i} className="font-medium text-white">{part}</strong>
                : part
        );
    };

    return (
        <div className="flex min-h-screen bg-neutral-950">
            <Sidebar />

            <div className="flex flex-1 overflow-hidden h-screen">

                {/* ── Left: Document summary panel (separate scroll) ── */}
                <div className="w-56 flex-shrink-0 border-r border-neutral-800 bg-neutral-900 p-4 overflow-y-auto h-full">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="text-neutral-400">📄</span>
                        <p className="text-sm font-medium text-white truncate">
                            {doc?.title || "Document"}
                        </p>
                    </div>

                    {doc?.summary && (() => {
                        let summary = doc.summary;
                        try { summary = JSON.parse(doc.summary); } catch {}

                        return (
                            <div className="space-y-4">
                                {summary.summary && (
                                    <div>
                                        <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Summary</p>
                                        <p className="text-xs text-neutral-400 leading-relaxed">{summary.summary}</p>
                                    </div>
                                )}

                                {summary.action_items?.length > 0 && (
                                    <div>
                                        <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Action items</p>
                                        <ul className="space-y-1">
                                            {summary.action_items.map((item, i) => (
                                                <li key={i} className="text-xs text-neutral-400 flex gap-1.5">
                                                    <span className="text-neutral-600 flex-shrink-0">•</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {summary.decisions?.length > 0 && (
                                    <div>
                                        <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Decisions</p>
                                        <ul className="space-y-1">
                                            {summary.decisions.map((d, i) => (
                                                <li key={i} className="text-xs text-neutral-400 flex gap-1.5">
                                                    <span className="text-neutral-600 flex-shrink-0">•</span>
                                                    {d}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {summary.key_points?.length > 0 && (
                                    <div>
                                        <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Key points</p>
                                        <ul className="space-y-1">
                                            {summary.key_points.map((kp, i) => (
                                                <li key={i} className="text-xs text-neutral-400 flex gap-1.5">
                                                    <span className="text-neutral-600 flex-shrink-0">•</span>
                                                    {kp}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        );
                    })()}
                </div>

                {/* ── Right: Chat area (separate scroll) ── */}
                <div className="flex flex-col flex-1 overflow-hidden h-full">

                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-3 border-b border-neutral-800 bg-neutral-900 flex-shrink-0">
                        <p className="text-sm text-neutral-400">
                            Chat · <span className="text-white">{doc?.title || "Document"}</span>
                        </p>
                        <button
                            onClick={() => navigate("/dashboard")}
                            className="text-xs text-neutral-500 hover:text-white transition flex items-center gap-1"
                        >
                            ← Dashboard
                        </button>
                    </div>

                    {/* Messages - scrollable only this section */}
                    <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed
                                    ${msg.role === "user"
                                        ? "bg-white text-black rounded-br-sm"
                                        : "bg-neutral-800 text-neutral-200 rounded-bl-sm"
                                    }`}
                                >
                                    {renderContent(msg.content)}
                                </div>
                            </div>
                        ))}

                        {/* Typing indicator */}
                        {loading && (
                            <div className="flex justify-start">
                                <div className="bg-neutral-800 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                                    {[0, 1, 2].map(i => (
                                        <span
                                            key={i}
                                            className="w-1.5 h-1.5 bg-neutral-500 rounded-full animate-bounce"
                                            style={{ animationDelay: `${i * 0.15}s` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        <div ref={bottomRef} />
                    </div>

                    {/* Sources */}
                    {sources.length > 0 && (
                        <div className="px-6 pb-2 flex-shrink-0 border-t border-neutral-800">
                            <p className="text-xs text-neutral-500 mb-1.5 pt-2">Sources used:</p>
                            <div className="flex gap-2 flex-wrap">
                                {sources.map((s, i) => (
                                    <div
                                        key={i}
                                        className="text-xs bg-neutral-800 border border-neutral-700 rounded-lg px-3 py-1.5 text-neutral-400 max-w-xs truncate"
                                        title={s.text}
                                    >
                                        [{i + 1}] {s.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Input - always fixed at bottom */}
                    <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-950 flex-shrink-0">
                        <div className="flex gap-3 items-end">
                            <textarea
                                rows={1}
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Ask a follow-up question..."
                                className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 resize-none"
                                style={{ maxHeight: "120px" }}
                            />
                            <button
                                onClick={handleSend}
                                disabled={loading || !input.trim()}
                                className="px-4 py-3 bg-white text-black rounded-xl text-sm font-medium hover:bg-neutral-200 transition disabled:opacity-40 flex-shrink-0"
                            >
                                Send →
                            </button>
                        </div>
                        <p className="text-xs text-neutral-600 mt-2">Enter to send · Shift+Enter for new line</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatPage;