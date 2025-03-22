"use client";

// components/FormBuild/components/Card.tsx
import React from 'react';
import { BaseComponentProps, ComponentConfig } from '../types';
import { cn } from '@/lib/utils';
import {
  Card as ShadcnCard,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface CardProps extends BaseComponentProps {
  title?: string;
  description?: string;
  footer?: boolean;
  footerContent?: ComponentConfig;
  renderComponent?: (config: ComponentConfig, index: number) => React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  title,
  description,
  footer = false,
  footerContent,
  renderComponent,
  ...props
}) => {
  const { onChange, ...restProps } = props;

  return (
    <ShadcnCard className={cn('w-full', className)} {...restProps}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      
      <CardContent>
        {children}
      </CardContent>
      
      {footer && footerContent && renderComponent && (
        <CardFooter>
          {renderComponent(footerContent, 0)}
        </CardFooter>
      )}
    </ShadcnCard>
  );
};