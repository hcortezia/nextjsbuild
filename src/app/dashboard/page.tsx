"use client";

// app/(dashboard)/page-builder/page.tsx
import { useState } from 'react';
import { FormBuild } from '../components_build/FormBuild/FormBuild';
import { ComponentConfig } from '../components_build/FormBuild/types';

interface Field {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'select' | 'fileUpload';
  required?: boolean;
  url?: string;
  multiple?: boolean;
}

// Defina tipos para cada tipo de tela
interface DataGridScreen {
  title: string;
  type: "dataGrid";
  url: string;
  columns: any[];
  actions: any[];
}

interface FormScreen {
  title: string;
  type: "form";
  submitUrl: string;
  fields: Field[];
}

type Screen = DataGridScreen | FormScreen;

// Simulando dados de configuração que poderiam vir de uma API
const pageConfig = {
  title: "Gerenciamento de Produtos",
  modules: [
    {
      title: "Produtos",
      icon: "package",
      items: [
        { id: "list", title: "Lista de Produtos", icon: "list" },
        { id: "add", title: "Adicionar Produto", icon: "plus-circle" },
        { id: "categories", title: "Categorias", icon: "tag" }
      ]
    },
    {
      title: "Vendas",
      icon: "shopping-cart",
      items: [
        { id: "orders", title: "Pedidos", icon: "file-text" },
        { id: "invoices", title: "Notas Fiscais", icon: "file" }
      ]
    },
    {
      title: "Relatórios",
      icon: "bar-chart",
      items: [
        { id: "sales", title: "Vendas por Período", icon: "trending-up" },
        { id: "inventory", title: "Estoque", icon: "box" }
      ]
    }
  ],
  screens: {
    "list": {
      title: "Lista de Produtos",
      type: "dataGrid",
      url: "/api/products",
      columns: [
        { field: "id", headerName: "ID", width: 70 },
        { field: "name", headerName: "Nome", width: 200 },
        { field: "price", headerName: "Preço", width: 120, type: "currency" },
        { field: "category", headerName: "Categoria", width: 150 },
        { field: "stock", headerName: "Estoque", width: 100, type: "number" }
      ],
      actions: [
        { id: "view", label: "Ver", icon: "eye" },
        { id: "edit", label: "Editar", icon: "edit" },
        { id: "delete", label: "Excluir", icon: "trash", variant: "destructive" }
      ]
    },
    "add": {
      title: "Adicionar Produto",
      type: "form",
      submitUrl: "/api/products",
      fields: [
        { name: "name", label: "Nome", type: "text", required: true },
        { name: "description", label: "Descrição", type: "textarea" },
        { name: "price", label: "Preço", type: "number", required: true },
        { name: "category", label: "Categoria", type: "select", url: "/api/categories" },
        { name: "stock", label: "Estoque Inicial", type: "number", required: true },
        { name: "images", label: "Imagens", type: "fileUpload", multiple: true }
      ]
    }
  }
};

type ScreenId = keyof typeof pageConfig.screens;

