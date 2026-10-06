const CNAE_API_BASE_URL = "https://servicodados.ibge.gov.br/api/v2/cnae";
const hierarchyCache = new Map();

function firstItem(payload) {
    return Array.isArray(payload) ? payload[0] : payload;
}

async function requestResource(resource, id) {
    const response = await fetch(
        `${CNAE_API_BASE_URL}/${resource}/${encodeURIComponent(id)}`,
    );

    if (!response.ok) {
        throw new Error(
            "Não foi possível consultar a descrição da hierarquia do CNAE.",
        );
    }

    return firstItem(await response.json());
}

function onlyCnaeCharacters(value = "") {
    return String(value).replace(/\D/g, "");
}

async function requestHierarchy(cnae) {
    const subclassId = onlyCnaeCharacters(cnae.id || cnae.subclasse);
    const subclass = await requestResource("subclasses", subclassId);
    const classData = subclass?.classe;
    const group = classData?.grupo;
    const division = group?.divisao;
    const section = division?.secao;

    if (
        section?.descricao &&
        division?.descricao &&
        group?.descricao &&
        classData?.descricao
    ) {
        return {
            secao: section.descricao,
            divisao: division.descricao,
            grupo: group.descricao,
            classe: classData.descricao,
            subclasse: subclass?.descricao || cnae.descricao,
        };
    }

    const [sectionData, divisionData, groupData, fallbackClassData] =
        await Promise.all([
            requestResource("secoes", cnae.secao),
            requestResource("divisoes", onlyCnaeCharacters(cnae.divisao)),
            requestResource("grupos", onlyCnaeCharacters(cnae.grupo)),
            requestResource("classes", onlyCnaeCharacters(cnae.classe)),
        ]);

    return {
        secao: sectionData?.descricao,
        divisao: divisionData?.descricao,
        grupo: groupData?.descricao,
        classe: fallbackClassData?.descricao,
        subclasse: subclass?.descricao || cnae.descricao,
    };
}

export function fetchCnaeHierarchy(cnae) {
    const cacheKey = onlyCnaeCharacters(cnae.id || cnae.subclasse);

    if (!cacheKey) {
        return Promise.reject(new Error("Código CNAE não informado."));
    }

    if (!hierarchyCache.has(cacheKey)) {
        const request = requestHierarchy(cnae).catch((error) => {
            hierarchyCache.delete(cacheKey);
            throw error;
        });

        hierarchyCache.set(cacheKey, request);
    }

    return hierarchyCache.get(cacheKey);
}
