import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import Background from './NeuralBackground';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Transforme sua Empresa com Automação de IA';
  const typingSpeedRef = useRef(70); // ms por caractere
  const cursorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    // Ativar animações após o carregamento da página
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  // Efeito de digitação para o título
  useEffect(() => {
    if (!isVisible) return;
    
    let currentIndex = 0;
    const typeNextChar = () => {
      if (currentIndex < fullText.length) {
        setTypedText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
        setTimeout(typeNextChar, typingSpeedRef.current);
      }
    };
    
    // Iniciar a digitação após um pequeno delay
    const typingTimer = setTimeout(() => {
      typeNextChar();
    }, 500);
    
    // Efeito de piscar do cursor
    let cursorVisible = true;
    const cursorInterval = setInterval(() => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = cursorVisible ? '1' : '0';
        cursorVisible = !cursorVisible;
      }
    }, 500);
    
    return () => {
      clearTimeout(typingTimer);
      clearInterval(cursorInterval);
    };
  }, [isVisible, fullText]);

  // Função para criar efeito de revelação de texto
  const RevealText = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => {
    return (
      <div className="overflow-hidden">
        <div 
          className={`transition-all duration-1000 ease-out transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}
          style={{ transitionDelay: `${delay}ms` }}
        >
          {children}
        </div>
      </div>
    );
  };

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center py-20 pb-32 md:pb-48 overflow-hidden">
      {/* Fundo com animação */}
      <Background className="opacity-100" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row items-center">
          <div className="lg:w-3/5 mb-12 lg:mb-0">
            <div 
              className={`inline-block px-3 py-1 bg-gradient-to-r from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 text-primary-600 dark:text-primary-300 rounded-full mb-4 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
              style={{ transitionDelay: '200ms' }}
            >
              <span className="text-sm font-semibold relative">
                <span className="absolute inset-0 bg-gradient-to-r from-primary-500 to-secondary-500 opacity-20 animate-pulse rounded-full"></span>
                Automação Inteligente para Empresas
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 relative">
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                {typedText}
              </span>
              <span 
                ref={cursorRef} 
                className="inline-block w-0.5 h-12 bg-primary-500 ml-1 align-middle"
              ></span>
            </h1>
            
            <RevealText delay={600}>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl">
                Soluções personalizadas de automação com Inteligência Artificial para otimizar processos, 
                reduzir custos e aumentar a produtividade da sua empresa.
              </p>
            </RevealText>
            
            <div 
              className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
              style={{ transitionDelay: '800ms' }}
            >
              <a 
                href="#contato" 
                className="group relative px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 text-white text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 hover:translate-y-[-2px] overflow-hidden"
              >
                <span className="relative z-10">Solicitar Proposta Agora</span>
                <span className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left opacity-20"></span>
              </a>
              
              <a 
                href="#beneficios" 
                className="group relative px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-lg font-medium rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 hover:translate-y-[-2px] overflow-hidden"
              >
                <span className="relative z-10">Como Funciona</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
              </a>
            </div>
            
            {/* Estatísticas animadas */}
            <div className="mt-12 grid grid-cols-3 gap-4">
              {[
                { value: '95%', label: 'Satisfação' },
                { value: '70%', label: 'Economia' },
                { value: '3x', label: 'Produtividade' }
              ].map((stat, index) => (
                <div 
                  key={index}
                  className={`text-center transition-all duration-700 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${1000 + index * 200}ms` }}
                >
                  <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div 
            className={`lg:w-2/5 hidden lg:block transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
            style={{ transitionDelay: '600ms' }}
          >
            <div className="relative w-full h-[400px] flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 opacity-5 rounded-2xl"></div>
              
              {/* Círculos decorativos */}
              <div className="absolute top-10 right-10 w-20 h-20 rounded-full bg-primary-500 opacity-10 animate-float-slow"></div>
              <div className="absolute bottom-10 left-10 w-16 h-16 rounded-full bg-secondary-500 opacity-10 animate-float-medium"></div>
              
              {/* Linhas de conexão */}
              <div className="absolute w-40 h-0.5 bg-gradient-to-r from-primary-500 to-transparent top-1/4 left-1/4 transform -rotate-45 opacity-20"></div>
              <div className="absolute w-40 h-0.5 bg-gradient-to-r from-secondary-500 to-transparent bottom-1/4 right-1/4 transform -rotate-45 opacity-20"></div>
              
              <img 
                src="/images/ai-automation.svg" 
                alt="Automação com IA" 
                className="w-full h-full object-contain p-8 animate-float-slow"
                onError={(e) => {
                  // Fallback se a imagem não existir
                  const target = e.currentTarget;
                  target.src = "data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 24 24' fill='none' stroke='%230ea5e9' stroke-width='0.5' stroke-linecap='round' stroke-linejoin='round'%3e%3ccircle cx='12' cy='12' r='10'%3e%3c/circle%3e%3cpath d='M12 16v-4M12 8h.01'%3e%3c/path%3e%3c/svg%3e";
                  target.classList.add('opacity-30');
                }}
              />
              
              {/* Efeito de brilho */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 opacity-0 hover:opacity-10 transition-opacity duration-500 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 