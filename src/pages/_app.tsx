import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Segna AI - Automações Personalizadas com Inteligência Artificial</title>
        <meta name="description" content="Transforme seu negócio com automações personalizadas de IA. A Segna AI desenvolve soluções sob medida para resolver seus desafios específicos." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="font-sans">
        <Component {...pageProps} />
      </main>
    </>
  );
} 