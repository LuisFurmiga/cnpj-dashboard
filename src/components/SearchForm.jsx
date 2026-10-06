import { useId, useState } from "react";
import { formatCnpj } from "../utils/formatters";

export default function SearchForm({ onSubmit, isLoading }) {
    const [cnpj, setCnpj] = useState("");
    const inputId = useId();

    function handleChange(event) {
        setCnpj(formatCnpj(event.target.value));
    }

    function handleSubmit(event) {
        event.preventDefault();
        onSubmit(cnpj);
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/60 sm:p-6"
        >
            <label
                htmlFor={inputId}
                className="block text-sm font-semibold text-slate-700"
            >
                CNPJ
            </label>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                <input
                    id={inputId}
                    type="text"
                    inputMode="numeric"
                    placeholder="00.000.000/0000-00"
                    value={cnpj}
                    onChange={handleChange}
                    className="min-h-12 flex-1 rounded-2xl border border-slate-200 bg-slate-50 px-4 text-base text-slate-900 outline-none transition focus:border-slate-400 focus:bg-white focus:ring-4 focus:ring-slate-200"
                    aria-describedby={`${inputId}-hint`}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="min-h-12 rounded-2xl bg-slate-950 px-6 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
                >
                    {isLoading ? "Consultando..." : "Consultar"}
                </button>
            </div>
            <p id={`${inputId}-hint`} className="mt-3 text-sm text-slate-500">
                Digite com ou sem pontuação. Enviaremos apenas os 14 números
                para a consulta.
            </p>
        </form>
    );
}
