import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Benefits from '../components/Benefits';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <>
      <Head>
        <title>Segna AI | Automação Inteligente para Seu Negócio</title>
        <meta name="description" content="Transforme seu negócio com soluções de automação personalizadas com IA. A Segna AI desenvolve automações inteligentes que economizam tempo e recursos." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://segnai.com.br/" />
        <meta property="og:title" content="Segna AI | Automação Inteligente para Seu Negócio" />
        <meta property="og:description" content="Transforme seu negócio com soluções de automação personalizadas com IA. A Segna AI desenvolve automações inteligentes que economizam tempo e recursos." />
        <meta property="og:image" content="https://segnai.com.br/og-image.jpg" />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://segnai.com.br/" />
        <meta property="twitter:title" content="Segna AI | Automação Inteligente para Seu Negócio" />
        <meta property="twitter:description" content="Transforme seu negócio com soluções de automação personalizadas com IA. A Segna AI desenvolve automações inteligentes que economizam tempo e recursos." />
        <meta property="twitter:image" content="https://segnai.com.br/og-image.jpg" />
        
        {/* Fontes */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </Head>
      
      <div className="flex flex-col min-h-screen">
        <Header />
        
        <main className="flex-grow pt-16">
          <div className="relative">
            <Hero />
            <ContactForm />
          </div>
          <Benefits />
          <Testimonials />
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Home; 