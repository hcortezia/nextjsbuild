"use client";

// components/FormBuild/components/Content.tsx
import React from 'react';
import { BaseComponentProps } from '../types';
import { cn } from '@/lib/utils';

interface ContentProps extends BaseComponentProps {
  text?: string;
  html?: string;
  variant?: 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div';
  align?: 'left' | 'center' | 'right' | 'justify';
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: string;
}

export const Content: React.FC<ContentProps> = ({
  className,
  text,
  html,
  variant = 'p',
  align = 'left',
  size,
  weight,
  color,
  ...props
}) => {
  // Mapeia o alinhamento para classes Tailwind
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
    justify: 'text-justify',
  };

  // Mapeia o tamanho para classes Tailwind
  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
    '3xl': 'text-3xl',
    '4xl': 'text-4xl',
  };

  // Mapeia o peso para classes Tailwind
  const weightClasses = {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  // Constrói as classes CSS com base nas props
  const contentClasses = cn(
    alignClasses[align],
    size && sizeClasses[size],
    weight && weightClasses[weight],
    color && `text-${color}`,
    className
  );

  // Função para renderizar o conteúdo com base no HTML ou texto
  const renderContent = () => {
    if (html) {
      return <div dangerouslySetInnerHTML={{ __html: html }} />;
    }
    return text || null;
  };

  // Renderiza o elemento baseado no tipo (variant)
  const renderElement = () => {
    const { onChange, ...restProps } = props;

    switch (variant) {
      case 'h1':
        return <h1 className={contentClasses} {...restProps}>{renderContent()}</h1>;
      case 'h2':
        return <h2 className={contentClasses} {...restProps}>{renderContent()}</h2>;
      case 'h3':
        return <h3 className={contentClasses} {...restProps}>{renderContent()}</h3>;
      case 'h4':
        return <h4 className={contentClasses} {...restProps}>{renderContent()}</h4>;
      case 'h5':
        return <h5 className={contentClasses} {...restProps}>{renderContent()}</h5>;
      case 'h6':
        return <h6 className={contentClasses} {...restProps}>{renderContent()}</h6>;
      case 'span':
        return <span className={contentClasses} {...restProps}>{renderContent()}</span>;
      case 'div':
        return <div className={contentClasses} {...restProps}>{renderContent()}</div>;
      default:
        return <p className={contentClasses} {...restProps}>{renderContent()}</p>;
    }
  };

  return renderElement();
};