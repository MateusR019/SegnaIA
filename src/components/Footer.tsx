import React, { useState } from 'react';
import { FiGithub, FiTwitter, FiLinkedin, FiInstagram, FiArrowUp, FiMail } from 'react-icons/fi';

const Footer: React.FC = () => {
  const [emailValue, setEmailValue] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isHovered, setIsHovered] = useState<string | null>(null);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailValue.trim() !== '') {
      // Simulando envio para API
      setTimeout(() => {
        setIsSubscribed(true);
        setEmailValue('');
      }, 500);
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: <FiTwitter />, name: 'Twitter', url: 'https://twitter.com', color: 'from-blue-400 to-blue-600' },
    { icon: <FiLinkedin />, name: 'LinkedIn', url: 'https://linkedin.com', color: 'from-blue-600 to-blue-800' },
    { icon: <FiGithub />, name: 'GitHub', url: 'https://github.com', color: 'from-gray-700 to-gray-900' },
    { icon: <FiInstagram />, name: 'Instagram', url: 'https://instagram.com', color: 'from-pink-500 to-purple-600' }
  ];
  
  const footerLinks = [
    {
      title: 'Produto',
      links: [
        { name: 'Recursos', url: '#features' },
        { name: 'Preços', url: '#pricing' },
        { name: 'Casos de Uso', url: '#' },
        { name: 'Integrações', url: '#' },
        { name: 'Atualizações', url: '#' }
      ]
    },
    {
      title: 'Empresa',
      links: [
        { name: 'Sobre Nós', url: '#about' },
        { name: 'Carreiras', url: '#' },
        { name: 'Blog', url: '#' },
        { name: 'Imprensa', url: '#' },
        { name: 'Parceiros', url: '#' }
      ]
    },
    {
      title: 'Suporte',
      links: [
        { name: 'Documentação', url: '#' },
        { name: 'Tutoriais', url: '#' },
        { name: 'FAQ', url: '#' },
        { name: 'Comunidade', url: '#' },
        { name: 'Contato', url: '#contact' }
      ]
    }
  ];
  
  return (
    <footer className="relative pt-20 pb-10 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-secondary-500"></div>
      <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-primary-500 opacity-5 animate-float-slow"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-secondary-500 opacity-5 animate-float-medium"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          {/* Coluna da marca */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <a href="#" className="text-2xl font-bold text-gradient">
                Segna
              </a>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Transformando empresas através da automação inteligente e soluções de IA personalizadas para impulsionar eficiência e inovação.
            </p>
            
            {/* Newsletter */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
                Receba nossas novidades
              </h4>
              {!isSubscribed ? (
                <form onSubmit={handleSubmit} className="flex">
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      value={emailValue}
                      onChange={(e) => setEmailValue(e.target.value)}
                      placeholder="Seu email"
                      className="form-input-animated pl-10 pr-3 py-2 w-full rounded-l-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-0 focus:ring-2 focus:ring-primary-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-gradient-animated px-4 py-2 rounded-r-lg text-white font-medium transition-all duration-300"
                  >
                    Inscrever
                  </button>
                </form>
              ) : (
                <div className="bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 p-3 rounded-lg animate-fade-in flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Obrigado por se inscrever!
                </div>
              )}
            </div>
            
            {/* Social Links */}
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wider">
                Siga-nos
              </h4>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
                      isHovered === social.name ? 
                      `bg-gradient-to-r ${social.color} text-white` : 
                      'bg-gray-200/50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300'
                    }`}
                    onMouseEnter={() => setIsHovered(social.name)}
                    onMouseLeave={() => setIsHovered(null)}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Links de navegação */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
                {column.title}
              </h4>
              <ul className="space-y-2">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex} className="transform transition-transform duration-300 hover:translate-x-1">
                    <a 
                      href={link.url} 
                      className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Linha divisória */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-8"></div>
        
        {/* Rodapé inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-600 dark:text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Segna. Todos os direitos reservados.
          </div>
          <div className="flex space-x-6 text-sm">
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300">
              Termos de Serviço
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300">
              Política de Privacidade
            </a>
            <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300">
              Cookies
            </a>
          </div>
        </div>
      </div>
      
      {/* Botão de voltar ao topo */}
      <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-50 animate-bounce-slow"
        aria-label="Voltar ao topo"
      >
        <FiArrowUp className="w-5 h-5" />
      </button>
    </footer>
  );
};

export default Footer; 