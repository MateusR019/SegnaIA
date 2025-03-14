import React from 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}

declare module 'react' {
  interface CSSProperties {
    [key: string]: any;
  }
}

declare module 'react-hook-form' {
  export const useForm: any;
}

export {}; 