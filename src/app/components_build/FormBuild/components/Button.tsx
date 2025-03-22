// components/FormBuild/components/Button.tsx
"use client"
import React from 'react';
import { BaseComponentProps } from '../types';
import { cn } from '@/lib/utils';
import { Button as ShadcnButton } from '@/components/ui/button';

interface ButtonProps extends BaseComponentProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  onClick?: () => void;
  text?: string;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  type = 'button',
  variant = 'default',
  size = 'default',
  onClick,
  text,
  children,
  ...props
}) => {
  const { onChange, form: _, ...restProps } = props;

  return (
    <ShadcnButton type={type} variant={variant} size={size} className={cn(className)} onClick={onClick} {...restProps}>
      {text || children}
    </ShadcnButton>
  );
};