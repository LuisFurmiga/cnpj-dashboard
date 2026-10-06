import { onlyDigits } from "./formatters.js";

export function buildWhatsAppNumber(ddd, phone, countryCode = "55") {
    const localNumber = onlyDigits(`${ddd ?? ""}${phone ?? ""}`);
    const country = onlyDigits(countryCode);

    if (!country || ![10, 11].includes(localNumber.length)) {
        return "";
    }

    return `${country}${localNumber}`;
}

export function buildWhatsAppUrl(ddd, phone, countryCode = "55") {
    const number = buildWhatsAppNumber(ddd, phone, countryCode);
    return number ? `https://wa.me/${number}` : "";
}

export function normalizeEmail(email = "") {
    return String(email).trim().toLowerCase();
}

export function buildMailtoUrl(email) {
    const normalizedEmail = normalizeEmail(email);
    const isValidEmail = /^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i.test(
        normalizedEmail,
    );

    return isValidEmail ? `mailto:${normalizedEmail}` : "";
}
