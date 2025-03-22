// components/FormBuild/components/Container.tsx
"use client"
import React from 'react';
import { BaseComponentProps } from '../types';
import { cn } from '@/lib/utils';

interface ContainerProps extends BaseComponentProps {
  layout?: 'horizontal' | 'vertical' | 'grid';
  columns?: number;
  gap?: 'sm' | 'md' | 'lg' | number;
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className,
  layout = 'vertical',
  columns = 1,
  gap = 'md',
  ...props
}) => {
  // Mapeia o gap para valores de Tailwind
  const gapMap = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
  };
  
  const gapClass = typeof gap === 'string' ? gapMap[gap] : `gap-[${gap}px]`;
  
  // Configura as classes CSS com base no layout
  const layoutClasses = {
    vertical: 'flex flex-col',
    horizontal: 'flex flex-row flex-wrap',
    grid: `grid grid-cols-1 sm:grid-cols-${Math.min(columns, 12)}`,
  };
  
  // Remover a propriedade `onChange` se ela existir nos `props`
  const { onChange, ...restProps } = props;
  
  return (
    <div className={cn( layoutClasses[layout], gapClass, className )} {...restProps}>
      {children}
    </div>
  );
};