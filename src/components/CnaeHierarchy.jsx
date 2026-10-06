import { useId, useState } from "react";
import { fetchCnaeHierarchy } from "../services/cnaeApi";

const HIERARCHY_LEVELS = [
    { key: "secao", label: "Seção", indent: "pl-0", connector: null },
    { key: "divisao", label: "Divisão", indent: "pl-4", connector: "left-0" },
    { key: "grupo", label: "Grupo", indent: "pl-8", connector: "left-4" },
    { key: "classe", label: "Classe", indent: "pl-12", connector: "left-8" },
    {
        key: "subclasse",
        label: "Subclasse",
        indent: "pl-16",
        connector: "left-12",
    },
];

function HierarchyRow({ cnae, descriptions, level, isLast, requestStatus }) {
    const value = cnae[level.key];
    const description = descriptions[level.key];

    if (!value) {
        return null;
    }

    return (
        <div
            className={`relative flex min-h-10 items-center gap-3 ${level.indent}`}
        >
            {level.connector && (
                <span
                    className={`absolute bottom-1/2 h-1/2 w-3 border-b border-l border-slate-300 ${level.connector}`}
                    aria-hidden="true"
                />
            )}
            <span className="w-20 shrink-0 text-xs font-semibold text-slate-500">
                {level.label}:
            </span>
            <span
                className={`text-sm ${isLast ? "font-bold text-slate-950" : "font-semibold text-blue-800"}`}
            >
                {value}
            </span>
            <span className="min-w-0 text-sm text-slate-700">
                {description ||
                    (isLast
                        ? cnae.descricao
                        : requestStatus === "error"
                          ? "Descrição indisponível"
                          : "Carregando descrição…")}
            </span>
        </div>
    );
}

export default function CnaeHierarchy({ cnae }) {
    const tooltipId = useId();
    const displayCode = cnae?.subclasse || cnae?.codigo || cnae?.id;
    const [descriptions, setDescriptions] = useState({
        subclasse: cnae?.descricao,
    });
    const [requestStatus, setRequestStatus] = useState("idle");

    async function loadDescriptions() {
        if (requestStatus === "loading" || requestStatus === "success") {
            return;
        }

        setRequestStatus("loading");

        try {
            setDescriptions(await fetchCnaeHierarchy(cnae));
            setRequestStatus("success");
        } catch {
            setRequestStatus("error");
        }
    }

    if (!displayCode) {
        return (
            <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Código não informado
            </span>
        );
    }

    return (
        <div className="group relative inline-flex">
            <button
                type="button"
                aria-describedby={tooltipId}
                onMouseEnter={loadDescriptions}
                onFocus={loadDescriptions}
                className="rounded-md text-xs font-bold tracking-wide text-blue-800 underline decoration-blue-300 decoration-dotted underline-offset-4 outline-none transition hover:text-blue-950 focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
            >
                {displayCode}
                <span className="sr-only"> — exibir hierarquia do CNAE</span>
            </button>

            <div
                id={tooltipId}
                role="tooltip"
                className="pointer-events-none invisible absolute left-0 top-full z-20 mt-3 w-[min(36rem,calc(100vw-3rem))] translate-y-1 rounded-2xl border border-slate-200 bg-white p-4 text-left opacity-0 shadow-2xl shadow-slate-300/70 transition duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 sm:p-5"
            >
                <span className="mb-3 block text-sm font-bold text-slate-900">
                    Hierarquia do CNAE
                </span>
                <div className="rounded-xl bg-slate-50 px-3 py-1">
                    {HIERARCHY_LEVELS.map((level) => (
                        <HierarchyRow
                            key={level.key}
                            cnae={cnae}
                            descriptions={descriptions}
                            level={level}
                            isLast={level.key === "subclasse"}
                            requestStatus={requestStatus}
                        />
                    ))}
                </div>
                {requestStatus === "error" && (
                    <span className="mt-3 block text-xs font-medium text-amber-700">
                        Não foi possível carregar as descrições completas. Tente
                        passar o mouse novamente.
                    </span>
                )}
                <span className="mt-3 block text-xs text-slate-500">
                    Passe o mouse para consultar ou use Tab para manter aberto.
                </span>
            </div>
        </div>
    );
}
