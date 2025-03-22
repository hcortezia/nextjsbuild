"use client";

// app/(docs)/docs/[componentId]/page.tsx
import { useState } from 'react';
import { FormBuild } from '../../components_build/FormBuild/FormBuild';
import { ComponentConfig } from '../../components_build/FormBuild/types';
import { notFound } from 'next/navigation';

// Definição dos componentes e seus exemplos
const componentDocs = {

    // Adicione isto ao objeto componentDocs no arquivo app/(docs)/docs/[componentId]/page.tsx

// FormGroup
formGroup: {
    title: "FormGroup",
    description: "Componente para agrupar elementos de formulário com label, descrição e mensagens de erro.",
    props: [
      { name: "className", type: "string", description: "Classes CSS adicionais" },
      { name: "items", type: "ComponentConfig[]", description: "Componentes filhos" }
    ],
    examples: [
      {
        title: "FormGroup Básico",
        description: "Grupo simples de elementos de formulário",
        config: {
          xtype: 'formGroup',
          className: 'max-w-md p-4 border rounded',
          items: [
            {
              xtype: 'content',
              variant: 'h3',
              text: 'Informações de Contato',
              size: 'lg',
              weight: 'semibold',
              className: 'mb-4'
            },
            {
              xtype: 'textfield',
              name: 'name',
              label: 'Nome Completo',
              placeholder: 'Digite seu nome completo'
            },
            {
              xtype: 'textfield',
              name: 'email',
              label: 'Email',
              type: 'email',
              placeholder: 'seu@email.com'
            }
          ]
        }
      },
      {
        title: "Múltiplos FormGroups",
        description: "Forma de organizar formulários complexos em seções",
        config: {
          xtype: 'container',
          layout: 'vertical',
          gap: 'lg',
          className: 'max-w-md',
          items: [
            {
              xtype: 'formGroup',
              className: 'p-4 border rounded bg-gray-50',
              items: [
                {
                  xtype: 'content',
                  variant: 'h3',
                  text: 'Informações Pessoais',
                  size: 'lg',
                  weight: 'semibold',
                  className: 'mb-4'
                },
                {
                  xtype: 'textfield',
                  name: 'name',
                  label: 'Nome Completo',
                  placeholder: 'Digite seu nome completo'
                },
                {
                  xtype: 'textfield',
                  name: 'birthdate',
                  label: 'Data de Nascimento',
                  type: 'date'
                }
              ]
            },
            {
              xtype: 'formGroup',
              className: 'p-4 border rounded bg-gray-50',
              items: [
                {
                  xtype: 'content',
                  variant: 'h3',
                  text: 'Endereço',
                  size: 'lg',
                  weight: 'semibold',
                  className: 'mb-4'
                },
                {
                  xtype: 'textfield',
                  name: 'street',
                  label: 'Rua',
                  placeholder: 'Digite sua rua'
                },
                {
                  xtype: 'textfield',
                  name: 'city',
                  label: 'Cidade',
                  placeholder: 'Digite sua cidade'
                }
              ]
            }
          ]
        }
      }
    ]
  },
  
  // Select
  select: {
    title: "Select",
    description: "Campo de seleção baseado no Shadcn UI Select.",
    props: [
      { name: "name", type: "string", description: "Nome do campo para identificação no formulário" },
      { name: "label", type: "string", description: "Label do campo" },
      { name: "placeholder", type: "string", description: "Texto de placeholder" },
      { name: "options", type: "{ value: string, label: string }[]", description: "Opções para seleção" },
      { name: "required", type: "boolean", description: "Se o campo é obrigatório" },
      { name: "description", type: "string", description: "Texto de descrição/ajuda" },
      { name: "className", type: "string", description: "Classes CSS adicionais" }
    ],
    examples: [
      {
        title: "Select Básico",
        description: "Campo de seleção com opções estáticas",
        config: {
          xtype: 'container',
          className: 'max-w-md p-4 border rounded',
          items: [
            {
              xtype: 'select',
              name: 'country',
              label: 'País',
              placeholder: 'Selecione um país',
              options: [
                { value: 'br', label: 'Brasil' },
                { value: 'us', label: 'Estados Unidos' },
                { value: 'ca', label: 'Canadá' },
                { value: 'fr', label: 'França' },
                { value: 'jp', label: 'Japão' }
              ]
            }
          ]
        }
      },
      {
        title: "Select com Descrição",
        description: "Campo de seleção com texto de ajuda",
        config: {
          xtype: 'container',
          className: 'max-w-md p-4 border rounded',
          items: [
            {
              xtype: 'select',
              name: 'plan',
              label: 'Plano de Assinatura',
              placeholder: 'Selecione um plano',
              description: 'Você pode alterar seu plano a qualquer momento',
              options: [
                { value: 'basic', label: 'Básico' },
                { value: 'pro', label: 'Profissional' },
                { value: 'enterprise', label: 'Empresarial' }
              ]
            }
          ]
        }
      }
    ]
  },
  
  // Checkbox
  checkbox: {
    title: "Checkbox",
    description: "Campo de checkbox baseado no Shadcn UI Checkbox.",
    props: [
      { name: "name", type: "string", description: "Nome do campo para identificação no formulário" },
      { name: "label", type: "string", description: "Label do checkbox" },
      { name: "description", type: "string", description: "Texto de descrição/ajuda" },
      { name: "className", type: "string", description: "Classes CSS adicionais" }
    ],
    examples: [
      {
        title: "Checkbox Básico",
        description: "Checkbox com label simples",
        config: {
          xtype: 'container',
          className: 'max-w-md p-4 border rounded',
          items: [
            {
              xtype: 'checkbox',
              name: 'terms',
              label: 'Concordo com os termos e condições'
            }
          ]
        }
      },
      {
        title: "Múltiplos Checkboxes",
        description: "Grupo de checkboxes para seleção múltipla",
        config: {
          xtype: 'container',
          layout: 'vertical',
          gap: 'sm',
          className: 'max-w-md p-4 border rounded',
          items: [
            {
              xtype: 'content',
              variant: 'h3',
              text: 'Interesses',
              size: 'lg',
              weight: 'semibold',
              className: 'mb-2'
            },
            {
              xtype: 'checkbox',
              name: 'tech',
              label: 'Tecnologia'
            },
            {
              xtype: 'checkbox',
              name: 'sports',
              label: 'Esportes'
            },
            {
              xtype: 'checkbox',
              name: 'music',
              label: 'Música'
            },
            {
              xtype: 'checkbox',
              name: 'travel',
              label: 'Viagens'
            }
          ]
        }
      }
    ]
  },
  
  // Content
  content: {
    title: "Content",
    description: "Componente para renderizar conteúdo de texto ou HTML sem precisar escrever JSX diretamente.",
    props: [
      { name: "text", type: "string", description: "Texto a ser exibido" },
      { name: "html", type: "string", description: "Conteúdo HTML a ser renderizado" },
      { name: "variant", type: "'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'span' | 'div' | 'pre'", description: "Tipo de elemento HTML a ser renderizado" },
      { name: "align", type: "'left' | 'center' | 'right' | 'justify'", description: "Alinhamento do texto" },
      { name: "size", type: "'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'", description: "Tamanho do texto" },
      { name: "weight", type: "'normal' | 'medium' | 'semibold' | 'bold'", description: "Peso da fonte" },
      { name: "color", type: "string", description: "Cor do texto" },
      { name: "className", type: "string", description: "Classes CSS adicionais" }
    ],
    examples: [
      {
        title: "Variantes de Texto",
        description: "Diferentes tipos de elementos de texto",
        config: {
          xtype: 'container',
          layout: 'vertical',
          gap: 'md',
          className: 'p-4 border rounded',
          items: [
            {
              xtype: 'content',
              variant: 'h1',
              text: 'Título H1',
              size: '3xl',
              weight: 'bold'
            },
            {
              xtype: 'content',
              variant: 'h2',
              text: 'Título H2',
              size: '2xl',
              weight: 'semibold'
            },
            {
              xtype: 'content',
              variant: 'h3',
              text: 'Título H3',
              size: 'xl',
              weight: 'medium'
            },
            {
              xtype: 'content',
              variant: 'p',
              text: 'Este é um parágrafo normal com texto comum. Os parágrafos são úteis para blocos de texto mais longos que contêm informações detalhadas para o usuário.',
              className: 'text-gray-600'
            }
          ]
        }
      },
      {
        title: "Alinhamento e Formatação",
        description: "Diferentes alinhamentos e formatações de texto",
        config: {
          xtype: 'container',
          layout: 'vertical',
          gap: 'md',
          className: 'p-4 border rounded',
          items: [
            {
              xtype: 'content',
              variant: 'p',
              text: 'Texto alinhado à esquerda (padrão)',
              align: 'left'
            },
            {
              xtype: 'content',
              variant: 'p',
              text: 'Texto centralizado',
              align: 'center'
            },
            {
              xtype: 'content',
              variant: 'p',
              text: 'Texto alinhado à direita',
              align: 'right'
            },
            {
              xtype: 'content',
              variant: 'p',
              text: 'Texto justificado que se estende por várias linhas para mostrar o efeito de justificação no texto. Observe como as linhas são esticadas para preencher toda a largura disponível.',
              align: 'justify'
            }
          ]
        }
      },
      {
        title: "Conteúdo HTML",
        description: "Renderizando HTML diretamente",
        config: {
          xtype: 'container',
          className: 'p-4 border rounded',
          items: [
            {
              xtype: 'content',
              html: '<p>Você pode <strong>formatar</strong> seu texto usando <em>HTML</em> diretamente.</p><p>Inclusive criar <a href="#" class="text-blue-600 hover:underline">links</a> e listas:</p><ul class="list-disc pl-5 mt-2"><li>Item 1</li><li>Item 2</li><li>Item 3</li></ul>'
            }
          ]
        }
      }
    ]
  },
  
  // Icon
  icon: {
    title: "Icon",
    description: "Componente para renderizar ícones do Lucide sem precisar importá-los manualmente.",
    props: [
      { name: "name", type: "string", description: "Nome do ícone do Lucide (como 'check', 'user', 'home')" },
      { name: "size", type: "number | string", description: "Tamanho em pixels" },
      { name: "color", type: "string", description: "Cor em hexadecimal ou nome de cor" },
      { name: "strokeWidth", type: "number", description: "Espessura da linha" },
      { name: "className", type: "string", description: "Classes CSS adicionais" }
    ],
    examples: [
      {
        title: "Ícones Básicos",
        description: "Exemplos de ícones comuns",
        config: {
          xtype: 'container',
          layout: 'horizontal',
          gap: 'lg',
          className: 'p-4 border rounded flex-wrap',
          items: [
            {
              xtype: 'icon',
              name: 'home',
              size: 24
            },
            {
              xtype: 'icon',
              name: 'settings',
              size: 24
            },
            {
              xtype: 'icon',
              name: 'user',
              size: 24
            },
            {
              xtype: 'icon',
              name: 'mail',
              size: 24
            },
            {
              xtype: 'icon',
              name: 'heart',
              size: 24
            },
            {
              xtype: 'icon',
              name: 'check',
              size: 24
            }
          ]
        }
      },
      {
        title: "Customização de Ícones",
        description: "Ícones com cores e tamanhos personalizados",
        config: {
          xtype: 'container',
          layout: 'horizontal',
          gap: 'lg',
          className: 'p-4 border rounded flex-wrap items-center',
          items: [
            {
              xtype: 'icon',
              name: 'check-circle',
              size: 16,
              color: '#22c55e'
            },
            {
              xtype: 'icon',
              name: 'check-circle',
              size: 24,
              color: '#22c55e'
            },
            {
              xtype: 'icon',
              name: 'check-circle',
              size: 32,
              color: '#22c55e'
            },
            {
              xtype: 'icon',
              name: 'alert-circle',
              size: 24,
              color: '#ef4444',
              strokeWidth: 2.5
            },
            {
              xtype: 'icon',
              name: 'info',
              size: 24,
              color: '#3b82f6',
              className: 'ml-4'
            }
          ]
        }
      },
      {
        title: "Ícones com Texto",
        description: "Combinando ícones com texto",
        config: {
          xtype: 'container',
          layout: 'vertical',
          gap: 'md',
          className: 'p-4 border rounded',
          items: [
            {
              xtype: 'container',
              layout: 'horizontal',
              className: 'items-center',
              gap: 'sm',
              items: [
                {
                  xtype: 'icon',
                  name: 'alert-triangle',
                  size: 20,
                  color: '#f59e0b'
                },
                {
                  xtype: 'content',
                  text: 'Atenção: isto é um aviso importante',
                  className: 'font-medium'
                }
              ]
            },
            {
              xtype: 'container',
              layout: 'horizontal',
              className: 'items-center',
              gap: 'sm',
              items: [
                {
                  xtype: 'icon',
                  name: 'check-circle',
                  size: 20,
                  color: '#10b981'
                },
                {
                  xtype: 'content',
                  text: 'Operação concluída com sucesso',
                  className: 'font-medium'
                }
              ]
            }
          ]
        }
      }
    ]
  },
  
  // Button
  button: {
    title: "Button",
    description: "Botão baseado no Shadcn UI Button.",
    props: [
      { name: "text", type: "string", description: "Texto do botão" },
      { name: "type", type: "'button' | 'submit' | 'reset'", description: "Tipo HTML do botão" },
      { name: "variant", type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'", description: "Variante visual do botão" },
      { name: "size", type: "'default' | 'sm' | 'lg' | 'icon'", description: "Tamanho do botão" },
      { name: "onClick", type: "() => void", description: "Função a ser chamada quando o botão for clicado" },
      { name: "className", type: "string", description: "Classes CSS adicionais" },
      { name: "items", type: "ComponentConfig[]", description: "Componentes filhos (para botões com ícones)" }
    ],
    examples: [
      {
        title: "Variantes de Botões",
        description: "Diferentes estilos de botões",
        config: {
          xtype: 'container',
          layout: 'horizontal',
          gap: 'md',
          className: 'p-4 border rounded flex-wrap',
          items: [
            {
              xtype: 'button',
              text: 'Default',
              variant: 'default'
            },
            {
              xtype: 'button',
              text: 'Destructive',
              variant: 'destructive'
            },
            {
              xtype: 'button',
              text: 'Outline',
              variant: 'outline'
            },
            {
              xtype: 'button',
              text: 'Secondary',
              variant: 'secondary'
            },
            {
              xtype: 'button',
              text: 'Ghost',
              variant: 'ghost'
            },
            {
              xtype: 'button',
              text: 'Link',
              variant: 'link'
            }
          ]
        }
      },
      {
        title: "Tamanhos de Botões",
        description: "Diferentes tamanhos de botões",
        config: {
          xtype: 'container',
          layout: 'horizontal',
          gap: 'md',
          className: 'p-4 border rounded items-center',
          items: [
            {
              xtype: 'button',
              text: 'Small',
              size: 'sm'
            },
            {
              xtype: 'button',
              text: 'Default',
              size: 'default'
            },
            {
              xtype: 'button',
              text: 'Large',
              size: 'lg'
            }
          ]
        }
      },
      {
        title: "Botões com Ícones",
        description: "Botões com ícones e texto",
        config: {
          xtype: 'container',
          layout: 'horizontal',
          gap: 'md',
          className: 'p-4 border rounded',
          items: [
            {
              xtype: 'button',
              variant: 'default',
              items: [
                {
                  xtype: 'icon',
                  name: 'plus',
                  size: 16,
                  className: 'mr-2'
                },
                {
                  xtype: 'content',
                  variant: 'span',
                  text: 'Adicionar'
                }
              ]
            },
            {
              xtype: 'button',
              variant: 'outline',
              items: [
                {
                  xtype: 'icon',
                  name: 'trash',
                  size: 16,
                  className: 'mr-2'
                },
                {
                  xtype: 'content',
                  variant: 'span',
                  text: 'Remover'
                }
              ]
            },
            {
              xtype: 'button',
              variant: 'secondary',
              items: [
                {
                  xtype: 'content',
                  variant: 'span',
                  text: 'Download'
                },
                {
                  xtype: 'icon',
                  name: 'download',
                  size: 16,
                  className: 'ml-2'
                }
              ]
            }
          ]
        }
      }
    ]
  },
  
  // Sidebar
  sidebar: {
    title: "Sidebar",
    description: "Componente de barra lateral para navegação baseado no Shadcn UI Sidebar.",
    props: [
      { name: "items", type: "ComponentConfig[]", description: "Componentes filhos a serem renderizados dentro da sidebar" },
      { name: "className", type: "string", description: "Classes CSS adicionais" }
    ],
    examples: [
      {
        title: "Sidebar Básica",
        description: "Exemplo simplificado de sidebar com navegação",
        config: {
          xtype: 'container',
          className: 'border rounded-lg overflow-hidden flex h-96',
          items: [
            {
              xtype: 'container',
              className: 'w-64 bg-gray-50 p-4 border-r',
              layout: 'vertical',
              gap: 'md',
              items: [
                {
                  xtype: 'content',
                  variant: 'h2',
                  text: 'Navegação',
                  size: 'xl',
                  weight: 'bold',
                  className: 'mb-4'
                },
                {
                  xtype: 'container',
                  layout: 'vertical',
                  gap: 'sm',
                  items: [
                    {
                      xtype: 'button',
                      variant: 'ghost',
                      className: 'justify-start bg-blue-50 text-blue-700',
                      items: [
                        {
                          xtype: 'icon',
                          name: 'home',
                          size: 16,
                          className: 'mr-2'
                        },
                        {
                          xtype: 'content',
                          variant: 'span',
                          text: 'Dashboard'
                        }
                      ]
                    },
                    {
                      xtype: 'button',
                      variant: 'ghost',
                      className: 'justify-start',
                      items: [
                        {
                          xtype: 'icon',
                          name: 'users',
                          size: 16,
                          className: 'mr-2'
                        },
                        {
                          xtype: 'content',
                          variant: 'span',
                          text: 'Usuários'
                        }
                      ]
                    },
                    {
                      xtype: 'button',
                      variant: 'ghost',
                      className: 'justify-start',
                      items: [
                        {
                          xtype: 'icon',
                          name: 'settings',
                          size: 16,
                          className: 'mr-2'
                        },
                        {
                          xtype: 'content',
                          variant: 'span',
                          text: 'Configurações'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              xtype: 'container',
              className: 'flex-1 p-4',
              items: [
                {
                  xtype: 'content',
                  variant: 'h1',
                  text: 'Conteúdo Principal',
                  size: '2xl',
                  weight: 'bold',
                  className: 'mb-4'
                },
                {
                  xtype: 'content',
                  variant: 'p',
                  text: 'Este é o conteúdo principal da página, que é exibido ao lado da sidebar.'
                }
              ]
            }
          ]
        }
      },
      {
        title: "Sidebar com Grupos",
        description: "Sidebar com itens agrupados por categorias",
        config: {
          xtype: 'container',
          className: 'border rounded-lg overflow-hidden flex h-96',
          items: [
            {
              xtype: 'container',
              className: 'w-64 bg-gray-50 p-4 border-r',
              layout: 'vertical',
              gap: 'md',
              items: [
                {
                  xtype: 'content',
                  variant: 'h2',
                  text: 'Painel Admin',
                  size: 'xl',
                  weight: 'bold',
                  className: 'mb-4'
                },
                // Grupo 1
                {
                  xtype: 'container',
                  layout: 'vertical',
                  gap: 'sm',
                  className: 'mb-4',
                  items: [
                    {
                      xtype: 'content',
                      variant: 'span',
                      text: 'GERAL',
                      size: 'xs',
                      className: 'text-gray-500 font-semibold px-2'
                    },
                    {
                      xtype: 'button',
                      variant: 'ghost',
                      className: 'justify-start',
                      items: [
                        {
                          xtype: 'icon',
                          name: 'home',
                          size: 16,
                          className: 'mr-2'
                        },
                        {
                          xtype: 'content',
                          variant: 'span',
                          text: 'Dashboard'
                        }
                      ]
                    },
                    {
                      xtype: 'button',
                      variant: 'ghost',
                      className: 'justify-start',
                      items: [
                        {
                          xtype: 'icon',
                          name: 'bar-chart',
                          size: 16,
                          className: 'mr-2'
                        },
                        {
                          xtype: 'content',
                          variant: 'span',
                          text: 'Relatórios'
                        }
                      ]
                    }
                  ]
                },
                // Separador
                {
                  xtype: 'container',
                  className: 'h-px bg-gray-200 my-2'
                },
                // Grupo 2
                {
                  xtype: 'container',
                  layout: 'vertical',
                  gap: 'sm',
                  className: 'mb-4',
                  items: [
                    {
                      xtype: 'content',
                      variant: 'span',
                      text: 'GERENCIAMENTO',
                      size: 'xs',
                      className: 'text-gray-500 font-semibold px-2'
                    },
                    {
                      xtype: 'button',
                      variant: 'ghost',
                      className: 'justify-start',
                      items: [
                        {
                          xtype: 'icon',
                          name: 'users',
                          size: 16,
                          className: 'mr-2'
                        },
                        {
                          xtype: 'content',
                          variant: 'span',
                          text: 'Usuários'
                        }
                      ]
                    },
                    {
                      xtype: 'button',
                      variant: 'ghost',
                      className: 'justify-start',
                      items: [
                        {
                          xtype: 'icon',
                          name: 'package',
                          size: 16,
                          className: 'mr-2'
                        },
                        {
                          xtype: 'content',
                          variant: 'span',
                          text: 'Produtos'
                        }
                      ]
                    }
                  ]
                }
              ]
            },
            {
              xtype: 'container',
              className: 'flex-1 p-4',
              items: [
                {
                  xtype: 'content',
                  variant: 'h1',
                  text: 'Conteúdo Principal',
                  size: '2xl',
                  weight: 'bold',
                  className: 'mb-4'
                },
                {
                  xtype: 'content',
                  variant: 'p',
                  text: 'Este é o conteúdo principal da página, que é exibido ao lado da sidebar.'
                }
              ]
            }
          ]
        }
      }
    ]
  },
  
  // Breadcrumb
  breadcrumb: {
    title: "Breadcrumb",
    description: "Componente para navegação em hierarquia de páginas, baseado no Shadcn UI Breadcrumb.",
    props: [
      { name: "items", type: "ComponentConfig[]", description: "Componentes filhos a serem renderizados dentro do breadcrumb" },
      { name: "className", type: "string", description: "Classes CSS adicionais" }
    ],
    examples: [
      {
        title: "Breadcrumb Básico",
        description: "Navegação básica com breadcrumb",
        config: {
          xtype: 'container',
          className: 'p-4 border rounded',
          items: [
            {
              xtype: 'breadcrumb',
              items: [
                {
                  xtype: 'breadcrumbList',
                  items: [
                    {
                      xtype: 'breadcrumbItem',
                      items: [
                        {
                          xtype: 'breadcrumbLink',
                          href: '#',
                          text: 'Home'
                        }
                      ]
                    },
                    {
                      xtype: 'breadcrumbSeparator'
                    },
                    {
                      xtype: 'breadcrumbItem',
                      items: [
                        {
                          xtype: 'breadcrumbLink',
                          href: '#',
                          text: 'Documentação'
                        }
                      ]
                    },
                    {
                      xtype: 'breadcrumbSeparator'
                    },
                    {
                      xtype: 'breadcrumbItem',
                      items: [
                        {
                          xtype: 'breadcrumbPage',
                          text: 'Componentes'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      {
        title: "Breadcrumb com Ícones",
        description: "Breadcrumb avançado com ícones",
        config: {
          xtype: 'container',
          className: 'p-4 border rounded',
          items: [
            {
              xtype: 'breadcrumb',
              items: [
                {
                  xtype: 'breadcrumbList',
                  items: [
                    {
                      xtype: 'breadcrumbItem',
                      items: [
                        {
                          xtype: 'breadcrumbLink',
                          href: '#',
                          items: [
                            {
                              xtype: 'container',
                              layout: 'horizontal',
                              className: 'flex items-center',
                              items: [
                                {
                                  xtype: 'icon',
                                  name: 'home',
                                  size: 14,
                                  className: 'mr-1'
                                },
                                {
                                  xtype: 'content',
                                  text: 'Home',
                                  variant: 'span'
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      xtype: 'breadcrumbSeparator'
                    },
                    {
                      xtype: 'breadcrumbItem',
                      items: [
                        {
                          xtype: 'breadcrumbLink',
                          href: '#',
                          items: [
                            {
                              xtype: 'container',
                              layout: 'horizontal',
                              className: 'flex items-center',
                              items: [
                                {
                                  xtype: 'icon',
                                  name: 'users',
                                  size: 14,
                                  className: 'mr-1'
                                },
                                {
                                  xtype: 'content',
                                  text: 'Usuários',
                                  variant: 'span'
                                }
                              ]
                            }
                          ]
                        }
                      ]
                    },
                    {
                      xtype: 'breadcrumbSeparator'
                    },
                    {
                      xtype: 'breadcrumbItem',
                      items: [
                        {
                          xtype: 'breadcrumbPage',
                          text: 'Perfil de Usuário'
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    ]
  },
  
  // PageBuilder
  "page-builder": {
    title: "PageBuilder",
    description: "Exemplo avançado de como construir interfaces completas dinamicamente a partir de configurações JSON.",
    props: [
      { name: "config", type: "ComponentConfig", description: "Configuração completa da página" },
      { name: "data", type: "Record<string, any>", description: "Dados a serem exibidos na página" },
      { name: "onChange", type: "(name: string, value: any) => void", description: "Função chamada quando dados são alterados" },
      { name: "onSubmit", type: "(data: Record<string, any>) => void", description: "Função chamada quando o formulário é enviado" }
    ],
    examples: [
      {
        title: "Dashboard Simples",
        description: "Exemplo de um dashboard com cards de métricas",
        config: {
          xtype: 'container',
          layout: 'vertical',
          gap: 'lg',
          className: 'p-4 border rounded',
          items: [
            {
              xtype: 'content',
              variant: 'h1',
              text: 'Dashboard',
              size: '3xl',
              weight: 'bold',
              className: 'mb-4'
            },
            {
              xtype: 'container',
              layout: 'grid',
              columns: 3,
              gap: 'md',
              className: 'mb-6',
              items: [
                // Card 1
                {
                  xtype: 'card',
                  className: 'bg-white shadow-sm',
                  items: [
                    {
                      xtype: 'container',
                      className: 'flex items-center p-4',
                      items: [
                        {
                          xtype: 'container',
                          className: 'flex-1',
                          items: [
                            {
                              xtype: 'content',
                              variant: 'h3',
                              text: 'Total de Vendas',
                              weight: 'medium',
                              size: 'lg',
                              className: 'text-gray-700'
                            },
                            {
                              xtype: 'content',
                              variant: 'p',
                              text: 'R$ 25.350,00',
                              weight: 'bold',
                              size: '2xl',
                              className: 'text-gray-900'
                            },
                            {
                              xtype: 'content',
                              variant: 'p',
                              text: '+15% vs mês anterior',
                              size: 'sm',
                              className: 'text-green-600'
                            }
                          ]
                        },
                        {
                          xtype: 'container',
                          className: 'w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center',
                          items: [
                            {
                              xtype: 'icon',
                              name: 'shopping-cart',
                              size: 24,
                              color: '#3b82f6'
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                // Card 2
                {
                  xtype: 'card',
                  className: 'bg-white shadow-sm',
                  items: [
                    {
                      xtype: 'container',
                      className: 'flex items-center p-4',
                      items: [
                        {
                          xtype: 'container',
                          className: 'flex-1',
                          items: [
                            {
                              xtype: 'content',
                              variant: 'h3',
                              text: 'Novos Usuários',
                              weight: 'medium',
                              size: 'lg',
                              className: 'text-gray-700'
                            },
                            {
                              xtype: 'content',
                              variant: 'p',
                              text: '1.253',
                              weight: 'bold',
                              size: '2xl',
                              className: 'text-gray-900'
                            },
                            {
                              xtype: 'content',
                              variant: 'p',
                              text: '+8% vs mês anterior',
                              size: 'sm',
                              className: 'text-green-600'
                            }
                          ]
                        },
                        {
                          xtype: 'container',
                          className: 'w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center',
                          items: [
                            {
                              xtype: 'icon',
                              name: 'users',
                              size: 24,
                              color: '#8b5cf6'
                            }
                          ]
                        }
                      ]
                    }
                  ]
                },
                // Card 3
                {
                  xtype: 'card',
                  className: 'bg-white shadow-sm',
                  items: [
                    {
                      xtype: 'container',
                      className: 'flex items-center p-4',
                      items: [
                        {
                          xtype: 'container',
                          className: 'flex-1',
                          items: [
                            {
                              xtype: 'content',
                              variant: 'h3',
                              text: 'Pedidos',
                              weight: 'medium',
                              size: 'lg',
                              className: 'text-gray-700'
                            },
                            {
                              xtype: 'content',
                              variant: 'p',
                              text: '532',
                              weight: 'bold',
                              size: '2xl',
                              className: 'text-gray-900'
                            },
                            {
                              xtype: 'content',
                              variant: 'p',
                              text: '+12% vs mês anterior',
                              size: 'sm',
                              className: 'text-green-600'
                            }
                          ]
                        },
                        {
                          xtype: 'container',
                          className: 'w-12 h-12 rounded-full bg-green-100 flex items-center justify-center',
                          items: [
                            {
                              xtype: 'icon',
                              name: 'package',
                              size: 24,
                              color: '#10b981'
                            }
                          ]
                        }
                      ]
                    }
                  ]
                }
              ]
            }
          ]
        }
      },
      {
        title: "CRUD Interface",
        description: "Exemplo de interface de administração com tabela e formulário",
        config: {
          xtype: 'container',
          layout: 'vertical',
          gap: 'lg',
          className: 'p-4 border rounded',
          items: [
            {
              xtype: 'container',
              layout: 'horizontal',
              className: 'justify-between items-center mb-6',
              items: [
                {
                  xtype: 'content',
                  variant: 'h1',
                  text: 'Gerenciamento de Usuários',
                  size: '2xl',
                  weight: 'bold'
                },
                {
                  xtype: 'button',
                  variant: 'default',
                  items: [
                    {
                      xtype: 'icon',
                      name: 'plus',
                      size: 16,
                      className: 'mr-2'
                    },
                    {
                      xtype: 'content',
                      variant: 'span',
                      text: 'Adicionar Usuário'
                    }
                  ]
                }
              ]
            },
            {
              xtype: 'card',
              className: 'bg-white shadow-sm',
              items: [
                {
                  xtype: 'html',
                  html: `
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50">
                        <tr>
                          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Função</th>
                          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                              <div class="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full"></div>
                              <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">João Silva</div>
                              </div>
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-500">joao@example.com</div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-500">Admin</div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Ativo</span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="#" class="text-indigo-600 hover:text-indigo-900 mr-3">Editar</a>
                            <a href="#" class="text-red-600 hover:text-red-900">Excluir</a>
                          </td>
                        </tr>
                        <tr>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="flex items-center">
                              <div class="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full"></div>
                              <div class="ml-4">
                                <div class="text-sm font-medium text-gray-900">Maria Santos</div>
                              </div>
                            </div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-500">maria@example.com</div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <div class="text-sm text-gray-500">Usuário</div>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap">
                            <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Ativo</span>
                          </td>
                          <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <a href="#" class="text-indigo-600 hover:text-indigo-900 mr-3">Editar</a>
                            <a href="#" class="text-red-600 hover:text-red-900">Excluir</a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  `
                }
              ]
            }
          ]
        }
      }
    ]
  },
  
  // Form Validation
  "form-validation": {
    title: "Form Validation",
    description: "Exemplo de como implementar validação de formulários com o sistema FormBuild.",
    props: [
      { name: "rules", type: "Record<string, any>", description: "Regras de validação para os campos" },
      { name: "messages", type: "Record<string, string>", description: "Mensagens de erro personalizadas" }
    ],
    examples: [
      {
        title: "Validação Básica",
        description: "Formulário com validação de campos obrigatórios",
        config: {
          xtype: 'container',
          layout: 'vertical',
          gap: 'md',
          className: 'p-4 border rounded max-w-md',
          items: [
            {
              xtype: 'content',
              variant: 'h2',
              text: 'Formulário de Cadastro',
              size: 'xl',
              weight: 'bold',
              className: 'mb-4'
            },
            {
              xtype: 'textfield',
              name: 'username',
              label: 'Nome de usuário',
              placeholder: 'Digite seu nome de usuário',
              required: true,
              description: 'Campo obrigatório'
            },
            {
              xtype: 'textfield',
              name: 'email',
              label: 'Email',
              type: 'email',
              placeholder: 'exemplo@email.com',
              required: true,
              description: 'Insira um email válido'
            },
            {
              xtype: 'textfield',
              name: 'password',
              label: 'Senha',
              type: 'password',
              placeholder: '********',
              required: true,
              description: 'Mínimo de 8 caracteres'
            },
            {
              xtype: 'button',
              text: 'Cadastrar',
              type: 'submit',
              className: 'mt-4'
            }
          ]
        }
      },
      {
        title: "Validação Avançada",
        description: "Formulário com validações complexas e mensagens de erro personalizadas",
        config: {
          xtype: 'container',
          layout: 'vertical',
          gap: 'md',
          className: 'p-4 border rounded max-w-md',
          items: [
            {
              xtype: 'content',
              variant: 'h2',
              text: 'Formulário com Validação Avançada',
              size: 'xl',
              weight: 'bold',
              className: 'mb-4'
            },
            {
              xtype: 'textfield',
              name: 'fullName',
              label: 'Nome completo',
              placeholder: 'Digite seu nome completo',
              required: true,
              description: 'Informe seu nome e sobrenome'
            },
            {
              xtype: 'textfield',
              name: 'email',
              label: 'Email',
              type: 'email',
              placeholder: 'exemplo@email.com',
              required: true,
              description: 'Utilizamos seu email para contato'
            },
            {
              xtype: 'textfield',
              name: 'phone',
              label: 'Telefone',
              placeholder: '(00) 00000-0000',
              description: 'Formato: (00) 00000-0000'
            },
            {
              xtype: 'textfield',
              name: 'password',
              label: 'Senha',
              type: 'password',
              placeholder: '********',
              required: true,
              description: 'A senha deve conter letras, números e pelo menos 8 caracteres'
            },
            {
              xtype: 'textfield',
              name: 'confirmPassword',
              label: 'Confirmar senha',
              type: 'password',
              placeholder: '********',
              required: true,
              description: 'Repita a senha informada acima'
            },
            {
              xtype: 'checkbox',
              name: 'termsAccepted',
              label: 'Concordo com os termos e condições',
              required: true
            },
            {
              xtype: 'button',
              text: 'Cadastrar',
              type: 'submit',
              className: 'mt-4'
            }
          ]
        }
      }
    ]
  },
  // Container
  container: {
    title: "Container",
    description: "Componente para agrupamento e layout de outros componentes.",
    props: [
      { name: "layout", type: "'vertical' | 'horizontal' | 'grid'", description: "Tipo de layout para organizar itens filhos" },
      { name: "gap", type: "'sm' | 'md' | 'lg' | number", description: "Espaçamento entre os itens filhos" },
      { name: "columns", type: "number", description: "Número de colunas quando layout é 'grid'" },
      { name: "className", type: "string", description: "Classes CSS adicionais" },
      { name: "items", type: "ComponentConfig[]", description: "Componentes filhos" }
    ],
    examples: [
      {
        title: "Layout Vertical",
        description: "Container com layout vertical e gap médio",
        config: {
          xtype: 'container',
          layout: 'vertical',
          gap: 'md',
          className: 'p-4 border rounded',
          items: [
            {
              xtype: 'content',
              text: 'Item 1',
              className: 'p-2 bg-gray-100 rounded'
            },
            {
              xtype: 'content',
              text: 'Item 2',
              className: 'p-2 bg-gray-100 rounded'
            },
            {
              xtype: 'content',
              text: 'Item 3',
              className: 'p-2 bg-gray-100 rounded'
            }
          ]
        }
      },
      {
        title: "Layout Horizontal",
        description: "Container com layout horizontal",
        config: {
          xtype: 'container',
          layout: 'horizontal',
          gap: 'md',
          className: 'p-4 border rounded',
          items: [
            {
              xtype: 'content',
              text: 'Item 1',
              className: 'p-2 bg-gray-100 rounded'
            },
            {
              xtype: 'content',
              text: 'Item 2',
              className: 'p-2 bg-gray-100 rounded'
            },
            {
              xtype: 'content',
              text: 'Item 3',
              className: 'p-2 bg-gray-100 rounded'
            }
          ]
        }
      },
      {
        title: "Layout Grid",
        description: "Container com layout grid de 3 colunas",
        config: {
          xtype: 'container',
          layout: 'grid',
          columns: 3,
          gap: 'md',
          className: 'p-4 border rounded',
          items: [
            {
              xtype: 'content',
              text: 'Item 1',
              className: 'p-2 bg-gray-100 rounded'
            },
            {
              xtype: 'content',
              text: 'Item 2',
              className: 'p-2 bg-gray-100 rounded'
            },
            {
              xtype: 'content',
              text: 'Item 3',
              className: 'p-2 bg-gray-100 rounded'
            },
            {
              xtype: 'content',
              text: 'Item 4',
              className: 'p-2 bg-gray-100 rounded'
            },
            {
              xtype: 'content',
              text: 'Item 5',
              className: 'p-2 bg-gray-100 rounded'
            },
            {
              xtype: 'content',
              text: 'Item 6',
              className: 'p-2 bg-gray-100 rounded'
            }
          ]
        }
      }
    ]
  },
  
  // Card
  card: {
    title: "Card",
    description: "Componente de cartão baseado no Shadcn UI Card.",
    props: [
      { name: "title", type: "string", description: "Título do card" },
      { name: "description", type: "string", description: "Descrição do card" },
      { name: "footer", type: "boolean", description: "Se deve exibir o footer" },
      { name: "footerContent", type: "ComponentConfig", description: "Configuração do conteúdo do footer" },
      { name: "className", type: "string", description: "Classes CSS adicionais" },
      { name: "items", type: "ComponentConfig[]", description: "Componentes filhos para o conteúdo do card" }
    ],
    examples: [
      {
        title: "Card Básico",
        description: "Card com título e descrição",
        config: {
          xtype: 'card',
          title: 'Título do Card',
          description: 'Esta é uma descrição do card',
          className: 'max-w-md',
          items: [
            {
              xtype: 'content',
              text: 'Conteúdo do card',
              className: 'p-4'
            }
          ]
        }
      },
      {
        title: "Card com Footer",
        description: "Card com botões no footer",
        config: {
          xtype: 'card',
          title: 'Card com Footer',
          description: 'Este card possui um footer com botões',
          className: 'max-w-md',
          items: [
            {
              xtype: 'content',
              text: 'Conteúdo do card',
              className: 'p-4'
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
                variant: 'default'
              }
            ]
          }
        }
      }
    ]
  },
  
  // TextField
  textfield: {
    title: "TextField",
    description: "Campo de texto baseado no Shadcn UI Input.",
    props: [
      { name: "name", type: "string", description: "Nome do campo para identificação no formulário" },
      { name: "label", type: "string", description: "Label do campo" },
      { name: "placeholder", type: "string", description: "Texto de placeholder" },
      { name: "type", type: "'text' | 'email' | 'password' | 'number' | 'tel' | 'url'", description: "Tipo do campo de texto" },
      { name: "required", type: "boolean", description: "Se o campo é obrigatório" },
      { name: "description", type: "string", description: "Texto de descrição/ajuda" },
      { name: "className", type: "string", description: "Classes CSS adicionais" }
    ],
    examples: [
      {
        title: "Campo de Texto Básico",
        description: "Campo de texto com label e placeholder",
        config: {
          xtype: 'container',
          className: 'max-w-md p-4 border rounded',
          items: [
            {
              xtype: 'textfield',
              name: 'username',
              label: 'Nome de usuário',
              placeholder: 'Digite seu nome de usuário'
            }
          ]
        }
      },
      {
        title: "Tipos de Campos",
        description: "Diferentes tipos de campos de texto",
        config: {
          xtype: 'container',
          layout: 'vertical',
          gap: 'md',
          className: 'max-w-md p-4 border rounded',
          items: [
            {
              xtype: 'textfield',
              name: 'email',
              label: 'Email',
              type: 'email',
              placeholder: 'exemplo@email.com',
              description: 'Seu endereço de email'
            },
            {
              xtype: 'textfield',
              name: 'password',
              label: 'Senha',
              type: 'password',
              placeholder: '********',
              description: 'Sua senha'
            },
            {
              xtype: 'textfield',
              name: 'age',
              label: 'Idade',
              type: 'number',
              placeholder: '18',
              description: 'Sua idade'
            }
          ]
        }
      }
    ]
  },
  
  // Exemplo para ComboBox
  combobox: {
    title: "ComboBox",
    description: "Campo de seleção com carregamento dinâmico de dados de API.",
    props: [
      { name: "name", type: "string", description: "Nome do campo para identificação no formulário" },
      { name: "label", type: "string", description: "Label do campo" },
      { name: "placeholder", type: "string", description: "Texto de placeholder" },
      { name: "url", type: "string", description: "URL da API para carregar os dados" },
      { name: "loadOnOpen", type: "boolean", description: "Se deve carregar os dados apenas quando o usuário abrir o dropdown" },
      { name: "preloadData", type: "boolean", description: "Se deve carregar os dados ao montar o componente" },
      { name: "valueField", type: "string", description: "Campo a ser usado como valor" },
      { name: "labelField", type: "string", description: "Campo a ser usado como label" },
      { name: "queryParams", type: "Record<string, string>", description: "Parâmetros adicionais para a consulta" },
      { name: "required", type: "boolean", description: "Se o campo é obrigatório" },
      { name: "className", type: "string", description: "Classes CSS adicionais" }
    ],
    examples: [
      {
        title: "ComboBox sob demanda",
        description: "ComboBox que carrega dados quando o usuário clica",
        config: {
          xtype: 'container',
          className: 'max-w-md p-4 border rounded',
          items: [
            {
              xtype: 'combobox',
              name: 'city',
              label: 'Cidade',
              placeholder: 'Selecione uma cidade',
              url: '/api/cities',
              loadOnOpen: true,
              description: 'Carrega as cidades apenas quando você clica'
            }
          ]
        }
      },
      {
        title: "ComboBox com pré-carregamento",
        description: "ComboBox que carrega dados ao montar o componente",
        config: {
          xtype: 'container',
          className: 'max-w-md p-4 border rounded',
          items: [
            {
              xtype: 'combobox',
              name: 'category',
              label: 'Categoria',
              placeholder: 'Selecione uma categoria',
              url: '/api/categories',
              preloadData: true,
              description: 'Carrega as categorias automaticamente'
            }
          ]
        }
      }
    ]
  },
  
  // Outros componentes podem ser adicionados aqui
};

export default function ComponentPage({ params }: { params: { componentId: string } }) {
  const { componentId } = params;
  const componentDoc = componentDocs[componentId as keyof typeof componentDocs];
  
  // Se o componente não existir, retorna 404
  if (!componentDoc) {
    notFound();
  }
  
  const [selectedExample, setSelectedExample] = useState(0);
  
  // Formatar o código JSON para exibição
  const formattedCode = JSON.stringify(componentDoc.examples[selectedExample].config, null, 2);
  
  // Cria a configuração da página de documentação do componente
  const docPageConfig: ComponentConfig = {
    xtype: 'container',
    layout: 'vertical',
    gap: 'lg',
    className: 'max-w-4xl pb-16',
    items: [
      // Cabeçalho
      {
        xtype: 'container',
        className: 'mb-8',
        items: [
          {
            xtype: 'content',
            variant: 'h1',
            text: componentDoc.title,
            size: '3xl',
            weight: 'bold',
            className: 'mb-2'
          },
          {
            xtype: 'content',
            variant: 'p',
            text: componentDoc.description,
            size: 'lg',
            className: 'text-gray-600'
          }
        ]
      },
      
      // Props do componente
      {
        xtype: 'container',
        layout: 'vertical',
        gap: 'md',
        items: [
          {
            xtype: 'content',
            variant: 'h2',
            text: 'Props',
            size: '2xl',
            weight: 'bold',
            className: 'mb-2'
          },
          {
            xtype: 'card',
            className: 'overflow-hidden',
            items: [
              {
                xtype: 'container',
                className: 'overflow-x-auto',
                items: [
                  {
                    xtype: 'html',
                    html: `
                      <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                          <tr>
                            <th class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prop</th>
                            <th class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                            <th class="p-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                          </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                          ${componentDoc.props.map(prop => `
                            <tr>
                              <td class="p-4 text-sm font-medium text-gray-900">${prop.name}</td>
                              <td class="p-4 text-sm text-gray-600 font-mono">${prop.type}</td>
                              <td class="p-4 text-sm text-gray-500">${prop.description}</td>
                            </tr>
                          `).join('')}
                        </tbody>
                      </table>
                    `
                  }
                ]
              }
            ]
          }
        ]
      },
      
      // Exemplos
      {
        xtype: 'container',
        layout: 'vertical',
        gap: 'md',
        className: 'mt-8',
        items: [
          {
            xtype: 'content',
            variant: 'h2',
            text: 'Exemplos',
            size: '2xl',
            weight: 'bold',
            className: 'mb-4'
          },
          
          // Seletor de exemplos
          {
            xtype: 'container',
            layout: 'horizontal',
            gap: 'sm',
            className: 'mb-6 flex-wrap',
            items: componentDoc.examples.map((example, index) => ({
              xtype: 'button',
              text: example.title,
              variant: selectedExample === index ? 'default' : 'outline',
              onClick: () => setSelectedExample(index)
            }))
          },
          
          // Exemplo selecionado
          {
            xtype: 'container',
            layout: 'vertical',
            gap: 'md',
            items: [
              {
                xtype: 'content',
                variant: 'h3',
                text: componentDoc.examples[selectedExample].title,
                size: 'xl',
                weight: 'semibold',
                className: 'mb-2'
              },
              {
                xtype: 'content',
                variant: 'p',
                text: componentDoc.examples[selectedExample].description,
                className: 'text-gray-600 mb-4'
              },
              
              // Preview do exemplo
              {
                xtype: 'card',
                title: 'Preview',
                className: 'mb-6',
                items: [
                  {
                    xtype: 'container',
                    className: 'p-4 min-h-24 flex items-center justify-center bg-gray-50 rounded',
                    items: [
                      componentDoc.examples[selectedExample].config
                    ]
                  }
                ]
              },
              
              // Código do exemplo
              {
                xtype: 'card',
                title: 'Código',
                className: 'mb-6',
                items: [
                  {
                    xtype: 'html',
                    html: `<pre class="p-4 bg-gray-50 font-mono text-sm overflow-auto whitespace-pre">${formattedCode}</pre>`
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  };

  return <FormBuild config={docPageConfig} />;
}