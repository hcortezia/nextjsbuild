"use client";

// components/FormBuild/components/Icon.tsx
import React from 'react';
import { BaseComponentProps } from '../types';
import { cn } from '@/lib/utils';
import * as LucideIcons from 'lucide-react';

interface IconProps extends BaseComponentProps {
  name: string;
  size?: number | string;
  color?: string;
  strokeWidth?: number;
}

export const Icon: React.FC<IconProps> = ({
  className,
  name,
  size = 24,
  color,
  strokeWidth = 2,
  ...props
}) => {
  // Ajusta o nome do ícone para corresponder ao formato do Lucide (PascalCase)
  const formatIconName = (iconName: string): string => {
    return iconName
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
  };

  const formattedName = formatIconName(name);
  
  // @ts-ignore - O TypeScript não consegue inferir a indexação dinâmica
  const IconComponent = LucideIcons[formattedName] as React.FC<any>;

  if (!IconComponent) {
    console.warn(`Ícone "${name}" não encontrado`);
    return null;
  }

  return (
    <IconComponent
      className={cn(className)}
      size={size}
      color={color}
      strokeWidth={strokeWidth}
      {...props}
    />
  );
};