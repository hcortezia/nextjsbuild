"use client";

// components/FormBuild/components/Dropdown.tsx
import React from 'react';
import { BaseComponentProps } from '../types';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

// DropdownMenu principal
export const DropdownMenuComponent: React.FC<BaseComponentProps> = ({
  children,
  className,
  renderComponent,
  items = [],
  ...props
}) => {
  const { onChange, form, ...restProps } = props;

  return (
    <DropdownMenu {...restProps}>
      {children}
      {renderComponent && items.map((item: any, index: any) => renderComponent(item, index))}
    </DropdownMenu>
  );
};

// DropdownMenuTrigger
export const DropdownMenuTriggerComponent: React.FC<BaseComponentProps> = ({
  children,
  className,
  renderComponent,
  items = [],
  asChild = true,
  ...props
}) => {
  const { onChange, form, ...restProps } = props;

  return (
    <DropdownMenuTrigger asChild={asChild} className={className} {...restProps}>
      {children}
      {renderComponent && items.map((item: any, index: any) => renderComponent(item, index))}
    </DropdownMenuTrigger>
  );
};

// DropdownMenuContent
export const DropdownMenuContentComponent: React.FC<BaseComponentProps> = ({
  children,
  className,
  renderComponent,
  items = [],
  align = 'start',
  ...props
}) => {
  const { onChange, form, ...restProps } = props;

  return (
    <DropdownMenuContent className={className} align={align} {...restProps}>
      {children}
      {renderComponent && items.map((item: any, index: any) => renderComponent(item, index))}
    </DropdownMenuContent>
  );
};

// DropdownMenuItem
export const DropdownMenuItemComponent: React.FC<BaseComponentProps> = ({
  children,
  className,
  text,
  onSelect,
  ...props
}) => {
  const { onChange, form, ...restProps } = props;

  return (
    <DropdownMenuItem className={className} onSelect={onSelect} {...restProps}>
      {text || children}
    </DropdownMenuItem>
  );
};