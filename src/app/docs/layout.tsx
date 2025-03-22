"use client";

// app/(docs)/layout.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { FormBuild } from '../components_build/FormBuild/FormBuild';
import { ComponentConfig } from '../components_build/FormBuild/types';

// Lista de componentes para a documentação
const components = [
  // Containers
  { id: "container", name: "Container", category: "Containers" },
  { id: "card", name: "Card", category: "Containers" },
  { id: "formGroup", name: "FormGroup", category: "Containers" },
  
  // Form Fields
  { id: "textfield", name: "TextField", category: "Form Fields" },
  { id: "select", name: "Select", category: "Form Fields" },
  { id: "combobox", name: "ComboBox", category: "Form Fields" },
  { id: "checkbox", name: "Checkbox", category: "Form Fields" },
  
  // UI Elements
  { id: "content", name: "Content", category: "UI Elements" },
  { id: "icon", name: "Icon", category: "UI Elements" },
  { id: "button", name: "Button", category: "UI Elements" },
  
  // Layout Components
  { id: "sidebar", name: "Sidebar", category: "Layout Components" },
  { id: "breadcrumb", name: "Breadcrumb", category: "Layout Components" },
  
  // Advanced Usage
  { id: "page-builder", name: "PageBuilder", category: "Advanced Usage" },
  { id: "form-validation", name: "Form Validation", category: "Advanced Usage" },
];

// Agrupar componentes por categoria
const groupedComponents = components.reduce((acc, component) => {
  if (!acc[component.category]) {
    acc[component.category] = [];
  }
  acc[component.category].push(component);
  return acc;
}, {} as Record<string, typeof components>);

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Função para navegar programaticamente
  const navigateTo = (path: string) => {
    router.push(path);
  };
  
  // Configuração da barra lateral da documentação
  const docsNavConfig: ComponentConfig = {
    xtype: 'container',
    className: 'w-64 border-r h-screen p-4 overflow-auto',
    layout: 'vertical',
    gap: 'md',
    items: [
      {
        xtype: 'container',
        className: 'mb-6 cursor-pointer',
        onClick: () => navigateTo('/docs'),
        items: [
          {
            xtype: 'content',
            variant: 'h1',
            text: 'FormBuild',
            size: '2xl',
            weight: 'bold'
          },
          {
            xtype: 'content',
            variant: 'p',
            text: 'Documentação dos componentes',
            className: 'text-gray-500 mt-1'
          }
        ]
      },
      ...Object.entries(groupedComponents).map(([category, categoryComponents]) => ({
        xtype: 'container',
        layout: 'vertical',
        gap: 'sm',
        className: 'mb-4',
        items: [
          {
            xtype: 'content',
            variant: 'h2',
            text: category,
            size: 'lg',
            weight: 'semibold',
            className: 'text-gray-700'
          },
          ...categoryComponents.map(component => ({
            xtype: 'container',
            className: `p-2 rounded transition cursor-pointer ${isClient && pathname === `/docs/${component.id}` 
              ? 'bg-blue-50 text-blue-700 font-medium' 
              : 'hover:bg-gray-50'
            }`,
            onClick: () => navigateTo(`/docs/${component.id}`),
            items: [
              {
                xtype: 'content',
                text: component.name
              }
            ]
          }))
        ]
      }))
    ]
  };

  return (
    <div className="flex min-h-screen">
      {/* Barra lateral de navegação */}
      <FormBuild config={docsNavConfig} />
      
      {/* Conteúdo principal */}
      <div className="flex-1 p-8 overflow-auto">
        {children}
      </div>
    </div>
  );
}