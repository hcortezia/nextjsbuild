"use client";

// components/FormBuild/components/SelectField.tsx
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { BaseComponentProps } from '../types';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '@/components/ui/form';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps extends BaseComponentProps {
  options: SelectOption[];
  placeholder?: string;
  description?: string;
  required?: boolean;
}

export const SelectField: React.FC<SelectFieldProps> = ({
  className,
  name = '',
  label,
  description,
  options = [],
  placeholder = 'Selecione uma opção',
  required = false,
  onChange,
  ...props
}) => {
  const form = useFormContext();

  // Função para lidar com mudanças no campo
  const handleChange = (value: string) => {
    if (onChange && name) {
      onChange(name, value);
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
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                handleChange(value);
              }}
              value={field.value}
              {...restProps}
            >
              <SelectTrigger className={cn(className)}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {options.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};