export function MosaicSpinner() {
    const heights = ["h-96", "h-96", "h-96"];

    return (
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
            {heights.map((height, i) => (
                <div key={i} className="mb-6 break-inside-avoid">
                    <div className={`relative overflow-hidden rounded-xl bg-gray-100 ${height}`}>
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
                        <div className="absolute bottom-0 w-full p-4 space-y-2 bg-white/60 backdrop-blur-sm">
                            <div className="h-4 w-2/3 rounded bg-gray-300 animate-pulse" />
                            <div className="h-3 w-1/3 rounded bg-gray-200 animate-pulse" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}