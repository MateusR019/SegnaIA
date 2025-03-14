import type { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  success: boolean;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  // Apenas permitir método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Método não permitido' });
  }

  try {
    // Simulando um processamento de dados
    const formData = req.body;
    
    // Validação básica
    if (!formData) {
      return res.status(400).json({ success: false, message: 'Dados do formulário não fornecidos' });
    }
    
    // Simulando um atraso de processamento
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulando uma resposta bem-sucedida
    console.log('Dados do formulário recebidos:', formData);
    
    return res.status(200).json({ 
      success: true, 
      message: 'Formulário enviado com sucesso!' 
    });
  } catch (error) {
    console.error('Erro ao processar formulário:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Erro ao processar o formulário. Por favor, tente novamente.' 
    });
  }
} 