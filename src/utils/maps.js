import { formatCep } from "./formatters.js";

export function buildAddressQuery(establishment = {}) {
    const city = establishment.cidade?.nome;
    const state =
        establishment.estado?.sigla ?? establishment.cidade?.estado?.sigla;
    const street = [establishment.tipo_logradouro, establishment.logradouro]
        .filter(Boolean)
        .join(" ");
    const streetAndNumber = [street, establishment.numero]
        .filter(Boolean)
        .join(", ");
    const cep = establishment.cep
        ? `CEP ${formatCep(establishment.cep)}`
        : null;

    if (!street && !city && !cep) {
        return "";
    }

    return [streetAndNumber, establishment.bairro, city, state, cep, "Brasil"]
        .filter(Boolean)
        .join(", ");
}

export function buildGoogleMapsUrl(address) {
    if (!address) {
        return "";
    }

    const params = new URLSearchParams({ api: "1", query: address });
    return `https://www.google.com/maps/search/?${params.toString()}`;
}

export function buildGoogleMapsEmbedUrl(address, apiKey) {
    if (!address || !apiKey) {
        return "";
    }

    const params = new URLSearchParams({
        key: apiKey,
        q: address,
        language: "pt-BR",
        region: "BR",
    });

    return `https://www.google.com/maps/embed/v1/place?${params.toString()}`;
}
