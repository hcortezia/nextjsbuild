"use client";

// components/FormBuild/components/Breadcrumb.tsx
import React from 'react';
import { BaseComponentProps } from '../types';
import {
  Breadcrumb as ShadcnBreadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';

// Breadcrumb principal
export const BreadcrumbComponent: React.FC<BaseComponentProps> = ({
  children,
  className,
  renderComponent,
  items = [],
  ...props
}) => {
  const { onChange, ...restProps } = props;

  return (
    <ShadcnBreadcrumb className={className} {...restProps}>
      {children}
      {renderComponent && items.map((item: any, index: any) => renderComponent(item, index))}
    </ShadcnBreadcrumb>
  );
};

// BreadcrumbList
export const BreadcrumbListComponent: React.FC<BaseComponentProps> = ({
  children,
  className,
  renderComponent,
  items = [],
  ...props
}) => {
  const { onChange, ...restProps } = props;

  return (
    <BreadcrumbList className={className} {...restProps}>
      {children}
      {renderComponent && items.map((item: any, index: any) => renderComponent(item, index))}
    </BreadcrumbList>
  );
};

// BreadcrumbItem
export const BreadcrumbItemComponent: React.FC<BaseComponentProps> = ({
  children,
  className,
  renderComponent,
  items = [],
  ...props
}) => {
  const { onChange, ...restProps } = props;

  return (
    <BreadcrumbItem className={className} {...restProps}>
      {children}
      {renderComponent && items.map((item: any, index: any) => renderComponent(item, index))}
    </BreadcrumbItem>
  );
};

// BreadcrumbLink
export const BreadcrumbLinkComponent: React.FC<BaseComponentProps> = ({
  children,
  className,
  href,
  text,
  ...props
}) => {
  const { onChange, ...restProps } = props;

  return (
    <BreadcrumbLink href={href} className={className} {...restProps}>
      {text || children}
    </BreadcrumbLink>
  );
};

// BreadcrumbPage
export const BreadcrumbPageComponent: React.FC<BaseComponentProps> = ({
  children,
  className,
  text,
  ...props
}) => {
  const { onChange, ...restProps } = props;

  return (
    <BreadcrumbPage className={className} {...restProps}>
      {text || children}
    </BreadcrumbPage>
  );
};

// BreadcrumbSeparator
export const BreadcrumbSeparatorComponent: React.FC<BaseComponentProps> = ({
  className,
  ...props
}) => {
  const { onChange, ...restProps } = props;

  return (
    <BreadcrumbSeparator className={className} {...restProps} />
  );
};

// Separator
export const SeparatorComponent: React.FC<BaseComponentProps> = ({
  className,
  orientation = 'horizontal',
  ...props
}) => {
  const { onChange, ...restProps } = props;

  return (
    <Separator orientation={orientation} className={className} {...restProps} />
  );
};