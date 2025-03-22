"use client";

// components/FormBuild/components/ComboBox.tsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useFormContext } from 'react-hook-form';
import { BaseComponentProps } from '../types';
import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage
} from '@/components/ui/form';
import { Loader2 } from 'lucide-react';

interface ComboOption {
  value: string;
  label: string;
}

interface ComboBoxProps extends BaseComponentProps {
  url?: string;
  queryParams?: Record<string, string>;
  placeholder?: string;
  description?: string;
  required?: boolean;
  valueField?: string;
  labelField?: string;
  loadOnOpen?: boolean;
  preloadData?: boolean;
  onDataLoad?: (data: any[]) => void;
}

export const ComboBox: React.FC<ComboBoxProps> = ({
  className,
  name = '',
  label,
  description,
  url,
  queryParams = {},
  placeholder = 'Selecione uma opção',
  required = false,
  valueField = 'id',
  labelField = 'name',
  loadOnOpen = true,
  preloadData = false,
  onChange,
  onDataLoad,
  ...props
}) => {
  const form = useFormContext();
  const [options, setOptions] = useState<ComboOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const hasLoadedRef = useRef(false);
  
  // Função para carregar dados da API
  const loadData = useCallback(async () => {
    // Sai imediatamente se:
    // 1. Não houver URL para carregar
    // 2. Já carregou anteriormente e não está aberto
    // 3. Já estiver em processo de carregamento
    if (!url || (hasLoadedRef.current && !isOpen) || loading) {
      return;
    }
    
    try {
      setLoading(true);
      
      // Construir URL com parâmetros de consulta
      const queryString = new URLSearchParams(queryParams).toString();
      const fullUrl = queryString ? `${url}?${queryString}` : url;
      
      // Simulação da API para teste - remover em produção!
      // ------------------------------------------------------------------------
      // Em vez de fazer uma requisição real, vamos simular uma resposta da API
      await new Promise(resolve => setTimeout(resolve, 500)); // Simula delay da rede
      
      let mockData;
      if (fullUrl.includes('cities')) {
        mockData = [
          { id: '1', name: 'São Paulo' },
          { id: '2', name: 'Rio de Janeiro' },
          { id: '3', name: 'Belo Horizonte' },
          { id: '4', name: 'Brasília' },
          { id: '5', name: 'Salvador' }
        ];
      } else if (fullUrl.includes('categories')) {
        mockData = [
          { id: '1', name: 'Eletrônicos' },
          { id: '2', name: 'Roupas' },
          { id: '3', name: 'Alimentos' },
          { id: '4', name: 'Livros' },
          { id: '5', name: 'Jogos' }
        ];
      } else {
        mockData = [
          { id: '1', name: 'Item 1' },
          { id: '2', name: 'Item 2' },
          { id: '3', name: 'Item 3' }
        ];
      }
      // ------------------------------------------------------------------------
      
      // Código para requisição real (descomente em produção)
      // const response = await fetch(fullUrl);
      // if (!response.ok) {
      //   throw new Error(`Erro ao carregar dados: ${response.status}`);
      // }
      // const data = await response.json();
      
      // Usar os dados simulados para desenvolvimento
      const data = mockData;
      
      // Transformar dados em opções para o select
      const mappedOptions = Array.isArray(data) 
        ? data.map(item => ({
            value: String(item[valueField]),
            label: String(item[labelField])
          }))
        : [];
      
      setOptions(mappedOptions);
      hasLoadedRef.current = true;
      
      // Callback opcional para quando os dados são carregados
      if (onDataLoad) {
        onDataLoad(data);
      }
    } catch (error) {
      console.error('Erro ao carregar dados do ComboBox:', error);
    } finally {
      setLoading(false);
    }
  }, [url, queryParams, isOpen, loading, valueField, labelField, onDataLoad]);
  
  // Carregar dados inicialmente se preloadData for true
  useEffect(() => {
    if (preloadData && !hasLoadedRef.current) {
      loadData();
    }
  }, [preloadData, loadData]);
  
  // Função para lidar com a abertura do select
  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    
    // Se estiver abrindo e loadOnOpen for true, carrega os dados
    if (open && loadOnOpen && !hasLoadedRef.current) {
      loadData();
    }
  };

  // Função para lidar com mudanças no valor
  const handleChange = (value: string) => {
    if (onChange && name) {
      onChange(name, value);
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Select
              onValueChange={(value) => {
                field.onChange(value);
                handleChange(value);
              }}
              value={field.value}
              onOpenChange={handleOpenChange}
              {...props}
            >
              <SelectTrigger className={cn(className)}>
                <SelectValue placeholder={placeholder} />
                {loading && <Loader2 className="ml-auto h-4 w-4 animate-spin" />}
              </SelectTrigger>
              <SelectContent>
                {loading ? (
                  <div className="flex items-center justify-center py-2">
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    <span>Carregando...</span>
                  </div>
                ) : options.length === 0 ? (
                  <div className="py-2 px-2 text-sm text-gray-500">
                    Nenhum item encontrado
                  </div>
                ) : (
                  options.map((option) => (
                    <SelectItem 
                      key={option.value} 
                      value={option.value}
                    >
                      {option.label}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};