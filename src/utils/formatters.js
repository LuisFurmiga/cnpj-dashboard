export function onlyDigits(value = "") {
    return String(value).replace(/\D/g, "");
}

export function formatCnpj(value = "") {
    const digits = onlyDigits(value).slice(0, 14);

    return digits
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
}

export function formatCep(value = "") {
    const digits = onlyDigits(value).slice(0, 8);

    if (digits.length !== 8) {
        return digits || "Não informado";
    }

    return digits.replace(/^(\d{5})(\d{3})$/, "$1-$2");
}

export function formatPhone(ddd, phone) {
    const digits = onlyDigits(`${ddd ?? ""}${phone ?? ""}`);

    if (!digits) {
        return "Não informado";
    }

    if (digits.length === 10) {
        return digits.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
    }

    if (digits.length === 11) {
        return digits.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
    }

    return digits;
}

export function formatCurrency(value) {
    const amount = Number(value);

    if (!Number.isFinite(amount)) {
        return "Não informado";
    }

    return new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
    }).format(amount);
}

export function formatDate(value) {
    if (!value) {
        return "Não informado";
    }

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) {
        return "Não informado";
    }

    return new Intl.DateTimeFormat("pt-BR", { timeZone: "UTC" }).format(date);
}

export function formatBoolean(value) {
    if (value === true || value === "Sim" || value === "S") {
        return "Sim";
    }

    if (value === false || value === "Não" || value === "N") {
        return "Não";
    }

    return "Não informado";
}

export function fallback(value, fallbackText = "Não informado") {
    return value || fallbackText;
}
