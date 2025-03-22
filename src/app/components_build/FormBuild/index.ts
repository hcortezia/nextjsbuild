"use client";

// components/FormBuild/index.ts
// Arquivo de barril para facilitar importações

export { FormBuild } from './FormBuild';
export { ComponentRegistry, registerComponent } from './ComponentRegistry';
export type { 
  ComponentConfig, 
  FormBuildProps, 
  BaseComponentProps,
  ComponentRegistryType 
} from './types';

// Re-exporta react-hook-form para facilitar o uso
export { useForm, useFormContext, FormProvider } from 'react-hook-form';

// Exporta componentes individuais
export { Container } from './components/Container';
export { Card } from './components/Card';
export { FormGroup } from './components/FormGroup';
export { TextField } from './components/TextField';
export { SelectField } from './components/SelectField';
export { CheckboxField } from './components/CheckboxField';
export { Button } from './components/Button';
export { Content } from './components/Content';
export { Icon } from './components/Icon';