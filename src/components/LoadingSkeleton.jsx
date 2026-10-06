export default function LoadingSkeleton() {
    return (
        <div
            className="grid gap-5 lg:grid-cols-2"
            aria-label="Carregando dados da empresa"
        >
            {Array.from({ length: 6 }).map((_, index) => (
                <div
                    key={index}
                    className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
                >
                    <div className="h-5 w-1/2 animate-pulse rounded-full bg-slate-200" />
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        <div className="h-20 animate-pulse rounded-2xl bg-slate-100" />
                        <div className="h-20 animate-pulse rounded-2xl bg-slate-100" />
                        <div className="h-20 animate-pulse rounded-2xl bg-slate-100" />
                        <div className="h-20 animate-pulse rounded-2xl bg-slate-100" />
                    </div>
                </div>
            ))}
        </div>
    );
}
