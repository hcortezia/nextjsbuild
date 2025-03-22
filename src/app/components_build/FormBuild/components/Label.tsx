"use client";

// components/FormBuild/components/Label.tsx
import React from 'react';
import { BaseComponentProps } from '../types';
import { Label as ShadcnLabel } from '@/components/ui/label';

interface LabelProps extends BaseComponentProps {
  htmlFor?: string;
  text?: string;
}

export const LabelComponent: React.FC<LabelProps> = ({
  children,
  className,
  htmlFor,
  text,
  ...props
}) => {
  const { onChange, form, ...restProps } = props;

  return (
    <ShadcnLabel htmlFor={htmlFor} className={className} {...restProps}>
      {text || children}
    </ShadcnLabel>
  );
};