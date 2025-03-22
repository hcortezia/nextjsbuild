"use client";

// components/FormBuild/components/CheckboxField.tsx
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { BaseComponentProps } from '../types';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '@/components/ui/form';

interface CheckboxFieldProps extends BaseComponentProps {
  description?: string;
}

export const CheckboxField: React.FC<CheckboxFieldProps> = ({
  className,
  name = '',
  label,
  description,
  onChange,
  ...props
}) => {
  const form = useFormContext();

  // Função para lidar com mudanças no campo
  const handleChange = (checked: boolean) => {
    if (onChange && name) {
      onChange(name, checked);
    }
  };

  const { form: _, ...restProps } = props;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('flex flex-row items-start space-x-3 space-y-0 p-1', className)}>
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={(checked) => {
                field.onChange(checked);
                handleChange(!!checked);
              }}
              {...restProps}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            {label && <FormLabel className="cursor-pointer">{label}</FormLabel>}
            {description && <FormDescription>{description}</FormDescription>}
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};