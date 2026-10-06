const API_BASE_URL = "https://publica.cnpj.ws/cnpj";

export async function fetchCnpj(cnpj) {
    const response = await fetch(`${API_BASE_URL}/${cnpj}`);

    if (response.status === 429) {
        throw new Error(
            "Limite de requisições atingido. Aguarde alguns instantes e tente novamente.",
        );
    }

    if (response.status === 404) {
        throw new Error(
            "CNPJ não encontrado. Confira os números digitados e tente novamente.",
        );
    }

    if (!response.ok) {
        throw new Error(
            "Não foi possível consultar este CNPJ agora. Tente novamente em alguns minutos.",
        );
    }

    return response.json();
}
