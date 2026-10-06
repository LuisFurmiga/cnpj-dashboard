import { buildMailtoUrl, normalizeEmail } from "../utils/contacts";

export default function EmailContact({ email }) {
    const normalizedEmail = normalizeEmail(email);
    const mailtoUrl = buildMailtoUrl(email);

    if (!mailtoUrl) {
        return normalizedEmail || "Não informado";
    }

    return (
        <a
            href={mailtoUrl}
            className="text-blue-800 underline decoration-blue-300 underline-offset-4 transition hover:text-blue-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
            {normalizedEmail}
            <span className="sr-only"> — enviar e-mail</span>
        </a>
    );
}
