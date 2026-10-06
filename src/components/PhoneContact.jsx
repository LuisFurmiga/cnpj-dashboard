import { useId } from "react";
import { formatPhone } from "../utils/formatters";
import { buildWhatsAppNumber, buildWhatsAppUrl } from "../utils/contacts";

export default function PhoneContact({ ddd, phone }) {
    const tooltipId = useId();
    const formattedPhone = formatPhone(ddd, phone);
    const whatsappNumber = buildWhatsAppNumber(ddd, phone);
    const whatsappUrl = buildWhatsAppUrl(ddd, phone);

    if (!whatsappUrl) {
        return formattedPhone;
    }

    return (
        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`Tentar abrir conversa no WhatsApp com o número +${whatsappNumber}`}
                className="inline-flex items-center gap-1.5 text-emerald-700 underline decoration-emerald-300 underline-offset-4 transition hover:text-emerald-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
            >
                {formattedPhone}
                <span className="text-xs font-semibold">WhatsApp</span>
            </a>

            <span className="group relative inline-flex">
                <button
                    type="button"
                    aria-label="Informação sobre a disponibilidade deste número no WhatsApp"
                    aria-describedby={tooltipId}
                    className="flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 bg-white text-[11px] font-bold lowercase text-slate-500 outline-none transition hover:border-slate-400 hover:text-slate-700 focus-visible:ring-2 focus-visible:ring-slate-600 focus-visible:ring-offset-2"
                >
                    i
                </button>
                <span
                    id={tooltipId}
                    role="tooltip"
                    className="pointer-events-none invisible absolute bottom-full left-1/2 z-30 mb-2 w-64 -translate-x-1/2 translate-y-1 rounded-xl bg-slate-950 px-3 py-2 text-xs font-normal leading-5 text-white opacity-0 shadow-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100"
                >
                    Talvez este número esteja cadastrado no WhatsApp. A consulta
                    do CNPJ não confirma nem valida essa informação.
                </span>
            </span>
        </span>
    );
}
