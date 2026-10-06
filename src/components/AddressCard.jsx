import InfoCard from "./InfoCard";
import MapCard from "./MapCard";
import { fallback, formatCep } from "../utils/formatters";
import { buildAddressQuery } from "../utils/maps";

export default function AddressCard({ establishment }) {
    const city = establishment?.cidade?.nome;
    const state =
        establishment?.estado?.sigla ?? establishment?.cidade?.estado?.sigla;
    const street = [establishment?.tipo_logradouro, establishment?.logradouro]
        .filter(Boolean)
        .join(" ");
    const addressQuery = buildAddressQuery(establishment);

    const items = [
        { label: "Logradouro", value: street || "Não informado" },
        { label: "Número", value: fallback(establishment?.numero) },
        { label: "Complemento", value: fallback(establishment?.complemento) },
        { label: "Bairro", value: fallback(establishment?.bairro) },
        {
            label: "Cidade/UF",
            value: [city, state].filter(Boolean).join(" / ") || "Não informado",
        },
        { label: "CEP", value: formatCep(establishment?.cep) },
    ];

    return (
        <div className="grid gap-5 lg:col-span-2 lg:grid-cols-2">
            <InfoCard
                title="Endereço"
                description="Localização cadastrada na Receita Federal."
                items={items}
            />
            <MapCard address={addressQuery} />
        </div>
    );
}
