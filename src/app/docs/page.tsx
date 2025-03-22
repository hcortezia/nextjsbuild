"use client";

// app/(docs)/docs/page.tsx
import { FormBuild } from '../components_build/FormBuild/FormBuild';
import { ComponentConfig } from '../components_build/FormBuild/types';

export default function DocsHome() {
  const codeExample = `const formConfig: ComponentConfig = {
  xtype: 'container',
  layout: 'vertical',
  gap: 'md',
  className: 'p-4 border rounded bg-white',
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
      placeholder: 'Digite seu email',
      type: 'email'
    },
    {
      xtype: 'button',
      text: 'Enviar',
      type: 'submit'
    }
  ]
};`;

  const homeConfig: ComponentConfig = {
    xtype: 'container',
    layout: 'vertical',
    gap: 'lg',
    className: 'max-w-4xl',
    items: [
      {
        xtype: 'content',
        variant: 'h1',
        text: 'FormBuild Documentation',
        size: '3xl',
        weight: 'bold',
        className: 'mb-2'
      },
      {
        xtype: 'content',
        variant: 'p',
        text: 'Um sistema declarativo para criar interfaces em React usando JSON',
        size: 'xl',
        className: 'text-gray-500 mb-8'
      },
      {
        xtype: 'card',
        className: 'bg-blue-50 border-blue-200',
        items: [
          {
            xtype: 'container',
            layout: 'vertical',
            gap: 'md',
            items: [
              {
                xtype: 'content',
                variant: 'h2',
                text: 'Introdução',
                size: 'xl',
                weight: 'semibold',
                className: 'text-blue-800'
              },
              {
                xtype: 'content',
                variant: 'p',
                text: 'FormBuild é um sistema declarativo inspirado no ExtJS que permite criar interfaces complexas usando apenas objetos JSON, sem escrever JSX diretamente.',
                className: 'text-blue-700'
              }
            ]
          }
        ]
      },
      {
        xtype: 'container',
        layout: 'vertical',
        gap: 'md',
        items: [
          {
            xtype: 'content',
            variant: 'h2',
            text: 'Começando',
            size: '2xl',
            weight: 'bold',
            className: 'mt-4'
          },
          {
            xtype: 'content',
            variant: 'p',
            text: 'Para começar a usar o FormBuild, você precisa importar o componente FormBuild e o tipo ComponentConfig:',
            className: 'mb-4'
          },
          {
            xtype: 'card',
            className: 'bg-gray-50',
            items: [
              {
                xtype: 'html',
                html: `<pre class="p-4 font-mono text-sm overflow-x-auto whitespace-pre">${`import { FormBuild } from '@/components_build/FormBuild/FormBuild';
import { ComponentConfig } from '@/components_build/FormBuild/types';

// Defina sua configuração
const config: ComponentConfig = {
  xtype: 'container',
  items: [
    {
      xtype: 'content',
      text: 'Olá, mundo!'
    }
  ]
};

// Renderize o componente
export default function MyComponent() {
  return <FormBuild config={config} />;
}`}</pre>`
              }
            ]
          }
        ]
      },
      {
        xtype: 'container',
        layout: 'vertical',
        gap: 'md',
        items: [
          {
            xtype: 'content',
            variant: 'h2',
            text: 'Conceitos Principais',
            size: '2xl',
            weight: 'bold',
            className: 'mt-8'
          },
          {
            xtype: 'card',
            className: 'mb-4',
            items: [
              {
                xtype: 'container',
                layout: 'vertical',
                gap: 'sm',
                items: [
                  {
                    xtype: 'content',
                    variant: 'h3',
                    text: 'xtype',
                    size: 'lg',
                    weight: 'semibold'
                  },
                  {
                    xtype: 'content',
                    variant: 'p',
                    text: 'Cada componente tem um xtype que identifica o tipo de componente a ser renderizado.'
                  }
                ]
              }
            ]
          },
          {
            xtype: 'card',
            className: 'mb-4',
            items: [
              {
                xtype: 'container',
                layout: 'vertical',
                gap: 'sm',
                items: [
                  {
                    xtype: 'content',
                    variant: 'h3',
                    text: 'items',
                    size: 'lg',
                    weight: 'semibold'
                  },
                  {
                    xtype: 'content',
                    variant: 'p',
                    text: 'A propriedade items permite compor componentes aninhados, criando estruturas complexas.'
                  }
                ]
              }
            ]
          },
          {
            xtype: 'card',
            className: 'mb-4',
            items: [
              {
                xtype: 'container',
                layout: 'vertical',
                gap: 'sm',
                items: [
                  {
                    xtype: 'content',
                    variant: 'h3',
                    text: 'Manipulação de Dados',
                    size: 'lg',
                    weight: 'semibold'
                  },
                  {
                    xtype: 'content',
                    variant: 'p',
                    text: 'O FormBuild integra com o react-hook-form para gerenciamento de estado e validação.'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        xtype: 'container',
        layout: 'vertical',
        gap: 'md',
        className: 'mt-8',
        items: [
          {
            xtype: 'content',
            variant: 'h2',
            text: 'Exemplo Simples',
            size: '2xl',
            weight: 'bold'
          },
          {
            xtype: 'content',
            variant: 'p',
            text: 'Aqui está um exemplo básico de um formulário:',
            className: 'mb-4'
          },
          {
            xtype: 'card',
            className: 'mb-4',
            items: [
              {
                xtype: 'container',
                layout: 'vertical',
                gap: 'md',
                className: 'p-4 border rounded bg-white',
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
                    placeholder: 'Digite seu email',
                    type: 'email'
                  },
                  {
                    xtype: 'button',
                    text: 'Enviar',
                    type: 'submit'
                  }
                ]
              }
            ]
          },
          {
            xtype: 'content',
            variant: 'p',
            text: 'O código para gerar o formulário acima:',
            className: 'mb-2'
          },
          {
            xtype: 'card',
            className: 'bg-gray-50',
            items: [
              {
                xtype: 'html',
                html: `<pre class="p-4 font-mono text-sm overflow-x-auto whitespace-pre">${codeExample}</pre>`
              }
            ]
          }
        ]
      },
      {
        xtype: 'container',
        layout: 'vertical',
        gap: 'md',
        className: 'mt-8',
        items: [
          {
            xtype: 'content',
            variant: 'h2',
            text: 'Explore os Componentes',
            size: '2xl',
            weight: 'bold'
          },
          {
            xtype: 'content',
            variant: 'p',
            text: 'Use a navegação lateral para explorar a documentação detalhada de cada componente disponível no sistema FormBuild.',
            className: 'mb-4'
          }
        ]
      }
    ]
  };

  return <FormBuild config={homeConfig} />;
}