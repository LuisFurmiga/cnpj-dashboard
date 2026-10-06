import { onlyDigits } from "./formatters";

export function sanitizeCnpj(value = "") {
    return onlyDigits(value).slice(0, 14);
}

export function isValidCnpjLength(value = "") {
    return onlyDigits(value).length === 14;
}
