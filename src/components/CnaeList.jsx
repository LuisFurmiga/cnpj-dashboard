import InfoCard from "./InfoCard";
import CnaeHierarchy from "./CnaeHierarchy";

function CnaeItem({ cnae }) {
    return (
        <li className="rounded-2xl bg-slate-50 p-4">
            <CnaeHierarchy cnae={cnae} />
            <p className="mt-1 text-sm font-medium text-slate-900">
                {cnae?.descricao || "Descrição não informada"}
            </p>
        </li>
    );
}

export default function CnaeList({
    title,
    description,
    cnaes = [],
    emptyText = "Nenhuma atividade informada.",
}) {
    return (
        <InfoCard title={title} description={description}>
            {cnaes.length > 0 ? (
                <ul className="grid gap-3">
                    {cnaes.map((cnae) => (
                        <CnaeItem
                            key={`${cnae.subclasse || cnae.codigo || cnae.id}-${cnae.descricao}`}
                            cnae={cnae}
                        />
                    ))}
                </ul>
            ) : (
                <p className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
                    {emptyText}
                </p>
            )}
        </InfoCard>
    );
}
