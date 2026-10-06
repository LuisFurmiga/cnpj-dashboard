# CNPJ Dashboard

Aplicação web para consulta e visualização de dados públicos de empresas brasileiras a partir de um CNPJ.

O projeto utiliza **React**, **Vite** e **Tailwind CSS** para apresentar informações cadastrais de forma organizada, responsiva e de fácil leitura. Os dados da empresa são obtidos pela API pública do **CNPJ.ws**, enquanto a hierarquia das atividades econômicas é complementada pela API de CNAE do **IBGE**.

## Funcionalidades

- Consulta de empresas por CNPJ, com ou sem pontuação.
- Formatação automática do CNPJ durante a digitação.
- Exibição de razão social, nome fantasia, porte, natureza jurídica e capital social.
- Consulta da situação cadastral e da data de início das atividades.
- Exibição do endereço completo e CEP.
- Link direto para abertura do endereço no Google Maps.
- Mapa incorporado opcional utilizando a Google Maps Embed API.
- Exibição da atividade econômica principal e dos CNAEs secundários.
- Consulta sob demanda da hierarquia completa de cada CNAE:
  - Seção;
  - Divisão;
  - Grupo;
  - Classe;
  - Subclasse.
- Exibição de telefones com atalho para tentativa de abertura no WhatsApp.
- Link direto para envio de e-mail quando o endereço retornado é válido.
- Informações sobre Simples Nacional e MEI.
- Exibição do quadro societário da empresa.
- Tratamento de estados de carregamento, CNPJ não encontrado, limite de requisições e falhas da API.
- Interface responsiva para desktop e dispositivos móveis.

## Tecnologias

