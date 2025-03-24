"use client";

// app/page.tsx
import { useState } from 'react';
import { FormBuild } from './components_build/FormBuild/FormBuild';
import { ComponentConfig } from './components_build/FormBuild/types';
import Link from 'next/link';

export default function HomePage() {
  const [demoData, setDemoData] = useState({
    name: '',
    email: '',
    plan: '',
    newsletter: false
  });

  const [activeExample, setActiveExample] = useState('form');

  const handleDemoChange = (name: string, value: any) => {
    setDemoData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDemoSubmit = (data: Record<string, any>) => {
    alert('Formulário de demonstração enviado!\n\n' + JSON.stringify(data, null, 2));
  };

  const payments = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "success",
      email: "ken99@example.com",
      date: new Date(2023, 1, 15)
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "success",
      email: "Abe45@example.com",
      date: new Date(2023, 2, 20)
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "processing",
      email: "Monserrat44@example.com",
      date: new Date(2023, 3, 5)
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "success",
      email: "Silas22@example.com",
      date: new Date(2023, 4, 10)
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "failed",
      email: "carmella@example.com",
      date: new Date(2023, 5, 25)
    },
  ];
  
  // Handlers para as ações
  const handleViewDetails = (payment: any) => {
    alert(`Visualizando detalhes do pagamento #${payment.id}: R$ ${payment.amount.toFixed(2)}`);
  };
  
  const handleCopyId = (payment: any) => {
    navigator.clipboard.writeText(payment.id);
    alert(`ID do pagamento copiado: ${payment.id}`);
  };
  
  // Exemplos de componentes
  const examples = {
    form: {
      title: "Formulário",
      description: "Formulários declarativos com validação e estado integrados",
      config: {
        xtype: 'card',
        className: 'bg-white shadow-sm',
        title: 'Formulário de Contato',
        description: 'Exemplo de formulário criado com FormBuild',
        items: [
          {
            xtype: 'container',
            layout: 'vertical',
            gap: 'md',
            className: 'p-4',
            items: [
              {
                xtype: 'textfield',
                name: 'name',
                label: 'Nome completo',
                placeholder: 'Digite seu nome',
                required: true
              },
              {
                xtype: 'textfield',
                name: 'email',
                label: 'Email',
                type: 'email',
                placeholder: 'seu@email.com',
                required: true
              },
              {
                xtype: 'select',
                name: 'plan',
                label: 'Plano de interesse',
                placeholder: 'Selecione um plano',
                options: [
                  { value: 'basic', label: 'Básico' },
                  { value: 'pro', label: 'Profissional' },
                  { value: 'enterprise', label: 'Empresarial' }
                ]
              },
              {
                xtype: 'checkbox',
                name: 'newsletter',
                label: 'Desejo receber a newsletter'
              }
            ]
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
              text: 'Enviar',
              type: 'submit'
            }
          ]
        }
      }
    },
    dashboard: {
      title: "Dashboard",
      description: "Crie dashboards completos com layouts flexíveis",
      config: {
        xtype: 'container',
        layout: 'vertical',
        gap: 'lg',
        className: 'p-4 bg-white rounded-lg shadow-sm',
        items: [
          {
            xtype: 'container',
            layout: 'horizontal',
            className: 'items-center justify-between mb-4',
            items: [
              {
                xtype: 'content',
                variant: 'h1',
                text: 'Dashboard de Vendas',
                size: '2xl',
                weight: 'bold'
              },
              {
                xtype: 'container',
                layout: 'horizontal',
                gap: 'sm',
                items: [
                  {
                    xtype: 'button',
                    variant: 'outline',
                    items: [
                      {
                        xtype: 'icon',
                        name: 'filter',
                        size: 16,
                        className: 'mr-2'
                      },
                      {
                        xtype: 'content',
                        text: 'Filtros',
                        variant: 'span'
                      }
                    ]
                  },
                  {
                    xtype: 'button',
                    variant: 'default',
                    items: [
                      {
                        xtype: 'icon',
                        name: 'download',
                        size: 16,
                        className: 'mr-2'
                      },
                      {
                        xtype: 'content',
                        text: 'Exportar',
                        variant: 'span'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            xtype: 'container',
            layout: 'grid',
            columns: 3,
            gap: 'md',
            items: [
              // Card 1
              {
                xtype: 'card',
                className: 'bg-white shadow-sm border border-gray-100',
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
                            text: 'Vendas Totais',
                            weight: 'medium',
                            size: 'lg',
                            className: 'text-gray-700'
                          },
                          {
                            xtype: 'content',
                            variant: 'p',
                            text: 'R$ 45.583,00',
                            weight: 'bold',
                            size: '2xl',
                            className: 'text-gray-900'
                          },
                          {
                            xtype: 'content',
                            variant: 'p',
                            text: '+12,5% vs mês anterior',
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
                            name: 'dollar-sign',
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
                className: 'bg-white shadow-sm border border-gray-100',
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
                            text: 'Novos Clientes',
                            weight: 'medium',
                            size: 'lg',
                            className: 'text-gray-700'
                          },
                          {
                            xtype: 'content',
                            variant: 'p',
                            text: '845',
                            weight: 'bold',
                            size: '2xl',
                            className: 'text-gray-900'
                          },
                          {
                            xtype: 'content',
                            variant: 'p',
                            text: '+8,3% vs mês anterior',
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
                            name: 'users',
                            size: 24,
                            color: '#10b981'
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
                className: 'bg-white shadow-sm border border-gray-100',
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
                            text: 'Conversão',
                            weight: 'medium',
                            size: 'lg',
                            className: 'text-gray-700'
                          },
                          {
                            xtype: 'content',
                            variant: 'p',
                            text: '24,8%',
                            weight: 'bold',
                            size: '2xl',
                            className: 'text-gray-900'
                          },
                          {
                            xtype: 'content',
                            variant: 'p',
                            text: '+2,1% vs mês anterior',
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
                            name: 'percent',
                            size: 24,
                            color: '#8b5cf6'
                          }
                        ]
                      }
                    ]
                  }
                ]
              }
            ]
          },
          {
            xtype: 'container',
            className: 'h-64 bg-gray-50 rounded-md border border-gray-200 flex items-center justify-center',
            items: [
              {
                xtype: 'content',
                text: 'Área de gráfico',
                className: 'text-gray-500'
              }
            ]
          }
        ]
      }
    },
    crud: {
      title: "CRUD",
      description: "Interfaces de gestão de dados completas",
      config: {
        xtype: 'container',
        layout: 'vertical',
        gap: 'md',
        className: 'p-4 bg-white rounded-lg shadow-sm',
        items: [
          {
            xtype: 'container',
            layout: 'horizontal',
            className: 'items-center justify-between mb-4',
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
                    text: 'Novo Usuário',
                    variant: 'span'
                  }
                ]
              }
            ]
          },
          {
            xtype: 'html',
            html: `
              <div class="overflow-x-auto">
                <table class="min-w-full bg-white border border-gray-200 rounded-md">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Função</th>
                      <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th class="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    <tr>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200"></div>
                          <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">João Silva</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        joao@example.com
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        Administrador
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Ativo
                        </span>
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" class="text-blue-600 hover:text-blue-900 mr-3">Editar</a>
                        <a href="#" class="text-red-600 hover:text-red-900">Excluir</a>
                      </td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <div class="flex items-center">
                          <div class="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200"></div>
                          <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">Maria Santos</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        maria@example.com
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        Editor
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap">
                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                          Ativo
                        </span>
                      </td>
                      <td class="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" class="text-blue-600 hover:text-blue-900 mr-3">Editar</a>
                        <a href="#" class="text-red-600 hover:text-red-900">Excluir</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            `
          }
        ]
      }
    },
    avatar: {
      title: "Avatar",
      description: "Elemento de avatar para exibição de imagens",
      config: {
        xtype: 'avatar',
        size: 'lg',
        src: 'https://github.com/shadcn.png',
        className: 'rounded-full'
      }
    }
    }
  };

  // Código simplificado para demonstração
  const codeExample = `// Crie formulários, dashboards e interfaces CRUD sem escrever HTML

const formConfig = {
  xtype: 'container',
  layout: 'vertical',
  gap: 'md',
  items: [
    {
      xtype: 'textfield',
      name: 'name',
      label: 'Nome',
      placeholder: 'Digite seu nome'
    },
    {
      xtype: 'textfield',
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'seu@email.com'
    },
    {
      xtype: 'button',
      text: 'Enviar',
      type: 'submit'
    }
  ]
};

// Renderize o componente
return <FormBuild config={formConfig} />;`;

  // Configuração da página de apresentação
  const landingPageConfig: ComponentConfig = {
    xtype: 'container',
    layout: 'vertical',
    gap: 'xl',
    className: 'min-h-screen bg-gray-50',
    items: [
      // Header
      {
        xtype: 'container',
        className: 'bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-4',
        items: [
          {
            xtype: 'container',
            className: 'max-w-5xl mx-auto text-center',
            items: [
              {
                xtype: 'content',
                variant: 'h1',
                text: 'FormBuild',
                size: '4xl',
                weight: 'bold',
                className: 'mb-4'
              },
              {
                xtype: 'content',
                variant: 'p',
                text: 'Sistema declarativo para construção de UIs em React/Next.js',
                size: 'xl',
                className: 'mb-8 max-w-3xl mx-auto'
              },
              {
                xtype: 'container',
                layout: 'horizontal',
                gap: 'md',
                className: 'justify-center',
                items: [
                  {
                    xtype: 'button',
                    text: 'Ver Documentação',
                    variant: 'default',
                    className: 'bg-white text-blue-700 hover:bg-gray-100',
                    onClick: () => window.location.href = '/docs'
                  },
                  {
                    xtype: 'button',
                    text: 'Ver no GitHub',
                    variant: 'default',
                    className: 'border-white text-white hover:bg-white/10'
                  }
                ]
              }
            ]
          }
        ]
      },

      // Features
      {
        xtype: 'container',
        className: 'max-w-6xl mx-auto px-4 py-16',
        items: [
          {
            xtype: 'content',
            variant: 'h2',
            text: 'Por que usar FormBuild?',
            size: '3xl',
            weight: 'bold',
            className: 'text-center mb-12'
          },
          {
            xtype: 'container',
            layout: 'grid',
            columns: 3,
            gap: 'lg',
            className: 'mb-12',
            items: [
              // Feature 1
              {
                xtype: 'container',
                layout: 'vertical',
                gap: 'sm',
                className: 'text-center',
                items: [
                  {
                    xtype: 'container',
                    className: 'w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4',
                    items: [
                      {
                        xtype: 'icon',
                        name: 'code',
                        size: 32
                      }
                    ]
                  },
                  {
                    xtype: 'content',
                    variant: 'h3',
                    text: 'Menos Código',
                    size: 'xl',
                    weight: 'bold',
                    className: 'mb-2'
                  },
                  {
                    xtype: 'content',
                    variant: 'p',
                    text: 'Construa interfaces complexas com menos código e sem JSX direto.',
                    className: 'text-gray-600'
                  }
                ]
              },
              // Feature 2
              {
                xtype: 'container',
                layout: 'vertical',
                gap: 'sm',
                className: 'text-center',
                items: [
                  {
                    xtype: 'container',
                    className: 'w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4',
                    items: [
                      {
                        xtype: 'icon',
                        name: 'layers',
                        size: 32
                      }
                    ]
                  },
                  {
                    xtype: 'content',
                    variant: 'h3',
                    text: 'Componentes Prontos',
                    size: 'xl',
                    weight: 'bold',
                    className: 'mb-2'
                  },
                  {
                    xtype: 'content',
                    variant: 'p',
                    text: 'Mais de 20 componentes integrados com Shadcn UI, prontos para uso.',
                    className: 'text-gray-600'
                  }
                ]
              },
              // Feature 3
              {
                xtype: 'container',
                layout: 'vertical',
                gap: 'sm',
                className: 'text-center',
                items: [
                  {
                    xtype: 'container',
                    className: 'w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4',
                    items: [
                      {
                        xtype: 'icon',
                        name: 'zap',
                        size: 32
                      }
                    ]
                  },
                  {
                    xtype: 'content',
                    variant: 'h3',
                    text: 'Desenvolvimento Rápido',
                    size: 'xl',
                    weight: 'bold',
                    className: 'mb-2'
                  },
                  {
                    xtype: 'content',
                    variant: 'p',
                    text: 'Acelere o desenvolvimento com abordagem declarativa e configurável.',
                    className: 'text-gray-600'
                  }
                ]
              }
            ]
          }
        ]
      },

      // Code Example
      {
        xtype: 'container',
        className: 'bg-gray-900 py-16 px-4',
        items: [
          {
            xtype: 'container',
            className: 'max-w-5xl mx-auto',
            items: [
              {
                xtype: 'content',
                variant: 'h2',
                text: 'Simples de usar',
                size: '3xl',
                weight: 'bold',
                className: 'text-white text-center mb-8'
              },
              {
                xtype: 'card',
                className: 'bg-gray-800 border-gray-700 text-white mb-8',
                items: [
                  {
                    xtype: 'html',
                    html: `<pre class="p-4 font-mono text-sm overflow-x-auto whitespace-pre text-gray-300">${codeExample}</pre>`
                  }
                ]
              }
            ]
          }
        ]
      },

      // Interactive Examples
      {
        xtype: 'container',
        className: 'max-w-6xl mx-auto px-4 py-16',
        items: [
          {
            xtype: 'content',
            variant: 'h2',
            text: 'Exemplos Interativos',
            size: '3xl',
            weight: 'bold',
            className: 'text-center mb-8'
          },
          {
            xtype: 'container',
            layout: 'horizontal',
            gap: 'md',
            className: 'justify-center mb-8',
            items: Object.entries(examples).map(([id, example]) => ({
              xtype: 'button',
              text: example.title,
              variant: activeExample === id ? 'default' : 'outline',
              onClick: () => setActiveExample(id)
            }))
          },
          {
            xtype: 'container',
            layout: 'vertical',
            gap: 'md',
            items: [
              {
                xtype: 'content',
                variant: 'h3',
                text: examples[activeExample].title,
                size: '2xl',
                weight: 'semibold',
                className: 'mb-2'
              },
              {
                xtype: 'content',
                variant: 'p',
                text: examples[activeExample].description,
                className: 'text-gray-600 mb-6'
              },
              // Exemplo ativo
              examples[activeExample].config
            ]
          }
        ]
      },

      // Getting Started
      {
        xtype: 'container',
        className: 'bg-blue-50 py-16 px-4',
        items: [
          {
            xtype: 'container',
            className: 'max-w-4xl mx-auto text-center',
            items: [
              {
                xtype: 'content',
                variant: 'h2',
                text: 'Comece a utilizar hoje',
                size: '3xl',
                weight: 'bold',
                className: 'mb-6'
              },
              {
                xtype: 'content',
                variant: 'p',
                text: 'FormBuild é fácil de integrar com seu projeto React ou Next.js existente.',
                className: 'text-lg mb-8 max-w-2xl mx-auto'
              },
              {
                xtype: 'container',
                layout: 'horizontal',
                gap: 'md',
                className: 'justify-center',
                items: [
                  {
                    xtype: 'button',
                    text: 'Ver a Documentação',
                    variant: 'default',
                    className: 'bg-blue-600',
                    onClick: () => window.location.href = '/docs'
                  },
                  {
                    xtype: 'button',
                    text: 'Ver Exemplos',
                    variant: 'outline',
                    onClick: () => window.location.href = '/docs/page-builder'
                  }
                ]
              }
            ]
          }
        ]
      },

      // Footer
      {
        xtype: 'container',
        className: 'bg-gray-800 text-white py-8 px-4',
        items: [
          {
            xtype: 'container',
            className: 'max-w-5xl mx-auto',
            layout: 'horizontal',
            className: 'items-center justify-between',
            items: [
              {
                xtype: 'content',
                text: '© 2025 FormBuild. Todos os direitos reservados.',
                className: 'text-gray-400'
              },
              {
                xtype: 'container',
                layout: 'horizontal',
                gap: 'md',
                items: [
                  {
                    xtype: 'container',
                    tag: 'a',
                    href: '/docs',
                    className: 'text-gray-400 hover:text-white transition-colors',
                    items: [
                      {
                        xtype: 'content',
                        text: 'Documentação'
                      }
                    ]
                  },
                  {
                    xtype: 'container',
                    tag: 'a',
                    href: '#',
                    className: 'text-gray-400 hover:text-white transition-colors',
                    items: [
                      {
                        xtype: 'content',
                        text: 'GitHub'
                      }
                    ]
                  },
                  {
                    xtype: 'container',
                    tag: 'a',
                    href: '#',
                    className: 'text-gray-400 hover:text-white transition-colors',
                    items: [
                      {
                        xtype: 'content',
                        text: 'Contato'
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
  };

  return <FormBuild config={landingPageConfig} data={demoData} onChange={handleDemoChange} onSubmit={handleDemoSubmit} />;
}