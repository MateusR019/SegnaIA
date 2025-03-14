import React, { useState, useEffect, useRef } from 'react';
import { FiChevronLeft, FiChevronRight, FiStar, FiMessageSquare, FiUser } from 'react-icons/fi';

interface TestimonialProps {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
  image?: string;
  index: number;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ 
  name, 
  role, 
  company, 
  content, 
  rating, 
  image, 
  index 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  
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
      className="glass dark:glass-dark rounded-xl p-6 transition-all duration-300 relative overflow-hidden"
      style={calculateTransform()}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Efeito de gradiente no fundo */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 opacity-0 transition-opacity duration-300 ${
          isHovered ? 'opacity-5' : ''
        }`}
      ></div>
      
      {/* Ícone de aspas */}
      <div className="absolute -top-2 -left-2 text-6xl text-primary-200 dark:text-primary-900 opacity-30 transform -rotate-12">
        <FiMessageSquare />
      </div>
      
      {/* Conteúdo */}
      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <div className="flex-shrink-0 mr-4">
            {image ? (
              <img 
                src={image} 
                alt={name} 
                className="w-14 h-14 rounded-full object-cover border-2 border-primary-200 dark:border-primary-800"
                onError={(e) => {
                  // Fallback para avatar genérico
                  const target = e.currentTarget;
                  target.onerror = null;
                  target.src = `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=random`;
                }}
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 dark:text-primary-400">
                <FiUser className="w-6 h-6" />
              </div>
            )}
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{role}, {company}</p>
          </div>
        </div>
        
        <div className="flex mb-4">
          {[...Array(5)].map((_, i) => (
            <FiStar 
              key={i} 
              className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`} 
            />
          ))}
        </div>
        
        <p className="text-gray-700 dark:text-gray-300 italic relative">
          "{content}"
        </p>
      </div>
      
      {/* Decoração de cantos */}
      <div className={`absolute top-0 left-0 w-10 h-10 border-t-2 border-l-2 border-primary-500 opacity-0 transition-all duration-500 ${isHovered ? 'opacity-100 w-16 h-16' : ''}`}></div>
      <div className={`absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2 border-secondary-500 opacity-0 transition-all duration-500 ${isHovered ? 'opacity-100 w-16 h-16' : ''}`}></div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
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
    
    if (carouselRef.current) {
      observer.observe(carouselRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  const testimonials = [
    {
      name: 'Ana Silva',
      role: 'Diretora de Operações',
      company: 'TechSolutions',
      content: 'A implementação da automação com IA da Segna transformou completamente nossos processos internos. Reduzimos o tempo de processamento em 70% e praticamente eliminamos erros manuais.',
      rating: 5,
      image: '/images/testimonials/ana-silva.jpg'
    },
    {
      name: 'Carlos Mendes',
      role: 'CEO',
      company: 'Inovativa',
      content: 'Estávamos céticos quanto ao retorno sobre o investimento, mas a Segna superou todas as nossas expectativas. A solução personalizada se adaptou perfeitamente às nossas necessidades específicas.',
      rating: 5,
      image: '/images/testimonials/carlos-mendes.jpg'
    },
    {
      name: 'Mariana Costa',
      role: 'Gerente de TI',
      company: 'Grupo Nexus',
      content: 'O que mais me impressionou foi a facilidade de implementação e o suporte excepcional da equipe. Mesmo com nossa infraestrutura complexa, a integração foi tranquila e sem interrupções.',
      rating: 4,
      image: '/images/testimonials/mariana-costa.jpg'
    },
    {
      name: 'Roberto Almeida',
      role: 'Diretor Financeiro',
      company: 'Construtora Horizonte',
      content: 'A análise preditiva implementada pela Segna nos permitiu antecipar tendências de mercado e otimizar nosso fluxo de caixa. O ROI foi alcançado em apenas 4 meses.',
      rating: 5,
      image: '/images/testimonials/roberto-almeida.jpg'
    },
    {
      name: 'Juliana Ferreira',
      role: 'Gerente de Marketing',
      company: 'E-commerce Express',
      content: 'A automação do nosso funil de marketing trouxe resultados impressionantes. Aumentamos a taxa de conversão em 45% e conseguimos personalizar a jornada do cliente de forma muito mais eficiente.',
      rating: 4,
      image: '/images/testimonials/juliana-ferreira.jpg'
    }
  ];
  
  const nextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  const prevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  const goToSlide = (index: number) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);
    setActiveIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };
  
  // Suporte para gestos de toque
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Deslizar para a esquerda
      nextSlide();
    }
    
    if (touchStart - touchEnd < -50) {
      // Deslizar para a direita
      prevSlide();
    }
  };
  
  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    
    return () => clearInterval(interval);
  }, [activeIndex, isAnimating]);
  
  // Calcular quais slides mostrar com base no tamanho da tela
  const getVisibleSlides = () => {
    // Em telas pequenas, mostrar apenas o slide ativo
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return [activeIndex];
    }
    
    // Em telas médias, mostrar o slide ativo e o próximo
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      const nextIndex = activeIndex === testimonials.length - 1 ? 0 : activeIndex + 1;
      return [activeIndex, nextIndex];
    }
    
    // Em telas grandes, mostrar 3 slides
    const nextIndex = activeIndex === testimonials.length - 1 ? 0 : activeIndex + 1;
    const nextNextIndex = nextIndex === testimonials.length - 1 ? 0 : nextIndex + 1;
    return [activeIndex, nextIndex, nextNextIndex];
  };
  
  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-secondary-500 opacity-5"></div>
      
      {/* Elementos decorativos */}
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-primary-500 opacity-5 animate-float-slow"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-secondary-500 opacity-5 animate-float-medium"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <span className="inline-block px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900 text-primary-600 dark:text-primary-300 text-sm font-medium mb-3 animate-pulse-glow">
            DEPOIMENTOS
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-animated">
            O que nossos clientes dizem
          </h2>
          <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-400">
            Veja como nossas soluções de automação com IA estão transformando empresas e impulsionando resultados reais.
          </p>
        </div>
        
        {/* Carrossel de depoimentos */}
        <div 
          ref={carouselRef}
          className={`relative transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{ transitionDelay: '0.2s' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getVisibleSlides().map((slideIndex, i) => (
              <div 
                key={slideIndex}
                className={`transition-all duration-500 transform ${
                  isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
                }`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <TestimonialCard 
                  {...testimonials[slideIndex]} 
                  index={slideIndex}
                />
              </div>
            ))}
          </div>
          
          {/* Controles de navegação */}
          <div className="flex justify-center items-center mt-10 space-x-4">
            <button 
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
              aria-label="Depoimento anterior"
            >
              <FiChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    activeIndex === index 
                      ? 'bg-gradient-to-r from-primary-500 to-secondary-500 w-8' 
                      : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600'
                  }`}
                  aria-label={`Ir para depoimento ${index + 1}`}
                ></button>
              ))}
            </div>
            
            <button 
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white dark:bg-gray-800 shadow-md flex items-center justify-center text-gray-700 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-gray-700 transition-all duration-300 hover:scale-110"
              aria-label="Próximo depoimento"
            >
              <FiChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
        
        {/* CTA */}
        <div className={`mt-16 text-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`} style={{ transitionDelay: '0.4s' }}>
          <a 
            href="#contact" 
            className="btn-gradient-animated btn-ripple px-8 py-4 text-white text-lg font-bold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Seja o Próximo Caso de Sucesso
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 