- [React](https://react.dev/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [CNPJ.ws](https://cnpj.ws/)
- [API de CNAE do IBGE](https://servicodados.ibge.gov.br/api/docs/CNAE?versao=2)
- [Google Maps Embed API](https://developers.google.com/maps/documentation/embed/get-started)
- Docker
- Nginx

## Como funciona

A aplicação é totalmente frontend e não possui um backend próprio.

Ao consultar um CNPJ, o navegador realiza uma requisição para:

```text
https://publica.cnpj.ws/cnpj/{CNPJ}
```

Os CNAEs retornados pela consulta podem ser detalhados utilizando a API do IBGE:

```text
https://servicodados.ibge.gov.br/api/v2/cnae
```

As descrições da hierarquia de CNAE são carregadas somente quando o usuário passa o mouse sobre o código ou acessa o elemento pelo teclado. As consultas realizadas ficam armazenadas em cache durante a sessão da aplicação para evitar requisições repetidas do mesmo CNAE.

## Estrutura do projeto

```text
cnpj-dashboard/
├── src/
│   ├── components/
│   │   ├── AddressCard.jsx
│   │   ├── CnaeHierarchy.jsx
│   │   ├── CnaeList.jsx
│   │   ├── CompanyHeader.jsx
│   │   ├── EmailContact.jsx
│   │   ├── InfoCard.jsx
│   │   ├── LoadingSkeleton.jsx
│   │   ├── MapCard.jsx
│   │   ├── PartnersList.jsx
│   │   ├── PhoneContact.jsx
│   │   └── SearchForm.jsx
│   ├── services/
│   │   ├── cnaeApi.js
│   │   └── cnpjApi.js
│   ├── utils/
│   │   ├── contacts.js
│   │   ├── formatters.js
│   │   ├── maps.js
│   │   └── validators.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .dockerignore
├── .editorconfig
├── .env.example
├── .gitignore
├── .prettierrc
├── Dockerfile
├── docker-compose.yml
├── index.html
├── nginx.conf
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── vite.config.js
```

## Pré-requisitos

Para executar o projeto localmente, recomenda-se:

- Node.js 20 ou superior;
- npm;
- Git.

Para execução em container:

- Docker;
- Docker Compose.

## Instalação

Clone o repositório:

```bash
git clone https://github.com/LuisFurmiga/cnpj-dashboard.git
cd cnpj-dashboard
```

Instale as dependências:

```bash
npm install
```

## Desenvolvimento local

Execute o servidor de desenvolvimento:

```bash
npm run dev
```

O Vite exibirá no terminal o endereço local da aplicação, normalmente:

```text
http://localhost:5173
```

## Build de produção

Para gerar os arquivos otimizados de produção:

```bash
npm run build
```

Os arquivos serão gerados no diretório:

```text
dist/
```

Para visualizar localmente o build de produção:

```bash
npm run preview
```

## Google Maps

O botão **Abrir no Google Maps** funciona sem chave de API.

A chave é necessária apenas para exibir o mapa incorporado dentro do dashboard.

### 1. Habilite a API

No Google Cloud, habilite a **Maps Embed API** e crie uma chave de API.

Por segurança, restrinja a chave:

- aos domínios onde a aplicação será executada;
- à Maps Embed API;
- por HTTP referrer sempre que possível.

### 2. Configure o ambiente local

Copie o arquivo de exemplo:

```bash
cp .env.example .env.local
```

No Windows PowerShell:

```powershell
Copy-Item .env.example .env.local
```

Edite `.env.local`:

```env
VITE_GOOGLE_MAPS_API_KEY=sua-chave-aqui
```

Depois execute normalmente:

```bash
npm run dev
```

> Variáveis iniciadas por `VITE_` são incorporadas ao bundle frontend e podem ser visualizadas pelo navegador. A chave do Google Maps não deve ser tratada como um segredo de servidor. Utilize as restrições disponibilizadas pelo Google Cloud.

## Docker Compose

Crie o arquivo `.env` a partir do exemplo:

```bash
cp .env.example .env
```

No Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

Se desejar utilizar o mapa incorporado, configure:

```env
VITE_GOOGLE_MAPS_API_KEY=sua-chave-aqui
```

Depois construa e inicie a aplicação:

```bash
docker compose up --build -d
```

A aplicação ficará disponível em:

```text
http://localhost:8080
```

Acompanhe os logs com:

```bash
docker compose logs -f frontend
```

Para encerrar:

```bash
docker compose down
```

## Docker sem Compose

Construa a imagem:

```bash
docker build \
    --build-arg VITE_GOOGLE_MAPS_API_KEY="sua-chave" \
    -t cnpj-dashboard .
```

Execute o container:

```bash
docker run --rm -p 8080:8080 cnpj-dashboard
```

Sem o Google Maps incorporado:

```bash
docker build -t cnpj-dashboard .
docker run --rm -p 8080:8080 cnpj-dashboard
```

## Container de produção

O `Dockerfile` utiliza build multi-stage:

1. **Node.js 20 Alpine** compila a aplicação React com o Vite.
2. **nginx-unprivileged** recebe somente os arquivos estáticos gerados.
3. O Nginx disponibiliza a aplicação na porta `8080` sem executar como usuário root.

O container também possui um `HEALTHCHECK` HTTP para verificar se a aplicação está respondendo corretamente.

A configuração do Nginx inclui fallback para `index.html`, permitindo navegação client-side, além de cache para arquivos estáticos e alguns headers básicos de segurança.

## Formatação do código

O projeto utiliza **4 espaços** para indentação, definidos em `.editorconfig` e `.prettierrc`.

Para formatar todo o projeto:

```bash
npx prettier --write .
```

Para verificar a formatação sem modificar arquivos:

```bash
npx prettier --check .
```

## APIs e limitações

### CNPJ.ws

A consulta cadastral utiliza a API pública do CNPJ.ws. Como se trata de um serviço externo, a disponibilidade e os limites de requisição não são controlados por este projeto.

A aplicação possui tratamento específico para:

- `404`: CNPJ não encontrado;
- `429`: limite de requisições atingido;
- outros erros HTTP ou indisponibilidade temporária.

### IBGE

A API do IBGE é utilizada para complementar a descrição da hierarquia dos CNAEs. Caso ela esteja indisponível, a consulta principal do CNPJ continua funcionando e apenas as descrições adicionais da hierarquia podem não ser exibidas.

### WhatsApp

O dashboard apenas gera um link utilizando o número telefônico informado nos dados cadastrais. Isso não confirma que o número esteja efetivamente registrado ou ativo no WhatsApp.

## Variáveis de ambiente

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `VITE_GOOGLE_MAPS_API_KEY` | Não | Chave da Google Maps Embed API utilizada para exibir o mapa incorporado. |

Sem essa variável, o restante da aplicação continua funcionando normalmente e o usuário ainda pode abrir o endereço diretamente no Google Maps.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento do Vite. |
| `npm run build` | Gera o build otimizado para produção. |
| `npm run preview` | Executa uma prévia local do build de produção. |
| `npx prettier --write .` | Formata os arquivos do projeto. |
| `npx prettier --check .` | Verifica se os arquivos seguem a formatação configurada. |

## Observações

Este projeto organiza e apresenta dados disponibilizados por serviços públicos ou de terceiros. Ele não é afiliado à Receita Federal, ao CNPJ.ws, ao IBGE, ao Google ou ao WhatsApp.

Os dados exibidos dependem das informações retornadas pelas respectivas APIs e podem estar indisponíveis, incompletos ou desatualizados.