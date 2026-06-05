const ResultsModal = ({ isOpen, data, onClose, onNavigate }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-neutral-900 border border-neutral-800 rounded-xl max-w-md w-full mx-4 p-6 max-h-[80vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-white">✓ Document Processed</h2>
                    <button
                        onClick={onClose}
                        className="text-neutral-400 hover:text-white text-2xl leading-none"
                    >
                        
                    </button>
                </div>

                {/* Content */}
                <div className="space-y-4">
                    {data?.title && (
                        <div>
                            <p className="text-xs text-neutral-500 mb-1">Title</p>
                            <p className="text-sm text-white font-medium">{data.title}</p>
                        </div>
                    )}

                    {data?.summary && (
                        <div>
                            <p className="text-xs text-neutral-500 mb-1">Summary</p>
                            <p className="text-sm text-neutral-300 line-clamp-4">{data.summary}</p>
                        </div>
                    )}

                    {data?.chunkCount && (
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-neutral-800 rounded-lg p-3">
                                <p className="text-xs text-neutral-500 mb-1">Chunks</p>
                                <p className="text-lg font-semibold text-white">{data.chunkCount}</p>
                            </div>
                            <div className="bg-neutral-800 rounded-lg p-3">
                                <p className="text-xs text-neutral-500 mb-1">Status</p>
                                <p className="text-lg font-semibold text-green-400">Ready</p>
                            </div>
                        </div>
                    )}

                    {data?.createdAt && (
                        <div>
                            <p className="text-xs text-neutral-500 mb-1">Processed at</p>
                            <p className="text-xs text-neutral-400">
                                {new Date(data.createdAt).toLocaleString()}
                            </p>
                        </div>
                    )}
                </div>

                {/* Actions */}
                <div className="flex gap-3 mt-6">
                    <button
                        onClick={onClose}
                        className="flex-1 bg-neutral-800 text-white rounded-lg py-2 text-sm font-medium hover:bg-neutral-700 transition"
                    >
                        Upload More
                    </button>
                    <button
                        onClick={onNavigate}
                        className="flex-1 bg-white text-black rounded-lg py-2 text-sm font-medium hover:bg-neutral-200 transition"
                    >
                        View in Dashboard →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ResultsModal;
