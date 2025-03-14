import React, { useState, useEffect } from 'react';
import { FiSend, FiMail, FiPhone, FiMapPin, FiCheck, FiLoader } from 'react-icons/fi';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    budget: '',
    projectType: '',
    deadline: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formCompletion, setFormCompletion] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;
  
  // Calcular a porcentagem de preenchimento do formulário
  useEffect(() => {
    const requiredFields = ['name', 'email', 'message'];
    const filledFields = requiredFields.filter(field => formData[field as keyof typeof formData]?.trim().length > 0);
    setFormCompletion((filledFields.length / requiredFields.length) * 100);
  }, [formData]);
  
  const validate = () => {
    let tempErrors = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };
    let isValid = true;
    
    if (!formData.name) {
      tempErrors.name = 'Nome é obrigatório';
      isValid = false;
    }
    
    if (!formData.email) {
      tempErrors.email = 'Email é obrigatório';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = 'Email inválido';
      isValid = false;
    }
    
    if (formData.phone && !/^(\+\d{1,3})?\s?\(?\d{2,3}\)?[\s.-]?\d{4,5}[\s.-]?\d{4}$/.test(formData.phone)) {
      tempErrors.phone = 'Telefone inválido';
      isValid = false;
    }
    
    if (!formData.message) {
      tempErrors.message = 'Mensagem é obrigatória';
      isValid = false;
    }
    
    setErrors(tempErrors);
    return isValid;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpar erro quando o usuário começa a digitar
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  const handleFocus = (field: string) => {
    setFocusedField(field);
  };
  
  const handleBlur = () => {
    setFocusedField(null);
  };
  
  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      setIsSubmitting(true);
      
      // Simulando envio para API
      setTimeout(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);
      }, 1500);
    }
  };
  
  // Opções para os selects
  const projectTypes = [
    { value: '', label: 'Selecione o tipo de projeto' },
    { value: 'automacao', label: 'Automação de Processos' },
    { value: 'ia', label: 'Inteligência Artificial' },
    { value: 'analise', label: 'Análise de Dados' },
    { value: 'consultoria', label: 'Consultoria' },
    { value: 'outro', label: 'Outro' }
  ];
  
  const budgetRanges = [
    { value: '', label: 'Selecione o orçamento aproximado' },
    { value: 'ate5k', label: 'Até R$ 5.000' },
    { value: '5k-15k', label: 'R$ 5.000 - R$ 15.000' },
    { value: '15k-30k', label: 'R$ 15.000 - R$ 30.000' },
    { value: '30k-50k', label: 'R$ 30.000 - R$ 50.000' },
    { value: 'acima50k', label: 'Acima de R$ 50.000' },
    { value: 'naosei', label: 'Não sei ainda' }
  ];
  
  // Componente de campo de formulário reutilizável
  const FormField = ({ 
    id, 
    label, 
    type = 'text', 
    required = false,
    options = [],
    ...props 
  }: { 
    id: string; 
    label: string; 
    type?: string;
    required?: boolean;
    options?: {value: string, label: string}[];
    [key: string]: any;
  }) => {
    const isSelect = type === 'select';
    const isTextarea = type === 'textarea';
    
    return (
      <div className="relative">
        <label 
          htmlFor={id} 
          className={`absolute left-4 transition-all duration-300 ${
            focusedField === id || formData[id as keyof typeof formData] 
              ? '-top-2.5 text-xs bg-white dark:bg-gray-800 px-1 text-primary-600 dark:text-primary-400' 
              : 'top-4 text-gray-500'
          }`}
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
        
        {isSelect ? (
          <select
            id={id}
            name={id}
            value={formData[id as keyof typeof formData] as string}
            onChange={handleChange}
            onFocus={() => handleFocus(id)}
            onBlur={handleBlur}
            className={`form-input-animated w-full px-4 py-4 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
              errors[id as keyof typeof errors] ? 'border-red-500' : focusedField === id ? 'border-primary-500 shadow-md' : ''
            }`}
            {...props}
          >
            {options.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        ) : isTextarea ? (
          <textarea
            id={id}
            name={id}
            value={formData[id as keyof typeof formData] as string}
            onChange={handleChange}
            onFocus={() => handleFocus(id)}
            onBlur={handleBlur}
            className={`form-input-animated w-full px-4 py-4 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white resize-none ${
              errors[id as keyof typeof errors] ? 'border-red-500' : focusedField === id ? 'border-primary-500 shadow-md' : ''
            }`}
            {...props}
          />
        ) : (
          <input
            type={type}
            id={id}
            name={id}
            value={formData[id as keyof typeof formData] as string}
            onChange={handleChange}
            onFocus={() => handleFocus(id)}
            onBlur={handleBlur}
            className={`form-input-animated w-full px-4 py-4 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white ${
              errors[id as keyof typeof errors] ? 'border-red-500' : focusedField === id ? 'border-primary-500 shadow-md' : ''
            }`}
            placeholder=""
            {...props}
          />
        )}
        
        {errors[id as keyof typeof errors] && (
          <p className="mt-1 text-sm text-red-600 flex items-center animate-fade-in">
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {errors[id as keyof typeof errors]}
          </p>
        )}
      </div>
    );
  };
  
  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 opacity-5"></div>
      
      {/* Elementos decorativos */}
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-primary-500 opacity-5 animate-float-slow"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-secondary-500 opacity-5 animate-float-medium"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 opacity-5 blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <span className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 text-sm font-medium mb-3 animate-pulse-glow">
            CONTATO
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-animated">
            Vamos conversar sobre seu projeto
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            Estamos prontos para ajudar sua empresa a alcançar novos patamares com nossas soluções de automação inteligente.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          {!isSubmitted ? (
            <div className="glass dark:glass-dark rounded-2xl shadow-xl p-8 animate-scale-in backdrop-blur-lg" style={{ animationDelay: '0.2s' }}>
              {/* Indicador de progresso */}
              <div className="mb-8 relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${formCompletion}%` }}
                ></div>
              </div>
              
              {/* Indicador de etapas */}
              <div className="flex justify-between mb-8">
                {Array.from({ length: totalSteps }).map((_, index) => (
                  <div key={index} className="flex items-center">
                    <div 
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                        currentStep > index + 1 
                          ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white' 
                          : currentStep === index + 1 
                            ? 'bg-white dark:bg-gray-800 border-2 border-primary-500 text-primary-600 dark:text-primary-400' 
                            : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                      }`}
                    >
                      {currentStep > index + 1 ? (
                        <FiCheck className="w-4 h-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    {index < totalSteps - 1 && (
                      <div 
                        className={`h-0.5 w-16 md:w-32 transition-all duration-300 ${
                          currentStep > index + 1 
                            ? 'bg-gradient-to-r from-primary-500 to-secondary-500' 
                            : 'bg-gray-200 dark:bg-gray-700'
                        }`}
                      ></div>
                    )}
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleSubmit}>
                {currentStep === 1 && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <FormField 
                        id="name" 
                        label="Nome completo" 
                        required 
                      />
                      
                      <FormField 
                        id="email" 
                        label="Email" 
                        type="email" 
                        required 
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <FormField 
                        id="phone" 
                        label="Telefone" 
                        type="tel" 
                      />
                      
                      <FormField 
                        id="company" 
                        label="Empresa (opcional)" 
                      />
                    </div>
                    
                    <div className="flex justify-end mt-8">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="btn-gradient-animated btn-ripple px-8 py-3 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
                      >
                        Próximo
                      </button>
                    </div>
                  </>
                )}
                
                {currentStep === 2 && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <FormField 
                        id="projectType" 
                        label="Tipo de projeto" 
                        type="select" 
                        options={projectTypes} 
                      />
                      
                      <FormField 
                        id="budget" 
                        label="Orçamento" 
                        type="select" 
                        options={budgetRanges} 
                      />
                    </div>
                    
                    <div className="mb-6">
                      <FormField 
                        id="deadline" 
                        label="Prazo desejado" 
                        type="date" 
                      />
                    </div>
                    
                    <div className="mb-6">
                      <FormField 
                        id="message" 
                        label="Detalhes do projeto" 
                        type="textarea" 
                        required 
                        rows={5} 
                      />
                    </div>
                    
                    <div className="flex justify-between mt-8">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-all duration-300"
                      >
                        Voltar
                      </button>
                      
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-gradient-animated btn-ripple px-10 py-3 text-lg font-semibold text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                      >
                        <span className={`flex items-center justify-center transition-all duration-300 ${isSubmitting ? 'opacity-0' : 'opacity-100'}`}>
                          <FiSend className="mr-2" />
                          Enviar Mensagem
                        </span>
                        {isSubmitting && (
                          <span className="absolute inset-0 flex items-center justify-center">
                            <FiLoader className="w-6 h-6 text-white animate-spin" />
                          </span>
                        )}
                      </button>
                    </div>
                  </>
                )}
              </form>
            </div>
          ) : (
            <div className="glass dark:glass-dark rounded-2xl shadow-xl p-8 text-center animate-scale-in backdrop-blur-lg">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-float-medium shadow-lg">
                <FiCheck className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 text-gradient">Mensagem Enviada!</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Obrigado por entrar em contato. Nossa equipe responderá em breve.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="btn-outline btn-ripple px-6 py-3 rounded-lg transition-all duration-300 hover:shadow-md"
              >
                Enviar Nova Mensagem
              </button>
            </div>
          )}
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          {[
            {
              icon: <FiMail />,
              title: 'Email',
              content: 'contato@segna.com.br',
              animation: 'animate-float-slow',
              color: 'from-blue-400 to-blue-600'
            },
            {
              icon: <FiPhone />,
              title: 'Telefone',
              content: '(11) 3456-7890',
              animation: 'animate-float-medium',
              color: 'from-green-400 to-green-600'
            },
            {
              icon: <FiMapPin />,
              title: 'Endereço',
              content: 'Av. Paulista, 1000 - São Paulo, SP',
              animation: 'animate-float-fast',
              color: 'from-purple-400 to-purple-600'
            }
          ].map((item, index) => (
            <div 
              key={index}
              className="glass dark:glass-dark rounded-xl p-6 text-center transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2 backdrop-blur-lg"
            >
              <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center mx-auto mb-4 text-white ${item.animation} shadow-lg`}>
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{item.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{item.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact; 