import InfoCard from "./InfoCard";
import { fallback, formatDate } from "../utils/formatters";

export default function PartnersList({ partners = [] }) {
    return (
        <InfoCard
            title="Sócios"
            description="Quadro societário retornado pela API."
        >
            {partners.length > 0 ? (
                <ul className="grid gap-3">
                    {partners.map((partner, index) => (
                        <li
                            key={`${partner.nome}-${index}`}
                            className="rounded-2xl bg-slate-50 p-4"
                        >
                            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                                <div>
                                    <h3 className="font-semibold text-slate-950">
                                        {fallback(partner.nome)}
                                    </h3>
                                    <p className="mt-1 text-sm text-slate-500">
                                        {fallback(
                                            partner.qualificacao_socio
                                                ?.descricao ??
                                                partner.qualificacao_socio,
                                        )}
                                    </p>
                                </div>
                                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
                                    {fallback(partner.tipo)}
                                </span>
                            </div>
                            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
                                <div>
                                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Entrada
                                    </dt>
                                    <dd className="mt-1 text-slate-800">
                                        {formatDate(partner.data_entrada)}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        País
                                    </dt>
                                    <dd className="mt-1 text-slate-800">
                                        {fallback(partner.pais?.nome)}
                                    </dd>
                                </div>
                            </dl>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
                    Nenhum sócio informado.
                </p>
            )}
        </InfoCard>
    );
}
