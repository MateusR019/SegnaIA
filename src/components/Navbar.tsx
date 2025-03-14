import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { FiMenu, FiX, FiMoon, FiSun, FiChevronDown } from 'react-icons/fi';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('inicio');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Verificar preferência de tema do usuário
    if (typeof window !== 'undefined') {
      const darkModePreference = localStorage.getItem('darkMode') === 'true';
      setIsDarkMode(darkModePreference);
      
      if (darkModePreference) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
    
    // Detectar scroll para mudar o estilo da navbar
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    // Detectar seção ativa baseada no scroll
    const handleSectionDetection = () => {
      const sections = document.querySelectorAll('section[id]');
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        const sectionId = section.getAttribute('id') || '';
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          setActiveSection(sectionId);
        }
      });
    };
    
    // Fechar dropdown quando clicar fora
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('scroll', handleSectionDetection);
    document.addEventListener('mousedown', handleClickOutside);
    
    // Iniciar detecção de seção
    handleSectionDetection();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleSectionDetection);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', String(newDarkMode));
      
      if (newDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  };
  
  const navItems = [
    { name: 'Início', href: '#inicio' },
    { name: 'Recursos', href: '#features' },
    { name: 'Benefícios', href: '#beneficios' },
    { name: 'Depoimentos', href: '#testimonials' },
    { name: 'Contato', href: '#contact' }
  ];
  
  const resourcesDropdown = [
    { name: 'Automação de Processos', href: '#features' },
    { name: 'Análise de Dados', href: '#features' },
    { name: 'IA Personalizada', href: '#features' },
    { name: 'Segurança Integrada', href: '#features' }
  ];
  
  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'glass dark:glass-dark backdrop-blur-lg py-2 shadow-lg' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <span className={`text-2xl font-bold transition-all duration-300 ${
              isScrolled 
                ? 'text-gray-900 dark:text-white' 
                : 'text-gray-900 dark:text-white'
            }`}>
              <span className="bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent group-hover:animate-gradient-shift">Segna</span>
              <span className="text-primary-600 group-hover:animate-pulse-glow">AI</span>
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.replace('#', '');
                return (
                  <Link 
                    key={item.name} 
                    href={item.href}
                    className={`relative font-medium transition-all duration-300 hover:text-primary-600 group ${
                      isActive
                        ? 'text-primary-600 dark:text-primary-400'
                        : isScrolled 
                          ? 'text-gray-700 dark:text-gray-300' 
                          : 'text-gray-700 dark:text-gray-300'
                    }`}
                    style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                  >
                    {item.name}
                    <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-300 group-hover:w-full ${
                      isActive ? 'w-full' : 'w-0'
                    }`}></span>
                  </Link>
                );
              })}
            </div>
            
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                isScrolled 
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700' 
                  : 'bg-white/10 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white/20'
              }`}
              aria-label="Alternar modo escuro"
            >
              {isDarkMode ? (
                <FiSun className="w-5 h-5 animate-spin-slow" />
              ) : (
                <FiMoon className="w-5 h-5 animate-float-slow" />
              )}
            </button>
            
            <Link 
              href="#contact"
              className="btn-gradient-animated btn-ripple px-6 py-2 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Fale Conosco
            </Link>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden space-x-4">
            <button 
              onClick={toggleDarkMode}
              className={`p-2 rounded-full transition-all duration-300 ${
                isScrolled 
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700' 
                  : 'bg-white/10 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white/20'
              }`}
              aria-label="Alternar modo escuro"
            >
              {isDarkMode ? <FiSun className="w-5 h-5" /> : <FiMoon className="w-5 h-5" />}
            </button>
            
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-full transition-all duration-300 ${
                isScrolled 
                  ? 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700' 
                  : 'bg-white/10 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white/20'
              }`}
              aria-label="Abrir menu"
            >
              {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute w-full glass dark:glass-dark backdrop-blur-lg shadow-lg transition-all duration-500 ease-in-out ${
          isOpen 
            ? 'max-h-[500px] opacity-100' 
            : 'max-h-0 opacity-0 pointer-events-none'
        } overflow-hidden`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col space-y-4">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.href.replace('#', '');
              return (
                <Link 
                  key={item.name} 
                  href={item.href}
                  className={`relative font-medium py-2 pl-2 border-l-2 transition-all duration-300 animate-slide-in-right ${
                    isActive
                      ? 'border-primary-500 text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20 rounded-r-lg'
                      : 'border-transparent text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:border-primary-500 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-r-lg'
                  }`}
                  style={{ animationDelay: `${0.1 + index * 0.05}s` }}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              );
            })}
            
            <Link 
              href="#contact"
              className="btn-gradient-animated btn-ripple w-full text-center py-3 text-white font-medium rounded-lg shadow-md animate-slide-in-right"
              style={{ animationDelay: '0.4s' }}
              onClick={() => setIsOpen(false)}
            >
              Fale Conosco
            </Link>
          </div>
        </div>
      </div>
      
      {/* Indicador de progresso de scroll */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-200 dark:bg-gray-800">
        <div 
          className="h-full bg-gradient-to-r from-primary-500 to-secondary-500 transition-all duration-300"
          style={{ width: typeof window !== 'undefined' ? `${Math.min((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100, 100)}%` : '0%' }}
        ></div>
      </div>
    </nav>
  );
};

export default Navbar; 