"use client";

// components/FormBuild/FormBuild.tsx
import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { ComponentRegistry } from './ComponentRegistry';
import { FormBuildProps, ComponentConfig } from './types';

/**
 * FormBuild - Um componente que constrói formulários dinâmicos baseados em configuração JSON
 * Similar ao conceito do ExtJS onde a UI é declarada através de objetos
 */
export const FormBuild: React.FC<FormBuildProps> = ({ 
  config, 
  data = {}, 
  onChange,
  onSubmit,
  id = 'dynamic-form'
}) => {
  // Configurar o react-hook-form
  const methods = useForm({
    defaultValues: data,
    mode: 'onChange'
  });

  // Sincronizar os dados externos com o react-hook-form
  React.useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      Object.keys(data).forEach(key => {
        methods.setValue(key, data[key]);
      });
    }
  }, [data, methods]);

  // Função para manipular alterações no formulário
  const handleFieldChange = (name: string, value: any) => {
    // Atualiza o valor no react-hook-form
    methods.setValue(name, value);
    
    // Chama o callback onChange se existir
    if (onChange) {
      onChange(name, value);
    }
  };

  // Função recursiva para renderizar componentes a partir da configuração
  const renderComponent = (componentConfig: ComponentConfig, index: number): React.ReactNode => {
    const { xtype, items = [], ...rest } = componentConfig;

    // Busca o componente correspondente no registro
    const Component = ComponentRegistry[xtype];
    
    if (!Component) {
      console.warn(`Componente com xtype '${xtype}' não encontrado no registro`);
      return null;
    }

    // Se o componente tiver itens filhos, renderiza-os recursivamente
    const childComponents = items.map((item, idx) => renderComponent(item, idx));

    // Renderiza o componente com suas props e filhos
    return (
      <Component 
        key={`${xtype}-${index}`}
        {...rest}
        data={data}
        form={methods}
        onChange={handleFieldChange}
        renderComponent={renderComponent}
      >
        {childComponents.length > 0 ? childComponents : null}
      </Component>
    );
  };

  // Manipulador de submissão do formulário
  const handleSubmit = methods.handleSubmit((formData) => {
    if (onSubmit) {
      onSubmit(formData);
    }
  });

  return (
    <FormProvider {...methods}>
      <form id={id} onSubmit={handleSubmit}>
        {renderComponent(config, 0)}
      </form>
    </FormProvider>
  );
};

export default FormBuild;