"use client";

// components/FormBuild/ComponentRegistry.tsx
import { ComponentRegistryType } from './types';

// Importações dos componentes básicos
import { Container } from './components/Container';
import { TextField } from './components/TextField';
import { SelectField } from './components/SelectField';
import { CheckboxField } from './components/CheckboxField';
import { Button } from './components/Button';
import { Card } from './components/Card';
import { FormGroup } from './components/FormGroup';
import { Content } from './components/Content';
import { Icon } from './components/Icon';
import { ComboBox } from './components/ComboBox';

// Importações dos componentes de Sidebar
import { 
  Sidebar,
  SidebarProviderComponent,
  SidebarHeaderComponent,
  SidebarContentComponent,
  SidebarGroupComponent,
  SidebarGroupLabelComponent,
  SidebarGroupContentComponent,
  SidebarMenuComponent,
  SidebarMenuItemComponent,
  SidebarMenuButtonComponent,
  SidebarInputComponent,
  SidebarInsetComponent,
  SidebarRailComponent,
  SidebarTriggerComponent,
  SidebarSeparatorComponent
} from './components/Sidebar';

// Importações dos componentes de Breadcrumb e Separator
import {
  BreadcrumbComponent,
  BreadcrumbListComponent,
  BreadcrumbItemComponent,
  BreadcrumbLinkComponent,
  BreadcrumbPageComponent,
  BreadcrumbSeparatorComponent,
  SeparatorComponent
} from './components/Breadcrumb';

// Importações dos componentes de Dropdown
import {
  DropdownMenuComponent,
  DropdownMenuTriggerComponent,
  DropdownMenuContentComponent,
  DropdownMenuItemComponent
} from './components/Dropdown';

// Importação do componente Label
import { LabelComponent } from './components/Label';

// Registro de componentes mapeados por xtype
export const ComponentRegistry: ComponentRegistryType = {
  // Containers
  container: Container,
  card: Card,
  formGroup: FormGroup,
  
  // Form Fields
  textfield: TextField,
  select: SelectField,
  combobox: ComboBox,
  checkbox: CheckboxField,
  
  // Actions
  button: Button,
  
  // Content
  content: Content,
  text: Content, // Alias para facilitar o uso
  html: Content, // Alias para facilitar o uso
  
  // UI Elements
  icon: Icon,
  
  // Sidebar Components
  sidebarProvider: SidebarProviderComponent,
  sidebar: Sidebar,
  sidebarHeader: SidebarHeaderComponent,
  sidebarContent: SidebarContentComponent,
  sidebarGroup: SidebarGroupComponent,
  sidebarGroupLabel: SidebarGroupLabelComponent,
  sidebarGroupContent: SidebarGroupContentComponent,
  sidebarMenu: SidebarMenuComponent,
  sidebarMenuItem: SidebarMenuItemComponent,
  sidebarMenuButton: SidebarMenuButtonComponent,
  sidebarInput: SidebarInputComponent,
  sidebarInset: SidebarInsetComponent,
  sidebarRail: SidebarRailComponent,
  sidebarTrigger: SidebarTriggerComponent,
  sidebarSeparator: SidebarSeparatorComponent,
  
  // Breadcrumb Components
  breadcrumb: BreadcrumbComponent,
  breadcrumbList: BreadcrumbListComponent,
  breadcrumbItem: BreadcrumbItemComponent,
  breadcrumbLink: BreadcrumbLinkComponent,
  breadcrumbPage: BreadcrumbPageComponent,
  breadcrumbSeparator: BreadcrumbSeparatorComponent,
  separator: SeparatorComponent,
  
  // Dropdown Components
  dropdownMenu: DropdownMenuComponent,
  dropdownMenuTrigger: DropdownMenuTriggerComponent,
  dropdownMenuContent: DropdownMenuContentComponent,
  dropdownMenuItem: DropdownMenuItemComponent,
  
  // Label Component
  label: LabelComponent
};

// Função para registrar novos componentes dinamicamente
export const registerComponent = (xtype: string, Component: React.ComponentType<any>) => {
  ComponentRegistry[xtype] = Component;
};