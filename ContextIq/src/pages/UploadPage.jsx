import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Sidebar from "../components/Sidebar";
import { addDocument } from "../redux/documentSlice";
import { uploadDocument } from "../services/documentService";

const STEPS = [
    "Extracting text",
    "Chunking document",
    "Generating summary",
    "Creating embeddings",
    "Saving to database"
];

const UploadPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [file, setFile] = useState(null);
    const [rawText, setRawText] = useState("");
    const [title, setTitle] = useState("");
    const [processing, setProcessing] = useState(false);
    const [currentStep, setCurrentStep] = useState(-1);
    const [error, setError] = useState("");

    const resetForm = () => {
        setFile(null);
        setRawText("");
        setTitle("");
        setError("");
        setCurrentStep(-1);
        setProcessing(false);
    };

    const handleSubmit = async () => {
        if (!file && !rawText.trim()) {
            setError("Please upload a file or paste text");
            return;
        }
        setError("");
        setProcessing(true);

        // simulate step progress while API runs
        let step = 0;
        const interval = setInterval(() => {
            if (step < STEPS.length - 1) {
                setCurrentStep(step);
                step++;
            }
        }, 1800);

        try {
            const formData = new FormData();
            if (file) formData.append("document", file);
            if (rawText.trim()) formData.append("rawText", rawText);
            if (title.trim()) formData.append("title", title);

            const res = await uploadDocument(formData);
            console.log("Upload response:", res);
            clearInterval(interval);
            setCurrentStep(STEPS.length - 1);

            if (res.statusCode === 201 || res.statusCode === 200) {
                console.log("Success! Navigating to results page");
                dispatch(addDocument(res.data));
                resetForm();
                // Navigate to results page with document data
                navigate("/results", { state: { document: res.data } });
            } else {
                console.log("Upload failed with status:", res.statusCode);
                setError(res.message || "Upload failed");
                setProcessing(false);
                setCurrentStep(-1);
            }
        } catch (error) {
            clearInterval(interval);
            console.error("Upload error:", error);
            setError("Upload failed. Try again.");
            setProcessing(false);
            setCurrentStep(-1);
        }
    };

    return (
        <div className="flex min-h-screen bg-neutral-950">
            <Sidebar />

            <div className="flex-1 p-8 max-w-2xl">
                <h1 className="text-xl font-medium text-white mb-6">Upload document</h1>

                {!processing ? (
                    <div className="space-y-4">
                        {/* Title */}
                        <div>
                            <label className="text-xs text-neutral-400 block mb-1">Title (optional)</label>
                            <input
                                type="text"
                                placeholder="e.g. Project Alpha meeting"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600"
                            />
                        </div>

                        {/* File drop */}
                        <div
                            className="border-2 border-dashed border-neutral-800 rounded-xl p-10 text-center cursor-pointer hover:border-neutral-600 hover:bg-neutral-900 transition"
                            onClick={() => document.getElementById("file-input").click()}
                        >
                            <p className="text-3xl mb-3">☁</p>
                            {file ? (
                                <p className="text-sm text-white font-medium">{file.name}</p>
                            ) : (
                                <>
                                    <p className="text-sm text-white font-medium mb-1">Drag & drop or click to browse</p>
                                    <p className="text-xs text-neutral-500">PDF, DOCX, TXT · max 10MB</p>
                                </>
                            )}
                            <input
                                id="file-input"
                                type="file"
                                accept=".pdf,.docx,.txt"
                                className="hidden"
                                onChange={e => setFile(e.target.files[0])}
                            />
                        </div>

                        <div className="flex items-center gap-3 text-neutral-600 text-xs">
                            <div className="flex-1 h-px bg-neutral-800" />
                            or paste raw text
                            <div className="flex-1 h-px bg-neutral-800" />
                        </div>

                        {/* Raw text */}
                        <textarea
                            rows={5}
                            placeholder="Paste meeting notes or any text here..."
                            value={rawText}
                            onChange={e => setRawText(e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-neutral-600 resize-none"
                        />

                        {error && (
                            <div className="bg-red-950 border border-red-800 text-red-400 text-sm px-3 py-2 rounded-lg">
                                {error}
                            </div>
                        )}

                        <button
                            onClick={handleSubmit}
                            className="w-full bg-white text-black rounded-lg py-2.5 text-sm font-medium hover:bg-neutral-200 transition"
                        >
                            Process document →
                        </button>
                    </div>
                ) : (
                    // Processing state
                    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6">
                        <p className="text-sm font-medium text-white mb-6">Processing your document...</p>
                        <div className="space-y-3">
                            {STEPS.map((step, i) => (
                                <div key={step} className="flex items-center gap-3">
                                    <span className={`text-base flex-shrink-0 ${
                                        i < currentStep ? "text-green-400" :
                                        i === currentStep ? "text-white animate-pulse" :
                                        "text-neutral-600"
                                    }`}>
                                        {i < currentStep ? "✓" : i === currentStep ? "◌" : "○"}
                                    </span>
                                    <span className={`text-sm ${
                                        i < currentStep ? "text-green-400" :
                                        i === currentStep ? "text-white" :
                                        "text-neutral-600"
                                    }`}>
                                        {step}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Progress bar */}
                        <div className="mt-6 h-1 bg-neutral-800 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-white rounded-full transition-all duration-700"
                                style={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UploadPage;