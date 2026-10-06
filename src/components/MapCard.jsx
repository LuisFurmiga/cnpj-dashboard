import { buildGoogleMapsEmbedUrl, buildGoogleMapsUrl } from "../utils/maps";

function MapPlaceholder({ hasAddress }) {
    return (
        <div className="flex min-h-80 flex-col items-center justify-center rounded-2xl bg-slate-100 p-8 text-center">
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-10 w-10 fill-none stroke-slate-400"
                strokeWidth="1.5"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z"
                />
                <circle cx="12" cy="10" r="2.25" />
            </svg>
            <p className="mt-4 font-semibold text-slate-700">
                {hasAddress
                    ? "Visualização do mapa não configurada"
                    : "Endereço insuficiente para exibir o mapa"}
            </p>
            {hasAddress && (
                <p className="mt-2 max-w-sm text-sm leading-6 text-slate-500">
                    Configure a variável{" "}
                    <code className="rounded bg-white px-1.5 py-0.5">
                        VITE_GOOGLE_MAPS_API_KEY
                    </code>{" "}
                    para ativar o mapa interativo.
                </p>
            )}
        </div>
    );
}

export default function MapCard({ address }) {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const embedUrl = buildGoogleMapsEmbedUrl(address, apiKey);
    const mapsUrl = buildGoogleMapsUrl(address);

    return (
        <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm shadow-slate-200/60">
            <div className="mb-5 flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-lg font-semibold text-slate-950">
                        Localização no mapa
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                        Referência visual do endereço cadastrado.
                    </p>
                </div>
                {mapsUrl && (
                    <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-600"
                    >
                        Abrir no Google Maps
                        <span className="sr-only"> em uma nova aba</span>
                    </a>
                )}
            </div>

            {embedUrl ? (
                <iframe
                    title={`Mapa do endereço ${address}`}
                    src={embedUrl}
                    className="min-h-80 w-full rounded-2xl border-0"
                    loading="lazy"
                    allowFullScreen
                    referrerPolicy="strict-origin-when-cross-origin"
                />
            ) : (
                <MapPlaceholder hasAddress={Boolean(address)} />
            )}
        </section>
    );
}