export default function PageBuilder() {
  const [activeModule, setActiveModule] = useState("list");
  const [pageData, setPageData] = useState({});

  const handleChange = (name: string, value: any) => {
    setPageData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (data: Record<string, any>) => {
    console.log('Dados enviados:', data);
    alert('Operação realizada com sucesso!');
  };

  // Função para converter a configuração de tela em ComponentConfig
  const buildScreenConfig = (screenId: ScreenId): ComponentConfig => {
    const screen = pageConfig.screens[screenId];
    
    if (!screen) {
      return {
        xtype: 'container',
        items: [
          {
            xtype: 'content',
            variant: 'h2',
            text: 'Tela não encontrada',
            size: 'xl',
            className: 'text-red-500'
          }
        ]
      };
    }
    
    // Construir tela de tipo dataGrid
    if (screen.type === 'dataGrid') {
      const dataGridScreen = screen as DataGridScreen;
      return {
        xtype: 'container',
        layout: 'vertical',
        gap: 'lg',
        items: [
          {
            xtype: 'content',
            variant: 'h2',
            text: dataGridScreen.title,
            size: '2xl',
            weight: 'bold',
            className: 'mb-4'
          },
          {
            xtype: 'card',
            className: 'shadow-sm',
            items: [
              {
                xtype: 'content',
                text: 'Tabela de dados seria renderizada aqui',
                className: 'p-4 bg-gray-50 rounded'
              },
              {
                xtype: 'container',
                className: 'bg-gray-50 p-4 rounded border',
                items: [
                  {
                    xtype: 'content',
                    text: JSON.stringify(dataGridScreen.columns, null, 2),
                    variant: 'pre',
                    className: 'text-xs text-gray-600'
                  }
                ]
              }
            ]
          }
        ]
      };
    }
    
    // Construir tela de tipo formulário
    if (screen.type === 'form') {
      const fields = (screen as any).fields;
      return {
        xtype: 'container',
        layout: 'vertical',
        gap: 'lg',
        items: [
          {
            xtype: 'content',
            variant: 'h2',
            text: screen.title,
            size: '2xl',
            weight: 'bold',
            className: 'mb-4'
          },
          {
            xtype: 'card',
            className: 'shadow-sm',
            items: [
              {
                xtype: 'container',
                layout: 'vertical',
                gap: 'md',
                className: 'p-2',
                items: fields.map((field: Field) => {
                  const fieldTypeMap = {
                    'text': 'textfield',
                    'textarea': 'textfield',
                    'number': 'textfield',
                    'select': 'combobox',
                    'fileUpload': 'fileUpload'
                  };
                  
                  const baseConfig = {
                    xtype: fieldTypeMap[field.type] || 'textfield',
                    name: field.name,
                    label: field.label,
                    required: field.required
                  };
                  
                  // Adicionar configurações específicas baseadas no tipo
                  if (field.type === 'number') {
                    return {
                      ...baseConfig,
                      type: 'number'
                    };
                  } else if (field.type === 'select') {
                    return {
                      ...baseConfig,
                      url: field.url,
                      loadOnOpen: true
                    };
                  } else if (field.type === 'fileUpload') {
                    return {
                      ...baseConfig,
                      multiple: field.multiple
                    };
                  }
                  
                  return baseConfig;
                })
              }
            ],
            footer: true,
            footerContent: {
              xtype: 'container',
              layout: 'horizontal',
              gap: 'sm',
              className: 'justify-end',
              items: [
                {
                  xtype: 'button',
                  text: 'Cancelar',
                  variant: 'outline'
                },
                {
                  xtype: 'button',
                  text: 'Salvar',
                  type: 'submit'
                }
              ]
            }
          }
        ]
      };
    }
    
    // Tela genérica para tipos não reconhecidos
    return {
      xtype: 'container',
      items: [
        {
          xtype: 'content',
          variant: 'h2',
          text: screen.title,
          size: 'xl'
        },
        {
          xtype: 'content',
          text: `Tipo de tela "${screen.type}" não implementado.`,
          className: 'text-yellow-600'
        }
      ]
    };
  };

  // Construir a configuração completa da página
  const pageBuilderConfig: ComponentConfig = {
    xtype: 'container',
    layout: 'vertical',
    gap: 'md',
    className: 'w-full',
    items: [
      // Cabeçalho da página
      {
        xtype: 'container',
        className: 'mb-6',
        items: [
          {
            xtype: 'content',
            variant: 'h1',
            text: pageConfig.title,
            size: '3xl',
            weight: 'bold'
          }
        ]
      },
      // Layout principal (menu lateral + conteúdo)
      {
        xtype: 'container',
        layout: 'horizontal',
        gap: 'lg',
        className: 'w-full',
        items: [
          // Menu lateral
          {
            xtype: 'container',
            layout: 'vertical',
            gap: 'md',
            className: 'w-64 shrink-0',
            items: pageConfig.modules.map(module => ({
              xtype: 'container',
              layout: 'vertical',
              gap: 'sm',
              className: 'mb-4',
              items: [
                {
                  xtype: 'content',
                  variant: 'h3',
                  text: module.title,
                  size: 'lg',
                  weight: 'semibold',
                  className: 'flex items-center gap-2',
                  items: [
                    {
                      xtype: 'icon',
                      name: module.icon,
                      size: 18,
                      className: 'text-gray-600'
                    }
                  ]
                },
                ...module.items.map(item => ({
                  xtype: 'button',
                  text: item.title,
                  variant: activeModule === item.id ? 'default' : 'ghost',
                  className: 'justify-start',
                  onClick: () => setActiveModule(item.id),
                  items: [
                    {
                      xtype: 'icon',
                      name: item.icon,
                      size: 16,
                      className: 'mr-2'
                    }
                  ]
                }))
              ]
            }))
          },
          // Conteúdo principal (baseado no módulo ativo)
          {
            xtype: 'container',
            className: 'flex-1 p-4 border rounded-lg',
            items: [
              buildScreenConfig(activeModule as ScreenId)
            ]
          }
        ]
      }
    ]
  };

  return (
    <FormBuild
      config={pageBuilderConfig}
      data={pageData}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}