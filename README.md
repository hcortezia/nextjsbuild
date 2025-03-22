# FormBuild: Sistema Declarativo para Construção de UI em React/Next.js

FormBuild é um sistema declarativo inspirado no ExtJS que permite criar interfaces complexas usando apenas objetos JSON, sem escrever JSX diretamente.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

## 🌟 Características

- **Abordagem Declarativa**: Crie interfaces complexas usando apenas objetos JSON
- **Componentes Shadcn UI**: Aproveite a beleza e consistência do Shadcn UI
- **Formulários Integrados**: Gerenciamento de estado com React Hook Form
- **Carregamento Dinâmico**: Componentes que carregam dados sob demanda
- **TypeScript**: Tipagem completa para melhor desenvolvimento
- **Zero HTML/JSX**: Crie interfaces completas sem escrever HTML/JSX diretamente

## 📦 Instalação

1. **Instale as dependências necessárias:**

```bash
# Instalar o react-hook-form (necessário para os formulários)
npm install react-hook-form

# Instalar Lucide React para ícones
npm install lucide-react

# Instalar componentes do Shadcn UI
npx shadcn-ui@latest add card
npx shadcn-ui@latest add form
npx shadcn-ui@latest add input
npx shadcn-ui@latest add select
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add button
npx shadcn-ui@latest add sidebar
npx shadcn-ui@latest add breadcrumb
```

2. **Clone o repositório FormBuild para seu projeto:**

```bash
# Exemplo: Copie os arquivos para sua pasta de componentes
cp -r components_build /seu-projeto/src/
```

## 🚀 Uso Básico

```tsx
"use client";

import { FormBuild } from '@/components_build/FormBuild/FormBuild';
import { ComponentConfig } from '@/components_build/FormBuild/types';
import { useState } from 'react';

export default function MeuComponente() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const handleChange = (name: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (data: Record<string, any>) => {
    console.log('Formulário enviado:', data);
    // Processamento dos dados...
  };

  // Configuração declarativa da UI
  const config: ComponentConfig = {
    xtype: 'container',
    layout: 'vertical',
    gap: 'md',
    className: 'p-4 border rounded max-w-md mx-auto',
    items: [
      {
        xtype: 'content',
        variant: 'h2',
        text: 'Formulário de Contato',
        size: 'xl',
        weight: 'bold',
        className: 'mb-4'
      },
      {
        xtype: 'textfield',
        name: 'name',
        label: 'Nome',
        placeholder: 'Digite seu nome',
        required: true
      },
      {
        xtype: 'textfield',
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'seu@email.com',
        required: true
      },
      {
        xtype: 'button',
        text: 'Enviar',
        type: 'submit',
        className: 'mt-4'
      }
    ]
  };

  return (
    <FormBuild
      config={config}
      data={formData}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
```

## 🧩 Componentes Disponíveis

O sistema FormBuild oferece uma variedade de componentes pré-construídos:

### Containers
- **container**: Componente para agrupamento e layout
- **card**: Cartão com cabeçalho, conteúdo e rodapé opcionais
- **formGroup**: Agrupamento de campos de formulário

### Form Fields
- **textfield**: Campo de texto/entrada
- **select**: Campo de seleção estático
- **combobox**: Campo de seleção com carregamento dinâmico
- **checkbox**: Campo de checkbox

### UI Elements
- **content**: Renderização de conteúdo de texto/HTML
- **icon**: Renderização de ícones do Lucide
- **button**: Botões de ação

### Layout Components
- **sidebar**: Barra lateral de navegação
- **breadcrumb**: Navegação hierárquica

## 🌈 Exemplos Avançados

### Formulário com Validação

