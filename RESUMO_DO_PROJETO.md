# Resumo do Projeto - Segna AI Landing Page

## Visão Geral

Este projeto é uma landing page moderna e responsiva para a agência Segna AI, especializada em automação com inteligência artificial. A landing page foi desenvolvida utilizando Next.js com TypeScript e Tailwind CSS, oferecendo uma experiência de usuário fluida e profissional.

## Estrutura do Projeto

```
segna-ai-landing-page/
├── src/
│   ├── components/         # Componentes React reutilizáveis
│   │   ├── Header.tsx      # Cabeçalho com navegação e modo escuro
│   │   ├── Hero.tsx        # Seção principal da página
│   │   ├── Benefits.tsx    # Seção de benefícios da automação com IA
│   │   ├── Testimonials.tsx # Carrossel de depoimentos de clientes
│   │   ├── ContactForm.tsx # Formulário de contato em etapas
│   │   └── Footer.tsx      # Rodapé com links e informações
│   ├── pages/              # Páginas da aplicação Next.js
│   │   ├── _app.tsx        # Configuração global da aplicação
│   │   ├── _document.tsx   # Configuração do documento HTML
│   │   ├── index.tsx       # Página principal que reúne os componentes
│   │   └── api/            # Endpoints da API
│   │       └── contact.ts  # API para processar envio do formulário
│   ├── styles/             # Estilos globais
│   │   └── globals.css     # Estilos Tailwind e personalizados
│   └── types/              # Definições de tipos TypeScript
│       └── index.d.ts      # Declarações de tipos globais
├── public/                 # Arquivos estáticos
├── tailwind.config.js      # Configuração do Tailwind CSS
├── next.config.js          # Configuração do Next.js
├── tsconfig.json           # Configuração do TypeScript
├── package.json            # Dependências e scripts
├── .env.local              # Variáveis de ambiente (URL do Google Sheets)
├── GOOGLE_SHEETS_SETUP.md  # Instruções para configurar o Google Sheets
└── README.md               # Documentação do projeto
```

## Características Implementadas

1. **Design Responsivo**: Adaptação perfeita para dispositivos móveis, tablets e desktops.
2. **Modo Escuro/Claro**: Alternância entre temas com detecção automática de preferência do sistema.
3. **Formulário de Contato Inteligente**: Formulário em etapas para capturar informações detalhadas dos clientes.
4. **Integração com Google Sheets**: API para enviar dados do formulário diretamente para uma planilha Google.
5. **Animações Suaves**: Transições e animações para melhorar a experiência do usuário.
6. **SEO Otimizado**: Meta tags e estrutura semântica para melhor indexação.
7. **Carrossel de Depoimentos**: Exibição dinâmica de casos de sucesso.
8. **Menu Responsivo**: Navegação adaptada para dispositivos móveis.

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização do lado do servidor.
- **TypeScript**: Tipagem estática para código mais seguro.
- **Tailwind CSS**: Framework CSS utilitário para estilização rápida.
- **React Hook Form**: Gerenciamento de formulários com validação.
- **Google Sheets API**: Armazenamento de dados do formulário.

## Como Executar o Projeto

1. **Instalar Dependências**:
   ```bash
   npm install
   ```

2. **Configurar o Google Sheets**:
   Siga as instruções no arquivo `GOOGLE_SHEETS_SETUP.md` para configurar a integração com o Google Sheets.

3. **Configurar Variáveis de Ambiente**:
   Edite o arquivo `.env.local` e adicione a URL do seu script do Google Apps:
   ```
   SHEET_URL=sua-url-do-google-apps-script
   ```

4. **Executar em Desenvolvimento**:
   ```bash
   npm run dev
   ```

5. **Acessar a Aplicação**:
   Abra [http://localhost:3000](http://localhost:3000) no seu navegador.

## Personalização

Para personalizar a landing page para sua própria agência:

1. **Cores e Tema**: Edite as variáveis de cores em `src/styles/globals.css` e `tailwind.config.js`.
2. **Conteúdo**: Atualize textos e imagens nos componentes em `src/components/`.
3. **Logotipo**: Substitua o logotipo no componente `Header.tsx`.
4. **Depoimentos**: Atualize os depoimentos no componente `Testimonials.tsx`.
5. **Formulário**: Personalize os campos do formulário em `ContactForm.tsx` e a API em `contact.ts`.

## Próximos Passos

1. **Adicionar Análise**: Integrar Google Analytics ou outra ferramenta de análise.
2. **Melhorar Acessibilidade**: Garantir conformidade com WCAG.
3. **Adicionar Animações Avançadas**: Implementar mais animações com Framer Motion.
4. **Internacionalização**: Adicionar suporte para múltiplos idiomas.
5. **Testes Automatizados**: Implementar testes unitários e de integração.

## Conclusão

Esta landing page oferece uma base sólida para apresentar serviços de automação com IA, com foco em capturar leads qualificados através do formulário detalhado. O design moderno e responsivo garante uma boa experiência em qualquer dispositivo, enquanto a integração com Google Sheets facilita o gerenciamento dos contatos recebidos. 