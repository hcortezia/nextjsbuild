"use client";

// components/FormBuild/components/Sidebar.tsx
import React from 'react';
import { BaseComponentProps, ComponentConfig } from '../types';
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  SidebarSeparator
} from '@/components/ui/sidebar';

// Sidebar principal
export const Sidebar: React.FC<BaseComponentProps> = ({
  children,
  className,
  renderComponent,
  items = [],
  ...props
}) => {
  const { onChange, form, ...restProps } = props;

  return (
    <ShadcnSidebar className={className} {...restProps}>
      {children}
      {renderComponent && items.map((item: any, index: any) => renderComponent(item, index))}
    </ShadcnSidebar>
  );
};

// SidebarProvider
export const SidebarProviderComponent: React.FC<BaseComponentProps> = ({
  children,
  renderComponent,
  items = [],
  ...props
}) => {
  const { onChange, form, ...restProps } = props;

  return (
    <SidebarProvider {...restProps}>
      {children}
      {renderComponent && items.map((item: any, index: any) => renderComponent(item, index))}
    </SidebarProvider>
  );
};

// SidebarHeader
export const SidebarHeaderComponent: React.FC<BaseComponentProps> = ({
  children,
  className,
  renderComponent,
  items = [],
  ...props
}) => {
  const { onChange, form, ...restProps } = props;

  return (
    <SidebarHeader className={className} {...restProps}>
      {children}
      {renderComponent && items.map((item: any, index: any) => renderComponent(item, index))}
    </SidebarHeader>
  );
};

// SidebarContent
export const SidebarContentComponent: React.FC<BaseComponentProps> = ({
  children,
  className,
  renderComponent,
  items = [],
  ...props
}) => {
  const { onChange, form, ...restProps } = props;

  return (
    <SidebarContent className={className} {...restProps}>
      {children}
      {renderComponent && items.map((item: any, index: any) => renderComponent(item, index))}
    </SidebarContent>
  );
};

// SidebarGroup
export const SidebarGroupComponent: React.FC<BaseComponentProps> = ({
  children,
  className,
  renderComponent,
  items = [],
  ...props
}) => {
  const { onChange, form, ...restProps } = props;

  return (
    <SidebarGroup className={className} {...restProps}>
      {children}
      {renderComponent && items.map((item: any, index: any) => renderComponent(item, index))}
    </SidebarGroup>
  );
};

// SidebarGroupLabel
export const SidebarGroupLabelComponent: React.FC<BaseComponentProps> = ({
  children,
  className,
  text,
  ...props
}) => {
  const { onChange, form, ...restProps } = props;

  return (
    <SidebarGroupLabel className={className} {...restProps}>
      {text || children}
    </SidebarGroupLabel>
  );
};

// SidebarGroupContent
export const SidebarGroupContentComponent: React.FC<BaseComponentProps> = ({
  children,
  className,
  renderComponent,
  items = [],
  ...props
}) => {
  const { onChange, form, ...restProps } = props;

  return (
    <SidebarGroupContent className={className} {...restProps}>
      {children}
      {renderComponent && items.map((item: any, index: any) => renderComponent(item, index))}
    </SidebarGroupContent>
  );
};

// SidebarMenu
export const SidebarMenuComponent: React.FC<BaseComponentProps> = ({
  children,
  className,
  renderComponent,
  items = [],
  ...props
}) => {
  const { onChange, form, ...restProps } = props;

  return (
    <SidebarMenu className={className} {...restProps}>
      {children}
      {renderComponent && items.map((item: any, index: any) => renderComponent(item, index))}
    </SidebarMenu>
  );
};

// SidebarMenuItem
export const SidebarMenuItemComponent: React.FC<BaseComponentProps> = ({
  children,
  className,
  renderComponent,
  items = [],
  ...props
}) => {
  const { onChange, form, ...restProps } = props;

  return (
    <SidebarMenuItem className={className} {...restProps}>
      {children}
      {renderComponent && items.map((item: any, index: any) => renderComponent(item, index))}
    </SidebarMenuItem>
  );
};

// SidebarMenuButton
export const SidebarMenuButtonComponent: React.FC<BaseComponentProps> = ({
  children,
  className,
  renderComponent,
  items = [],
  isActive,
  size,
  asChild = false,
  href,
  text,
  ...props
}) => {
  const { onChange, form, ...restProps } = props;

  // Se tiver href, renderiza como link
  if (href) {
    return (
      <SidebarMenuButton asChild={true} isActive={isActive} size={size} className={className} {...restProps}>
        <a href={href}>
          {children}
          {text}
          {renderComponent && items.map((item: any, index: any) => renderComponent(item, index))}
        </a>
      </SidebarMenuButton>
    );
  }

  return (
    <SidebarMenuButton 
      asChild={asChild} 
      isActive={isActive} 
      size={size}
      className={className} 
      {...restProps}
    >
      {children}
      {text && <span>{text}</span>}
      {renderComponent && items.map((item: any, index: any) => renderComponent(item, index))}
    </SidebarMenuButton>
  );
};

// SidebarInput 
export const SidebarInputComponent: React.FC<BaseComponentProps> = ({
  className,
  id,
  placeholder,
  ...props
}) => {
  const { onChange, form, ...restProps } = props;

  return (
    <SidebarInput 
      id={id} 
      placeholder={placeholder}
      className={className} 
      {...restProps} 
    />
  );
};

// SidebarInset
export const SidebarInsetComponent: React.FC<BaseComponentProps> = ({
  children,
  className,
  renderComponent,
  items = [],
  ...props
}) => {
  const { onChange, form, ...restProps } = props;

  return (
    <SidebarInset className={className} {...restProps}>
      {children}
      {renderComponent && items.map((item: any, index: any) => renderComponent(item, index))}
    </SidebarInset>
  );
};

// SidebarRail
export const SidebarRailComponent: React.FC<BaseComponentProps> = ({
  className,
  ...props
}) => {
  const { onChange, form, ...restProps } = props;

  return (
    <SidebarRail className={className} {...restProps} />
  );
};

// SidebarTrigger
export const SidebarTriggerComponent: React.FC<BaseComponentProps> = ({
  className,
  ...props
}) => {
  const { onChange, form, ...restProps } = props;

  return (
    <SidebarTrigger className={className} {...restProps} />
  );
};

// SidebarSeparatorComponent
export const SidebarSeparatorComponent: React.FC<BaseComponentProps> = ({
  className,
  ...props
}) => {
  const { onChange, form, ...restProps } = props;

  return (
    <SidebarSeparator className={className} {...restProps} />
  );
};