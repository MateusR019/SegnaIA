# Configuração do Google Sheets para Receber Dados do Formulário

Este guia explica como configurar uma planilha do Google Sheets para receber os dados do formulário de contato da sua landing page.

## Passo 1: Criar uma Nova Planilha no Google Sheets

1. Acesse [Google Sheets](https://sheets.google.com) e crie uma nova planilha.
2. Renomeie a planilha para "Contatos Segna AI" ou outro nome de sua preferência.
3. Na primeira linha, adicione os seguintes cabeçalhos:
   - A1: Data
   - B1: Empresa
   - C1: Nome do Contato
   - D1: Email
   - E1: Telefone
   - F1: Descrição do Problema
   - G1: Orçamento
   - H1: Prazo
   - I1: Como nos Encontrou

## Passo 2: Criar um Script do Google Apps Script

1. Na planilha, clique em "Extensões" > "Apps Script".
2. Isso abrirá o editor do Google Apps Script em uma nova aba.
3. Substitua o código padrão pelo seguinte:

```javascript
function doPost(e) {
  try {
    // Obter os dados enviados
    const data = JSON.parse(e.postData.contents);
    
    // Obter a planilha ativa
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // Formatar a data para o formato local
    const date = new Date(data.date);
    const formattedDate = Utilities.formatDate(date, Session.getScriptTimeZone(), "dd/MM/yyyy HH:mm:ss");
    
    // Adicionar os dados em uma nova linha
    sheet.appendRow([
      formattedDate,
      data.companyName,
      data.contactName,
      data.email,
      data.phone,
      data.problemDescription,
      data.budget,
      data.deadline,
      data.howDidYouFindUs
    ]);
    
    // Retornar sucesso
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "Dados adicionados com sucesso à planilha."
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Retornar erro
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: "Erro ao processar os dados: " + error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

4. Clique em "Salvar" e dê um nome ao projeto, como "FormularioSegnaAI".

## Passo 3: Implantar o Script como Aplicativo Web

1. No editor do Apps Script, clique em "Implantar" > "Nova implantação".
2. Em "Tipo de implantação", selecione "Aplicativo da Web".
3. Configure as seguintes opções:
   - Descrição: "API para Formulário Segna AI"
   - Executar como: "Eu" (seu email)
   - Quem tem acesso: "Qualquer pessoa, mesmo anônima"
4. Clique em "Implantar".
5. Copie a URL do aplicativo web que será exibida.

## Passo 4: Configurar a URL no Arquivo .env.local

1. Abra o arquivo `.env.local` na raiz do seu projeto.
2. Cole a URL copiada no valor da variável `SHEET_URL`:

```
SHEET_URL=https://script.google.com/macros/s/seu-id-de-implantacao/exec
```

3. Salve o arquivo.

## Passo 5: Testar a Integração

1. Execute o projeto localmente com `npm run dev`.
2. Preencha o formulário de contato e envie.
3. Verifique se os dados foram adicionados à sua planilha do Google Sheets.

## Observações Importantes

- O Google Apps Script tem limites de execução. Para um site com alto volume de envios, considere uma solução mais robusta.
- Certifique-se de que a planilha não seja excluída ou renomeada após a configuração.
- Periodicamente, verifique se a implantação do script ainda está ativa.
- Para maior segurança, considere adicionar alguma forma de autenticação ao seu endpoint.

## Solução de Problemas

- Se os dados não estiverem sendo recebidos, verifique os logs do Apps Script em "Visualizar" > "Logs de execução".
- Certifique-se de que a URL no arquivo `.env.local` está correta.
- Verifique se o script tem permissão para acessar e modificar a planilha. 