// src/types/react-quill.d.ts
declare module 'react-quill' {
    import { Component } from 'react';
  
    // Definición de los módulos de Quill
    export interface QuillModules {
      toolbar?: boolean | string | any[];
      history?: {
        delay: number;
        maxStack: number;
        userOnly: boolean;
      };
      [key: string]: any; // Para extender con otros módulos que pueda necesitar
    }
  
    export interface ReactQuillProps {
      value: string;
      onChange: (value: string) => void;
      modules?: QuillModules; // Usar la definición de módulos más específica
      formats?: string[]; // Lista de formatos que pueden ser utilizados en el editor
      theme?: string; // Tema, puede ser "snow" o "bubble"
    }
  
    export default class ReactQuill extends Component<ReactQuillProps> {}
  }
  