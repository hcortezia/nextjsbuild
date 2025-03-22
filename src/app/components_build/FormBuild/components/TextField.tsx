"use client";

// components/FormBuild/components/TextField.tsx
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { BaseComponentProps } from '../types';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '@/components/ui/form';

interface TextFieldProps extends BaseComponentProps {
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url';
  placeholder?: string;
  description?: string;
  required?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  className,
  name = '',
  label,
  description,
  type = 'text',
  placeholder,
  required = false,
  onChange,
  ...props
}) => {
  const form = useFormContext();

  // Função para lidar com mudanças no campo
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange && name) {
      // Para campos numéricos, converte o valor para número
      const newValue = type === 'number' ? 
        (e.target.value === '' ? '' : Number(e.target.value)) : 
        e.target.value;
      
      onChange(name, newValue);
    }
  };

  const { form: _, ...restProps } = props;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              type={type}
              className={cn(className)}
              placeholder={placeholder}
              required={required}
              {...field}
              onChange={(e) => {
                field.onChange(e);
                handleChange(e);
              }}
              {...restProps}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};