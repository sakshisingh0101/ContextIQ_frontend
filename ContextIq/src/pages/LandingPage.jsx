import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const LandingPage = () => {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-neutral-950 text-white flex flex-col">
            <Header />
            
            <div className="flex-1 flex flex-col items-center justify-center px-4 py-12">
                <h1 className="text-4xl font-medium mb-4 text-center">Chat with your documents</h1>
                <p className="text-neutral-400 text-base max-w-2xl mb-8 leading-relaxed text-center">
                    Upload meeting notes, PDFs, or any document. Ask questions, extract action items, and get instant answers.
                </p>
                <button onClick={() => navigate("/signup")} className="px-7 py-3 rounded-full bg-white text-black text-sm font-medium hover:bg-neutral-200 transition mb-14">
                    Get started →
                </button>

                <div className="flex justify-center gap-3 flex-wrap">
                    {[
                        { icon: "📤", text: "Upload any doc" },
                        { icon: "💬", text: "Chat with it" },
                        { icon: "✅", text: "Extract actions" },
                        { icon: "🔍", text: "Semantic search" }
                    ].map(item => (
                        <div key={item.text} className="bg-neutral-900 border border-neutral-800 rounded-xl px-5 py-4 text-sm text-neutral-400 flex items-center gap-2">
                            <span>{item.icon}</span> {item.text}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
export default LandingPage;