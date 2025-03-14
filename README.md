# Segna AI - Landing Page

Landing page moderna para a Segna AI, desenvolvida com Next.js e Tailwind CSS.

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização do lado do servidor
- **Tailwind CSS**: Framework CSS utilitário
- **React Hook Form**: Biblioteca para gerenciamento de formulários
- **React Icons**: Biblioteca de ícones
- **TypeScript**: Superset JavaScript com tipagem estática

## Requisitos

- Node.js 18.x ou superior
- npm 9.x ou superior

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/segna-ai-landing.git
cd segna-ai-landing
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

4. Acesse o site em [http://localhost:3000](http://localhost:3000)

## Estrutura do Projeto

- `/src/components`: Componentes React reutilizáveis
- `/src/pages`: Páginas da aplicação
- `/src/pages/api`: Endpoints da API
- `/src/styles`: Estilos globais e configuração do Tailwind CSS
- `/public`: Arquivos estáticos

## Deploy

### Deploy na Vercel (Recomendado)

1. Instale a CLI da Vercel (já incluída nas dependências de desenvolvimento):
```bash
npm install --save-dev vercel
```

2. Faça login na sua conta Vercel:
```bash
npx vercel login
```

3. Deploy de produção:
```bash
npm run deploy
```

4. Deploy de preview:
```bash
npm run deploy:preview
```

### Deploy Manual

1. Construa a aplicação:
```bash
npm run build
```

2. Inicie o servidor de produção:
```bash
npm start
```

## Personalização

- Cores primárias e secundárias: Edite as variáveis CSS em `/src/styles/globals.css`
- Fontes: Atualize a configuração em `tailwind.config.js`
- Conteúdo: Modifique os componentes em `/src/components`

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para mais detalhes. 