"use client";

// components/FormBuild/components/FormGroup.tsx
import React from 'react';
import { BaseComponentProps } from '../types';
import { cn } from '@/lib/utils';
import { FormItem } from '@/components/ui/form';

interface FormGroupProps extends BaseComponentProps {
  className?: string;
}

export const FormGroup: React.FC<FormGroupProps> = ({
  children,
  className,
  ...props
}) => {
  const { onChange, ...restProps } = props;

  return (
    <div className={cn('space-y-4', className)} {...restProps}>
      {children}
    </div>
  );
};