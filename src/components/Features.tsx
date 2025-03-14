import React, { useState, useRef, useEffect } from 'react';
import { FiArrowRight, FiCode, FiDatabase, FiCpu, FiTrendingUp, FiShield, FiUsers } from 'react-icons/fi';

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  color: string;
}

const FeatureCard: React.FC<FeatureProps> = ({ icon, title, description, index, color }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setMousePosition({ x, y });
  };
  
  const calculateTransform = () => {
    if (!cardRef.current || !isHovered) return {};
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (mousePosition.y - centerY) / 20;
    const rotateY = (centerX - mousePosition.x) / 20;
    
    return {
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
      boxShadow: `0 20px 30px -10px rgba(0, 0, 0, 0.15), 
                  ${rotateY / 2}px ${rotateX / 2}px 20px rgba(0, 0, 0, 0.1)`
    };
  };
  
  return (
    <div
      ref={cardRef}
      className={`glass dark:glass-dark rounded-xl p-6 transition-all duration-300 overflow-hidden relative ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{
        ...calculateTransform(),
        transitionDelay: `${index * 0.1}s`,
        zIndex: isHovered ? 10 : 1
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Efeito de gradiente no fundo */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 transition-opacity duration-300 ${
          isHovered ? 'opacity-5' : ''
        }`}
      ></div>
      
      {/* Decoração de cantos */}
      <div className={`absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 ${color.includes('primary') ? 'border-primary-500' : 'border-secondary-500'} opacity-0 transition-all duration-500 ${isHovered ? 'opacity-100 w-16 h-16' : ''}`}></div>
      <div className={`absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 ${color.includes('primary') ? 'border-primary-500' : 'border-secondary-500'} opacity-0 transition-all duration-500 ${isHovered ? 'opacity-100 w-16 h-16' : ''}`}></div>
      
      <div className="relative z-10">
        <div 
          className={`w-14 h-14 rounded-lg flex items-center justify-center mb-6 text-white transition-all duration-300 ${
            isHovered ? 'scale-110 shadow-lg' : ''
          }`}
          style={{ 
            background: `linear-gradient(135deg, ${color.split(' ')[1].replace('from-', '')} 0%, ${color.split(' ')[2].replace('to-', '')} 100%)` 
          }}
        >
          <div className="text-2xl">{icon}</div>
        </div>
        
        <h3 className={`text-xl font-bold mb-3 transition-all duration-300 ${
          isHovered ? 'text-gradient' : 'text-gray-900 dark:text-white'
        }`}>
          {title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3 transition-all duration-300">
          {description}
        </p>
        
        <div className={`flex items-center text-sm font-medium transition-all duration-300 ${
          isHovered ? 'translate-x-2' : ''
        }`}>
          <span className={`${isHovered ? 'text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'}`}>
            Saiba mais
          </span>
          <FiArrowRight className={`ml-2 transition-all duration-300 ${
            isHovered ? 'translate-x-1 text-primary-600 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300'
          }`} />
        </div>
      </div>
    </div>
  );
};

const Features: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  const features = [
    {
      icon: <FiCode />,
      title: 'Automação de Processos',
      description: 'Automatize tarefas repetitivas e fluxos de trabalho complexos, liberando sua equipe para focar em atividades estratégicas.',
      color: 'from-blue-500 to-blue-700'
    },
    {
      icon: <FiDatabase />,
      title: 'Análise de Dados',
      description: 'Transforme dados brutos em insights acionáveis com nossa plataforma de análise avançada e visualização intuitiva.',
      color: 'from-purple-500 to-purple-700'
    },
    {
      icon: <FiCpu />,
      title: 'IA Personalizada',
      description: 'Soluções de inteligência artificial adaptadas às necessidades específicas do seu negócio, com aprendizado contínuo.',
      color: 'from-primary-500 to-primary-700'
    },
    {
      icon: <FiTrendingUp />,
      title: 'Otimização de Desempenho',
      description: 'Identifique gargalos e oportunidades de melhoria em seus processos com análises preditivas e prescritivas.',
      color: 'from-green-500 to-green-700'
    },
    {
      icon: <FiShield />,
      title: 'Segurança Integrada',
      description: 'Proteção de dados e conformidade regulatória incorporadas em todas as nossas soluções, garantindo tranquilidade.',
      color: 'from-red-500 to-red-700'
    },
    {
      icon: <FiUsers />,
      title: 'Colaboração Aprimorada',
      description: 'Ferramentas que facilitam o trabalho em equipe, compartilhamento de conhecimento e tomada de decisão colaborativa.',
      color: 'from-secondary-500 to-secondary-700'
    }
  ];
  
  const tabs = [
    { name: 'Todos', filter: () => true },
    { name: 'Automação', filter: (f: any) => f.title.includes('Automação') || f.title.includes('Otimização') },
    { name: 'Dados & IA', filter: (f: any) => f.title.includes('Dados') || f.title.includes('IA') },
    { name: 'Colaboração', filter: (f: any) => f.title.includes('Colaboração') || f.title.includes('Segurança') }
  ];
  
  const filteredFeatures = features.filter(tabs[activeTab].filter);
  
  return (
    <section id="features" className="py-20 relative overflow-hidden" ref={sectionRef}>
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 opacity-5"></div>
      
      {/* Elementos decorativos */}
      <div className="absolute top-40 left-10 w-60 h-60 rounded-full bg-primary-500 opacity-5 animate-float-slow"></div>
      <div className="absolute bottom-40 right-10 w-80 h-80 rounded-full bg-secondary-500 opacity-5 animate-float-medium"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <span className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 text-sm font-medium mb-3 animate-pulse-glow">
            RECURSOS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-animated">
            Soluções Inteligentes para Seu Negócio
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            Nossa plataforma oferece um conjunto abrangente de ferramentas para impulsionar a eficiência, 
            produtividade e inovação em sua empresa.
          </p>
        </div>
        
        {/* Tabs de filtro */}
        <div className={`flex flex-wrap justify-center mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '0.2s' }}>
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setActiveTab(index)}
              className={`px-5 py-2 rounded-full text-sm font-medium mx-2 mb-3 transition-all duration-300 ${
                activeTab === index 
                  ? 'bg-gradient-to-r from-primary-500 to-secondary-500 text-white shadow-lg scale-105' 
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredFeatures.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              index={index}
              color={feature.color}
            />
          ))}
        </div>
        
        <div className={`mt-16 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '0.4s' }}>
          <button className="btn-gradient-animated btn-ripple px-8 py-4 text-lg font-semibold text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
            <span className="relative z-10 flex items-center justify-center">
              Explorar Todos os Recursos
              <FiArrowRight className="ml-2" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features; 