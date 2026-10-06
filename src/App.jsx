import { useMemo, useState } from "react";
import AddressCard from "./components/AddressCard";
import CnaeList from "./components/CnaeList";
import CompanyHeader from "./components/CompanyHeader";
import EmailContact from "./components/EmailContact";
import InfoCard from "./components/InfoCard";
import LoadingSkeleton from "./components/LoadingSkeleton";
import PartnersList from "./components/PartnersList";
import PhoneContact from "./components/PhoneContact";
import SearchForm from "./components/SearchForm";
import { fetchCnpj } from "./services/cnpjApi";
import {
    fallback,
    formatBoolean,
    formatDate,
    formatPhone,
} from "./utils/formatters";
import { isValidCnpjLength, sanitizeCnpj } from "./utils/validators";

function EmptyState() {
    return (
        <section className="rounded-3xl border border-dashed border-slate-300 bg-white/70 p-8 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                Comece uma consulta
            </p>
            <h2 className="mt-3 text-2xl font-bold text-slate-950">
                Digite um CNPJ para visualizar os dados da empresa
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-slate-500">
                O dashboard organiza as informações públicas em cards simples
                para leitura rápida em qualquer tela.
            </p>
        </section>
    );
}

export default function App() {
    const [company, setCompany] = useState(null);
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleSearch(cnpjInput) {
        const sanitizedCnpj = sanitizeCnpj(cnpjInput);

        if (!isValidCnpjLength(sanitizedCnpj)) {
            setCompany(null);
            setError(
                "CNPJ inválido. Digite exatamente 14 números para consultar.",
            );
            return;
        }

        setIsLoading(true);
        setError("");

        try {
            const data = await fetchCnpj(sanitizedCnpj);
            setCompany(data);
        } catch (requestError) {
            setCompany(null);
            setError(requestError.message);
        } finally {
            setIsLoading(false);
        }
    }

    const establishment = company?.estabelecimento ?? {};
    const mainActivity = useMemo(
        () =>
            establishment.atividade_principal
                ? [establishment.atividade_principal]
                : [],
        [establishment.atividade_principal],
    );

    const secondaryActivities = establishment.atividades_secundarias ?? [];
    const simpleData = company?.simples ?? establishment?.simples ?? {};

    return (
        <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl space-y-8">
                <header className="mx-auto max-w-3xl text-center">
                    <span className="rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-slate-500 shadow-sm">
                        CNPJ.ws API pública
                    </span>
                    <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                        Consulta de CNPJ
                    </h1>
                    <p className="mt-4 text-lg leading-8 text-slate-600">
                        Consulte dados cadastrais, endereço, atividades
                        econômicas e quadro societário em um layout limpo e
                        responsivo.
                    </p>
                </header>

                <SearchForm onSubmit={handleSearch} isLoading={isLoading} />

                {error && (
                    <div
                        className="rounded-3xl border border-rose-200 bg-rose-50 p-5 text-sm font-medium text-rose-800"
                        role="alert"
                    >
                        {error}
                    </div>
                )}

                {isLoading && <LoadingSkeleton />}

                {!isLoading && !company && !error && <EmptyState />}

                {!isLoading && company && (
                    <div className="space-y-5">
                        <CompanyHeader company={company} />

                        <div className="grid gap-5 lg:grid-cols-2">
                            <InfoCard
                                title="Dados principais da empresa"
                                description="Identificação e características gerais."
                                items={[
                                    {
                                        label: "Razão social",
                                        value: fallback(company.razao_social),
                                    },
                                    {
                                        label: "Nome fantasia",
                                        value: fallback(
                                            establishment.nome_fantasia,
                                        ),
                                    },
                                    {
                                        label: "Natureza jurídica",
                                        value: fallback(
                                            company.natureza_juridica
                                                ?.descricao,
                                        ),
                                    },
                                    {
                                        label: "Porte",
                                        value: fallback(
                                            company.porte?.descricao,
                                        ),
                                    },
                                    {
                                        label: "Tipo",
                                        value: fallback(establishment.tipo),
                                    },
                                    {
                                        label: "Atualizado em",
                                        value: formatDate(
                                            company.atualizado_em,
                                        ),
                                    },
                                ]}
                            />

                            <InfoCard
                                title="Situação cadastral"
                                description="Status atual do estabelecimento."
                                items={[
                                    {
                                        label: "Situação",
                                        value: fallback(
                                            establishment.situacao_cadastral,
                                        ),
                                    },
                                    {
                                        label: "Data da situação",
                                        value: formatDate(
                                            establishment.data_situacao_cadastral,
                                        ),
                                    },
                                    {
                                        label: "Motivo",
                                        value: fallback(
                                            establishment
                                                .motivo_situacao_cadastral
                                                ?.descricao ??
                                                establishment.motivo_situacao_cadastral,
                                        ),
                                    },
                                    {
                                        label: "Início da atividade",
                                        value: formatDate(
                                            establishment.data_inicio_atividade,
                                        ),
                                    },
                                ]}
                            />

                            <AddressCard establishment={establishment} />

                            <CnaeList
                                title="Atividade econômica principal"
                                description="CNAE principal informado para a empresa."
                                cnaes={mainActivity}
                            />

                            <CnaeList
                                title="Atividades secundárias"
                                description="CNAEs secundários vinculados ao CNPJ."
                                cnaes={secondaryActivities}
                                emptyText="Nenhuma atividade secundária informada."
                            />

                            <InfoCard
                                title="Contatos"
                                description="Canais de contato retornados pela consulta."
                                items={[
                                    {
                                        label: "Telefone 1",
                                        value: (
                                            <PhoneContact
                                                ddd={establishment.ddd1}
                                                phone={establishment.telefone1}
                                            />
                                        ),
                                    },
                                    {
                                        label: "Telefone 2",
                                        value: (
                                            <PhoneContact
                                                ddd={establishment.ddd2}
                                                phone={establishment.telefone2}
                                            />
                                        ),
                                    },
                                    {
                                        label: "Fax",
                                        value: formatPhone(
                                            establishment.ddd_fax,
                                            establishment.fax,
                                        ),
                                    },
                                    {
                                        label: "E-mail",
                                        value: (
                                            <EmailContact
                                                email={establishment.email}
                                            />
                                        ),
                                    },
                                ]}
                            />

                            <InfoCard
                                title="Simples Nacional / MEI"
                                description="Opções tributárias quando disponíveis."
                                items={[
                                    {
                                        label: "Optante pelo Simples",
                                        value: formatBoolean(
                                            simpleData.simples,
                                        ),
                                    },
                                    {
                                        label: "Data opção Simples",
                                        value: formatDate(
                                            simpleData.data_opcao_simples,
                                        ),
                                    },
                                    {
                                        label: "Data exclusão Simples",
                                        value: formatDate(
                                            simpleData.data_exclusao_simples,
                                        ),
                                    },
                                    {
                                        label: "MEI",
                                        value: formatBoolean(simpleData.mei),
                                    },
                                    {
                                        label: "Data opção MEI",
                                        value: formatDate(
                                            simpleData.data_opcao_mei,
                                        ),
                                    },
                                    {
                                        label: "Data exclusão MEI",
                                        value: formatDate(
                                            simpleData.data_exclusao_mei,
                                        ),
                                    },
                                ]}
                            />

                            <div className="lg:col-span-2">
                                <PartnersList partners={company.socios ?? []} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
