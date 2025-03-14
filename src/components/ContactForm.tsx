import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Background from './NeuralBackground';

interface FormData {
  nome: string;
  email: string;
  telefone: string;
  empresa: string;
  segmento: string;
  funcionarios: string;
  desafio: string;
  orcamento: string;
  prazo: string;
}

const ContactForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  
  const { register, handleSubmit, formState: { errors }, trigger } = useForm();
  
  const nextStep = async () => {
    let isValid = false;
    
    if (step === 1) {
      isValid = await trigger(['nome', 'email', 'telefone']);
    } else if (step === 2) {
      isValid = await trigger(['empresa', 'segmento', 'funcionarios']);
    }
    
    if (isValid) {
      setStep(step + 1);
    }
  };
  
  const prevStep = () => {
    setStep(step - 1);
  };
  
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError('');
    
    // Verificar se todos os campos obrigatórios estão preenchidos
    const requiredFields = ['nome', 'email', 'telefone', 'empresa', 'desafio'];
    const missingFields = requiredFields.filter(field => !data[field as keyof FormData]);
    
    if (missingFields.length > 0) {
      setSubmitError('Todos os campos obrigatórios devem ser preenchidos.');
      setIsSubmitting(false);
      return;
    }
    
    try {
      // Enviar dados para a API
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Ocorreu um erro ao processar o formulário');
      }
      
      console.log('Resposta da API:', result);
      setSubmitSuccess(true);
    } catch (error) {
      console.error('Erro ao processar formulário:', error);
      setSubmitError('Ocorreu um erro ao processar o formulário. Por favor, tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setStep(1);
    setSubmitSuccess(false);
    setSubmitError('');
  };
  
  return (
    <section id="contato" className="py-16 px-4 relative">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden relative">
        <Background className="opacity-50" />
        
        <div className="p-8 relative z-10">
          <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
            Entre em Contato
          </h2>
          
          {submitSuccess ? (
            <div className="text-center py-12 relative">
              <Background className="opacity-30" />
              <div className="bg-white dark:bg-gray-800 p-8 rounded-xl relative z-10 shadow-lg animate-fade-in">
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Mensagem Enviada com Sucesso!</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Obrigado pelo seu interesse! Entraremos em contato em breve para discutir como podemos ajudar sua empresa.
                </p>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
                >
                  Enviar Outra Mensagem
                </button>
              </div>
            </div>
          ) : (
            <div className="relative">
              {/* Indicadores de etapa */}
              <div className="flex justify-center mb-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col items-center mx-4">
                    <div 
                      className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                        i < step ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white' : 
                        i === step ? 'bg-gradient-to-r from-primary-400 to-secondary-400 text-white' : 
                        'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {i < step ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        i
                      )}
                    </div>
                    <span className={`mt-2 text-sm ${
                      i <= step ? 'text-primary-600 dark:text-primary-400 font-medium' : 'text-gray-500'
                    }`}>
                      {i === 1 ? 'Informações Pessoais' : i === 2 ? 'Dados da Empresa' : 'Detalhes do Projeto'}
                    </span>
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative">
                {/* Etapa 1: Informações Pessoais */}
                {step === 1 && (
                  <div className="space-y-6 animate-fade-in">
                    <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">Suas Informações</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Nome Completo *
                        </label>
                        <input
                          id="nome"
                          type="text"
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.nome ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300`}
                          placeholder="Seu nome completo"
                          {...register('nome', { required: 'Nome é obrigatório' })}
                        />
                        {errors.nome && (
                          <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.nome.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          E-mail Profissional *
                        </label>
                        <input
                          id="email"
                          type="email"
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.email ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300`}
                          placeholder="seu.email@empresa.com"
                          {...register('email', { 
                            required: 'E-mail é obrigatório',
                            pattern: {
                              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                              message: 'E-mail inválido'
                            }
                          })}
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.email.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Telefone *
                        </label>
                        <input
                          id="telefone"
                          type="tel"
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.telefone ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300`}
                          placeholder="(00) 00000-0000"
                          {...register('telefone', { required: 'Telefone é obrigatório' })}
                        />
                        {errors.telefone && (
                          <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.telefone.message}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Etapa 2: Dados da Empresa */}
                {step === 2 && (
                  <div className="space-y-6 animate-fade-in">
                    <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">Sobre sua Empresa</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Nome da Empresa *
                        </label>
                        <input
                          id="empresa"
                          type="text"
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.empresa ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300`}
                          placeholder="Nome da sua empresa"
                          {...register('empresa', { required: 'Nome da empresa é obrigatório' })}
                        />
                        {errors.empresa && (
                          <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.empresa.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <label htmlFor="segmento" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Segmento de Atuação
                        </label>
                        <select
                          id="segmento"
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.segmento ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300`}
                          {...register('segmento')}
                        >
                          <option value="">Selecione o segmento</option>
                          <option value="Tecnologia">Tecnologia</option>
                          <option value="Saúde">Saúde</option>
                          <option value="Educação">Educação</option>
                          <option value="Finanças">Finanças</option>
                          <option value="Varejo">Varejo</option>
                          <option value="Indústria">Indústria</option>
                          <option value="Serviços">Serviços</option>
                          <option value="Outro">Outro</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="funcionarios" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Número de Funcionários
                        </label>
                        <select
                          id="funcionarios"
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.funcionarios ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300`}
                          {...register('funcionarios')}
                        >
                          <option value="">Selecione o tamanho</option>
                          <option value="1-10">1-10</option>
                          <option value="11-50">11-50</option>
                          <option value="51-200">51-200</option>
                          <option value="201-500">201-500</option>
                          <option value="501-1000">501-1000</option>
                          <option value="1000+">Mais de 1000</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Etapa 3: Detalhes do Projeto */}
                {step === 3 && (
                  <div className="space-y-6 animate-fade-in">
                    <h3 className="text-2xl font-semibold text-center mb-6 text-gray-800 dark:text-white">Detalhes do Projeto</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="desafio" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Descreva seu Desafio/Necessidade *
                        </label>
                        <textarea
                          id="desafio"
                          rows={4}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.desafio ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                          } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300`}
                          placeholder="Descreva o problema que você está tentando resolver com automação de IA"
                          {...register('desafio', { required: 'Descrição do desafio é obrigatória' })}
                        ></textarea>
                        {errors.desafio && (
                          <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.desafio.message}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="orcamento" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Orçamento Estimado
                          </label>
                          <select
                            id="orcamento"
                            className={`w-full px-4 py-3 rounded-lg border ${
                              errors.orcamento ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300`}
                            {...register('orcamento')}
                          >
                            <option value="">Selecione o orçamento</option>
                            <option value="Até R$ 5.000">Até R$ 5.000</option>
                            <option value="R$ 5.000 - R$ 15.000">R$ 5.000 - R$ 15.000</option>
                            <option value="R$ 15.000 - R$ 30.000">R$ 15.000 - R$ 30.000</option>
                            <option value="R$ 30.000 - R$ 50.000">R$ 30.000 - R$ 50.000</option>
                            <option value="R$ 50.000 - R$ 100.000">R$ 50.000 - R$ 100.000</option>
                            <option value="Acima de R$ 100.000">Acima de R$ 100.000</option>
                            <option value="A definir">A definir</option>
                          </select>
                        </div>
                        
                        <div>
                          <label htmlFor="prazo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Prazo Desejado
                          </label>
                          <select
                            id="prazo"
                            className={`w-full px-4 py-3 rounded-lg border ${
                              errors.prazo ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                            } bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-300`}
                            {...register('prazo')}
                          >
                            <option value="">Selecione o prazo</option>
                            <option value="Imediato">Imediato</option>
                            <option value="1-2 meses">1-2 meses</option>
                            <option value="3-6 meses">3-6 meses</option>
                            <option value="6-12 meses">6-12 meses</option>
                            <option value="Mais de 12 meses">Mais de 12 meses</option>
                            <option value="A definir">A definir</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Mensagem de erro */}
                {submitError && (
                  <div className="p-4 bg-red-100 dark:bg-red-900 dark:bg-opacity-30 text-red-700 dark:text-red-300 rounded-lg">
                    {submitError}
                  </div>
                )}
                
                {/* Botões de navegação */}
                <div className="flex justify-between mt-8">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
                    >
                      Voltar
                    </button>
                  )}
                  
                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={nextStep}
                      className="ml-auto px-6 py-3 bg-gradient-to-r from-primary-500 to-secondary-500 text-white rounded-lg shadow-md hover:shadow-lg transition duration-300"
                    >
                      Próximo
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="ml-auto px-8 py-4 bg-gradient-to-r from-primary-600 to-secondary-600 text-white text-lg font-bold rounded-lg shadow-md hover:shadow-lg transition duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Enviando...
                        </span>
                      ) : (
                        'Enviar Solicitação'
                      )}
                    </button>
                  )}
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactForm; 