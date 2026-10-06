import { fallback, formatCnpj, formatCurrency } from "../utils/formatters";

export default function CompanyHeader({ company }) {
    const establishment = company?.estabelecimento ?? {};
    const fantasyName = establishment.nome_fantasia;

    return (
        <section className="rounded-[2rem] bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300 sm:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div>
                    <p className="text-sm font-medium uppercase tracking-[0.25em] text-slate-400">
                        Empresa consultada
                    </p>
                    <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl">
                        {fallback(company?.razao_social)}
                    </h1>
                    {fantasyName && (
                        <p className="mt-2 text-lg text-slate-300">
                            Nome fantasia: {fantasyName}
                        </p>
                    )}
                </div>
                <div className="grid gap-3 text-sm sm:grid-cols-2 lg:min-w-96">
                    <div className="rounded-2xl bg-white/10 p-4">
                        <span className="text-slate-400">CNPJ</span>
                        <strong className="mt-1 block text-base">
                            {formatCnpj(establishment.cnpj) || "Não informado"}
                        </strong>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-4">
                        <span className="text-slate-400">Capital social</span>
                        <strong className="mt-1 block text-base">
                            {formatCurrency(company?.capital_social)}
                        </strong>
                    </div>
                </div>
            </div>
        </section>
    );
}
