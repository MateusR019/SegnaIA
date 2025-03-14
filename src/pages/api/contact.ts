import type { NextApiRequest, NextApiResponse } from 'next';

type FormData = {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  problemDescription: string;
  budget: string;
  deadline: string;
  howDidYouFindUs: string;
};

type ResponseData = {
  success: boolean;
  message: string;
};

// URL da sua planilha do Google Sheets configurada como aplicativo web
// Você precisará criar um script do Google Apps Script e publicá-lo como aplicativo web
const SHEET_URL = process.env.SHEET_URL || '';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Apenas permitir método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método não permitido' });
  }

  try {
    const formData: FormData = req.body;

    // Validação básica
    if (!formData.companyName || !formData.contactName || !formData.email || !formData.phone || !formData.problemDescription) {
      return res.status(400).json({ success: false, message: 'Todos os campos obrigatórios devem ser preenchidos' });
    }

    // Preparar dados para envio
    const dataToSend = {
      companyName: formData.companyName,
      contactName: formData.contactName,
      email: formData.email,
      phone: formData.phone,
      problemDescription: formData.problemDescription,
      budget: formData.budget || 'Não informado',
      deadline: formData.deadline || 'Não informado',
      howDidYouFindUs: formData.howDidYouFindUs || 'Não informado',
      date: new Date().toISOString(),
    };

    // Se não tiver URL da planilha configurada, simular sucesso (para desenvolvimento)
    if (!SHEET_URL) {
      console.log('Dados que seriam enviados para a planilha:', dataToSend);
      return res.status(200).json({ success: true, message: 'Dados recebidos com sucesso (modo de desenvolvimento)' });
    }

    // Enviar dados para a planilha do Google
    const response = await fetch(SHEET_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    });

    if (!response.ok) {
      throw new Error('Falha ao enviar dados para a planilha');
    }

    return res.status(200).json({ success: true, message: 'Formulário enviado com sucesso!' });
  } catch (error) {
    console.error('Erro ao processar formulário:', error);
    return res.status(500).json({ success: false, message: 'Erro ao processar o formulário. Por favor, tente novamente.' });
  }
} 