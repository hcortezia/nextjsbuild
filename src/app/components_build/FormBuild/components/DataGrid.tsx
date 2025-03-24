"use client";

// components/FormBuild/components/DataGrid.tsx
import React, { useState, useMemo } from 'react';
import { BaseComponentProps } from '../types';
import { cn } from '@/lib/utils';

// Tipos para o DataGrid
export interface ColumnDefinition {
  field: string;
  headerName: string;
  width?: number | string;
  flex?: number;
  renderCell?: (value: any, row: any, index: number) => React.ReactNode;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  type?: 'string' | 'number' | 'date' | 'boolean' | 'currency';
}

export interface GridAction {
  id: string;
  label: string;
  icon?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  onClick?: (row: any) => void;
}

interface DataGridProps extends BaseComponentProps {
  data: any[];
  columns: ColumnDefinition[];
  actions?: GridAction[];
  rowKey?: string; // Campo usado como chave única
  pagination?: boolean;
  pageSize?: number;
  className?: string;
  striped?: boolean;
  hoverable?: boolean;
  sortable?: boolean;
  renderComponent?: (config: any, index: number) => React.ReactNode;
}

export const DataGrid: React.FC<DataGridProps> = ({
  data = [],
  columns = [],
  actions = [],
  rowKey = 'id',
  pagination = false,
  pageSize = 10,
  className,
  striped = true,
  hoverable = true,
  sortable = false,
  renderComponent,
  ...props
}) => {
  // Estado para paginação
  const [currentPage, setCurrentPage] = useState(1);
  
  // Estado para ordenação
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: 'ascending' | 'descending';
  }>({
    key: null,
    direction: 'ascending'
  });

  // Função para ordenação
  const handleSort = (key: string) => {
    if (!sortable) return;
    
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
  };

  // Dados ordenados e paginados
  const sortedData = useMemo(() => {
    let sortableData = [...data];
    
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return sortableData;
  }, [data, sortConfig]);

  // Dados da página atual
  const currentData = useMemo(() => {
    if (!pagination) return sortedData;
    
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize, pagination]);

  // Total de páginas
  const totalPages = useMemo(() => {
    return Math.ceil(data.length / pageSize);
  }, [data, pageSize]);

  // Função para renderizar o valor da célula
  const renderCellValue = (column: ColumnDefinition, row: any, index: number) => {
    const value = row[column.field];
    
    // Se houver uma função renderCell personalizada, use-a
    if (column.renderCell) {
      return column.renderCell(value, row, index);
    }
    
    // Formatação baseada no tipo
    switch (column.type) {
      case 'currency':
        return typeof value === 'number' 
          ? value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) 
          : value;
      case 'date':
        return value instanceof Date 
          ? value.toLocaleDateString() 
          : value;
      case 'boolean':
        return value === true 
          ? '✓' 
          : value === false 
            ? '✗' 
            : '';
      default:
        return value;
    }
  };

  // Função para renderizar ações
  const renderActions = (row: any) => {
    if (!actions || actions.length === 0) return null;
    
    if (renderComponent) {
      return (
        <div className="flex justify-end space-x-2">
          {actions.map((action, index) => {
            const actionConfig = {
              xtype: 'button',
              text: action.label,
              variant: action.variant || 'default',
              size: 'sm',
              onClick: () => action.onClick && action.onClick(row),
              ...(action.icon ? {
                items: [
                  {
                    xtype: 'icon',
                    name: action.icon,
                    size: 14,
                    className: 'mr-1'
                  },
                  {
                    xtype: 'content',
                    variant: 'span',
                    text: action.label
                  }
                ]
              } : {})
            };
            
            return renderComponent(actionConfig, index);
          })}
        </div>
      );
    }
    
    // Fallback simples se renderComponent não estiver disponível
    return (
      <div className="flex justify-end space-x-2">
        {actions.map((action, index) => (
          <button 
            key={action.id || index}
            onClick={() => action.onClick && action.onClick(row)}
            className="text-blue-600 hover:text-blue-900 text-sm"
          >
            {action.label}
          </button>
        ))}
      </div>
    );
  };

  // Classes para as linhas
  const rowClasses = cn(
    'border-b border-gray-200',
    striped && 'odd:bg-white even:bg-gray-50',
    hoverable && 'hover:bg-gray-100'
  );

  // Classes para cabeçalhos
  const headerClasses = cn(
    'px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider',
    sortable && 'cursor-pointer hover:bg-gray-100'
  );

  const { onChange, ...restProps } = props;

  return (
    <div className={cn('overflow-x-auto', className)} {...restProps}>
      <table className="min-w-full bg-white border border-gray-200 rounded-md">
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th 
                key={column.field || index}
                className={cn(
                  headerClasses,
                  column.align === 'center' && 'text-center',
                  column.align === 'right' && 'text-right'
                )}
                style={{ width: column.width }}
                onClick={() => column.sortable !== false && handleSort(column.field)}
              >
                <div className="flex items-center">
                  <span className="flex-1">{column.headerName}</span>
                  {sortable && sortConfig.key === column.field && (
                    <span className="ml-1">
                      {sortConfig.direction === 'ascending' ? '↑' : '↓'}
                    </span>
                  )}
                </div>
              </th>
            ))}
            {actions && actions.length > 0 && (
              <th className={cn(headerClasses, 'text-right')}>Ações</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {currentData.map((row, rowIndex) => (
            <tr key={row[rowKey] || rowIndex} className={rowClasses}>
              {columns.map((column, colIndex) => (
                <td 
                  key={`${rowIndex}-${column.field || colIndex}`}
                  className={cn(
                    'px-4 py-3 whitespace-nowrap',
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right'
                  )}
                >
                  {renderCellValue(column, row, rowIndex)}
                </td>
              ))}
              {actions && actions.length > 0 && (
                <td className="px-4 py-3 whitespace-nowrap text-right">
                  {renderActions(row)}
                </td>
              )}
            </tr>
          ))}
          {currentData.length === 0 && (
            <tr>
              <td 
                colSpan={columns.length + (actions && actions.length > 0 ? 1 : 0)}
                className="px-4 py-8 text-center text-gray-500"
              >
                Nenhum registro encontrado
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
      {/* Paginação */}
      {pagination && totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
          <div className="flex justify-between sm:hidden">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className={cn(
                "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md",
                currentPage === 1 ? "bg-gray-100 text-gray-400" : "bg-white text-gray-700 hover:bg-gray-50"
              )}
            >
              Anterior
            </button>
            <span className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700">
              Página {currentPage} de {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={cn(
                "relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md",
                currentPage === totalPages ? "bg-gray-100 text-gray-400" : "bg-white text-gray-700 hover:bg-gray-50"
              )}
            >
              Próxima
            </button>
          </div>
          <div className="hidden sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Mostrando <span className="font-medium">{Math.min((currentPage - 1) * pageSize + 1, data.length)}</span> a <span className="font-medium">{Math.min(currentPage * pageSize, data.length)}</span> de <span className="font-medium">{data.length}</span> resultados
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                  className={cn(
                    "relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium",
                    currentPage === 1 ? "text-gray-400" : "text-gray-500 hover:bg-gray-50"
                  )}
                >
                  Primeira
                </button>
                <button
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className={cn(
                    "relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium",
                    currentPage === 1 ? "text-gray-400" : "text-gray-500 hover:bg-gray-50"
                  )}
                >
                  Anterior
                </button>
                {/* Central page numbers */}
                {Array.from({ length: Math.min(5, totalPages) }).map((_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={cn(
                        "relative inline-flex items-center px-4 py-2 border text-sm font-medium",
                        currentPage === pageNum 
                          ? "z-10 bg-blue-50 border-blue-500 text-blue-600" 
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      )}
                    >
                      {pageNum}
                    </button>
                  );
                })}
                <button
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className={cn(
                    "relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium",
                    currentPage === totalPages ? "text-gray-400" : "text-gray-500 hover:bg-gray-50"
                  )}
                >
                  Próxima
                </button>
                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                  className={cn(
                    "relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium",
                    currentPage === totalPages ? "text-gray-400" : "text-gray-500 hover:bg-gray-50"
                  )}
                >
                  Última
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};