```tsx
const formConfig: ComponentConfig = {
  xtype: 'container',
  layout: 'vertical',
  gap: 'md',
  items: [
    {
      xtype: 'textfield',
      name: 'username',
      label: 'Nome de usuário',
      placeholder: 'Digite seu nome de usuário',
      required: true
    },
    {
      xtype: 'textfield',
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'exemplo@email.com',
      required: true
    },
    {
      xtype: 'textfield',
      name: 'password',
      label: 'Senha',
      type: 'password',
      placeholder: '********',
      required: true
    },
    {
      xtype: 'button',
      text: 'Cadastrar',
      type: 'submit'
    }
  ]
};
```

### ComboBox com Carregamento Dinâmico

```tsx
{
  xtype: 'combobox',
  name: 'city',
  label: 'Cidade',
  placeholder: 'Selecione uma cidade',
  url: '/api/cities',
  loadOnOpen: true, // Carrega apenas quando clicado
  valueField: 'id',
  labelField: 'name'
}
```

### Layout Complexo

```tsx
{
  xtype: 'container',
  layout: 'grid',
  columns: 3,
  gap: 'md',
  items: [
    {
      xtype: 'card',
      title: 'Vendas',
      items: [
        {
          xtype: 'content',
          text: 'R$ 25.350,00',
          variant: 'h3',
          size: '2xl'
        }
      ]
    },
    {
      xtype: 'card',
      title: 'Usuários',
      items: [
        {
          xtype: 'content',
          text: '1.253',
          variant: 'h3',
          size: '2xl'
        }
      ]
    },
    {
      xtype: 'card',
      title: 'Pedidos',
      items: [
        {
          xtype: 'content',
          text: '532',
          variant: 'h3',
          size: '2xl'
        }
      ]
    }
  ]
}
```

## 📂 Estrutura do Projeto

```
components_build/
├── FormBuild/
│   ├── FormBuild.tsx         # Componente principal
│   ├── types.ts              # Definições de tipos
│   ├── ComponentRegistry.tsx # Registro de componentes disponíveis
│   ├── index.ts              # Arquivo de barril para exportações
│   └── components/           # Implementações dos componentes
│       ├── Container.tsx
│       ├── Card.tsx
│       ├── FormGroup.tsx
│       ├── TextField.tsx
│       ├── SelectField.tsx
│       ├── CheckboxField.tsx
│       ├── ComboBox.tsx
│       ├── Content.tsx
│       ├── Icon.tsx
│       ├── Button.tsx
│       ├── Sidebar.tsx
│       ├── Breadcrumb.tsx
│       └── ...
```

## 📚 Documentação

A documentação completa está disponível em `/docs` e inclui:

- Descrições detalhadas de cada componente
- Lista de todas as props suportadas
- Exemplos interativos
- Código JSON para cada exemplo

## 🛠️ Adicionando Novos Componentes

1. Crie um novo componente em `/components/FormBuild/components/`
2. Registre-o no `ComponentRegistry.tsx`:

```tsx
import { NewComponent } from './components/NewComponent';

export const ComponentRegistry: ComponentRegistryType = {
  // ... componentes existentes
  newComponentType: NewComponent
};
```

3. Use-o em suas configurações:

```tsx
{
  xtype: 'newComponentType',
  // propriedades específicas do novo componente
}
```

## 🔄 Integração com Next.js App Router

Para usar o sistema FormBuild em um projeto Next.js com App Router, siga estas orientações:

1. **Adicione `"use client"` aos componentes**:
   Todos os componentes FormBuild já incluem a diretiva "use client"

2. **Estrutura de Pastas Recomendada**:
```
app/
├── (dashboard)/         # Grupo de rotas com layout compartilhado
│   ├── layout.tsx       # Layout com sidebar (usando FormBuild)
│   ├── dashboard/       # Página específica
│   │   └── page.tsx     # Conteúdo usando FormBuild
│   ├── settings/
│   │   └── page.tsx
│   └── ...
```

## 🤝 Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Abrir issues para reportar bugs ou sugerir melhorias
2. Enviar pull requests com novos componentes ou correções
3. Melhorar a documentação

## 📄 Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

---

Desenvolvido com ❤️ para simplificar a construção de interfaces em React/Next.js.