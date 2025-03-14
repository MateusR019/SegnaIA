import React, { useEffect, useState } from 'react';
import Background from './NeuralBackground';
import { FiCpu, FiBarChart2, FiLock, FiClock } from 'react-icons/fi';

interface BenefitProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color?: string;
  index: number;
}

const BenefitItem: React.FC<BenefitProps> = ({ icon, title, description, color = 'from-primary-500 to-secondary-500', index }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="card-3d group relative overflow-hidden rounded-xl p-6 bg-white dark:bg-gray-800 shadow-xl transition-all duration-500"
      style={{ 
        transformStyle: 'preserve-3d',
        transform: isHovered ? 'perspective(1000px) rotateY(5deg) rotateX(5deg)' : 'perspective(1000px) rotateY(0) rotateX(0)',
        transition: 'transform 0.5s ease'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Fundo com gradiente animado */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
        style={{ transform: 'translateZ(-10px)' }}
      ></div>
      
      {/* Círculo decorativo */}
      <div 
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 opacity-0 group-hover:opacity-5 transition-all duration-500 transform group-hover:scale-110"
        style={{ filter: 'blur(40px)' }}
      ></div>
      
      {/* Ícone com efeito de flutuação */}
      <div 
        className="relative z-10 mb-6 transform transition-transform duration-500"
        style={{ transform: isHovered ? 'translateZ(20px)' : 'translateZ(0)' }}
      >
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900 dark:to-secondary-900 flex items-center justify-center text-primary-600 dark:text-primary-400 animate-float-slow">
          <div className="text-2xl">{icon}</div>
        </div>
      </div>
      
      {/* Título com efeito 3D */}
      <h3 
        className="text-xl font-bold mb-3 text-gray-900 dark:text-white relative z-10 group-hover:text-gradient-animated transition-all duration-500"
        style={{ transform: isHovered ? 'translateZ(15px)' : 'translateZ(0)' }}
      >
        {title}
      </h3>
      
      {/* Descrição com efeito 3D */}
      <p 
        className="text-gray-700 dark:text-gray-300 relative z-10 transition-all duration-500"
        style={{ transform: isHovered ? 'translateZ(10px)' : 'translateZ(0)' }}
      >
        {description}
      </p>
      
      {/* Elemento decorativo - linha neural */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:w-full transition-all duration-700"></div>
      
      {/* Elemento decorativo - ponto neural */}
      <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-primary-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse-glow"></div>
      
      {/* Número decorativo */}
      <div 
        className="absolute top-4 right-4 text-4xl font-bold text-gray-200 dark:text-gray-800 opacity-20 group-hover:opacity-40 transition-opacity duration-500"
        style={{ transform: 'translateZ(5px)' }}
      >
        {index + 1}
      </div>
    </div>
  );
};

const Benefits = () => {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    // Animação sequencial dos itens
    const showItems = () => {
      benefits.forEach((_, index) => {
        setTimeout(() => {
          setVisibleItems(prev => [...prev, index]);
        }, 150 * index);
      });
    };

    // Iniciar animação após um pequeno delay
    const timer = setTimeout(() => {
      showItems();
    }, 300);

    return () => clearTimeout(timer);
  }, []);
  
  const benefits = [
    {
      icon: <FiCpu />,
      title: 'Automação Personalizada',
      description: 'Soluções desenvolvidas especificamente para os desafios únicos do seu negócio.',
      color: 'from-blue-500 to-cyan-400'
    },
    {
      icon: <FiClock />,
      title: 'Economia de Tempo',
      description: 'Reduza drasticamente o tempo gasto em tarefas repetitivas e processos manuais.',
      color: 'from-green-500 to-emerald-400'
    },
    {
      icon: <FiBarChart2 />,
      title: 'Insights Valiosos',
      description: 'Obtenha dados e análises que ajudam a tomar decisões mais inteligentes para seu negócio.',
      color: 'from-yellow-500 to-amber-400'
    },
    {
      icon: <FiLock />,
      title: 'Segurança Avançada',
      description: 'Proteja seus dados com as mais modernas técnicas de criptografia e segurança.',
      color: 'from-red-500 to-pink-400'
    },
    {
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>,
      title: 'Escalabilidade',
      description: 'Soluções que crescem com seu negócio, adaptando-se a volumes maiores sem perder eficiência.',
      color: 'from-purple-500 to-indigo-400'
    },
    {
      icon: <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>,
      title: 'Suporte Especializado',
      description: 'Conte com nossa equipe de especialistas em IA para implementação e suporte contínuo.',
      color: 'from-primary-500 to-secondary-400'
    }
  ];

  return (
    <section id="beneficios" className="py-20 relative overflow-hidden">
      <Background className="opacity-30" />
      
      {/* Elementos decorativos */}
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-primary-500 opacity-5 animate-float-slow"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-secondary-500 opacity-5 animate-float-medium"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <span className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 text-sm font-medium mb-3 animate-pulse-glow">
            BENEFÍCIOS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-animated">
            Por que escolher nossa solução?
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            Nossa plataforma de automação com IA oferece vantagens competitivas que transformarão a maneira como sua empresa opera.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index} 
              className={`transform transition-all duration-700 ${
                visibleItems.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-20'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
            >
              <BenefitItem
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
                color={benefit.color}
                index={index}
              />
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <a 
            href="#contact" 
            className="btn btn-gradient-animated btn-ripple px-8 py-4 text-white text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Comece Agora
          </a>
        </div>
        
        {/* Estatísticas */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { value: '98%', label: 'Satisfação dos Clientes', icon: '😊' },
            { value: '75%', label: 'Redução de Custos', icon: '💰' },
            { value: '3x', label: 'Aumento de Produtividade', icon: '🚀' }
          ].map((stat, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg text-center transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2 border-t-4 border-gradient-animated"
            >
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold mb-2 text-gradient">
                {stat.value}
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits; 