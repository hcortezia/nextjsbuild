"use client";

import React from 'react';
import { BaseComponentProps } from '../types';
import { cn } from '@/lib/utils';
import {
  Avatar as ShadcnAvatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";

interface AvatarProps extends BaseComponentProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | number;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = '',
  fallback,
  size = 'md',
  className,
  ...props
}) => {
  // Mapear tamanhos para classes CSS
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-10 w-10',
    lg: 'h-12 w-12'
  };
  
  // Determinar a classe de tamanho
  const sizeClass = typeof size === 'string' ? sizeClasses[size] : `h-[${size}px] w-[${size}px]`;
  
  // Gerar as iniciais para o fallback se não fornecido
  const generateFallback = () => {
    if (fallback) return fallback;
    
    if (alt) {
      // Extrair iniciais do texto alt
      return alt
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
        .substring(0, 2);
    }
    
    return '?';
  };

  const { onChange, ...restProps } = props;

  return (
    <ShadcnAvatar className={cn(sizeClass, className)} {...restProps}>
      {src && <AvatarImage src={src} alt={alt} />}
      <AvatarFallback>{generateFallback()}</AvatarFallback>
    </ShadcnAvatar>
  );
};