function InfoRow({ label, value }) {
    return (
        <div className="rounded-2xl bg-slate-50 p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {label}
            </dt>
            <dd className="mt-1 break-words text-sm font-medium text-slate-900">
                {value || "Não informado"}
            </dd>
        </div>
    );
}

export default function InfoCard({ title, description, items = [], children }) {
    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
            <div className="mb-5">
                <h2 className="text-lg font-semibold text-slate-950">
                    {title}
                </h2>
                {description && (
                    <p className="mt-1 text-sm text-slate-500">{description}</p>
                )}
            </div>

            {items.length > 0 && (
                <dl className="grid gap-3 sm:grid-cols-2">
                    {items.map((item) => (
                        <InfoRow
                            key={item.label}
                            label={item.label}
                            value={item.value}
                        />
                    ))}
                </dl>
            )}

            {children && (
                <div className={items.length > 0 ? "mt-4" : ""}>{children}</div>
            )}
        </section>
    );
}
