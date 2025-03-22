"use client";

// components/FormBuild/types.ts
import { UseFormReturn } from 'react-hook-form';

// Tipo base para configuração de componentes
export interface ComponentConfig {
  xtype: string;
  id?: string;
  name?: string;
  label?: string;
  className?: string;
  items?: ComponentConfig[];
  [key: string]: any; // Permite propriedades adicionais específicas de cada componente
}

// Props para o componente FormBuild
export interface FormBuildProps {
  config: ComponentConfig;
  data?: Record<string, any>;
  onChange?: (name: string, value: any) => void;
  onSubmit?: (data: Record<string, any>) => void;
  id?: string;
}

// Props base para todos os componentes do sistema
export interface BaseComponentProps {
  id?: string;
  name?: string;
  label?: string;
  className?: string;
  data?: Record<string, any>;
  onChange?: (name: string, value: any) => void;
  children?: React.ReactNode;
  form?: UseFormReturn<any>;
  renderComponent?: (config: ComponentConfig, index: number) => React.ReactNode;
  [key: string]: any;
}

// Mapeamento de xtypes para componentes
export interface ComponentRegistryType {
  [key: string]: React.ComponentType<any>;
}