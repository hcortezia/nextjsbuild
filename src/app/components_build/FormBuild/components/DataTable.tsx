"use client";

// components/FormBuild/components/DataTable.tsx
import React, { useState, useEffect } from 'react';
import { BaseComponentProps } from '../types';
import { cn } from '@/lib/utils';
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal, Search } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface DataTableColumn {
  id?: string;
  field?: string;
  accessorKey?: string;
  accessorFn?: (row: any) => any;
  headerName?: string;
  header?: string | React.ReactNode | ((props: any) => React.ReactNode);
  cell?: string | React.ReactNode | ((props: any) => React.ReactNode);
  enableSorting?: boolean;
  enableHiding?: boolean;
  enableFiltering?: boolean;
  hidden?: boolean;
  type?: 'string' | 'number' | 'date' | 'boolean' | 'currency';
  width?: number | string;
  minWidth?: number | string;
  maxWidth?: number | string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  filterable?: boolean;
  resizable?: boolean;
}

export interface DataTableAction {
  id: string;
  label: string;
  icon?: string;
  onClick?: (row: any) => void;
  disabled?: boolean | ((row: any) => boolean);
  hidden?: boolean | ((row: any) => boolean);
}

interface DataTableProps extends BaseComponentProps {
  data: any[];
  columns: DataTableColumn[];
  rowKey?: string;
  actions?: DataTableAction[];
  enableRowSelection?: boolean;
  enableColumnResizing?: boolean;
  enableGlobalFilter?: boolean;
  enableColumnFilters?: boolean;
  enableSorting?: boolean;
  enablePagination?: boolean;
  enableHiding?: boolean;
  pageSize?: number;
  defaultPageIndex?: number;
  pageSizeOptions?: number[];
  globalFilterPlaceholder?: string;
  noResultsMessage?: string;
  showSelectedRowCount?: boolean;
  renderComponent?: (config: any, index: number) => React.ReactNode;
}

export const DataTable: React.FC<DataTableProps> = ({
  data = [],
  columns = [],
  rowKey = 'id',
  actions = [],
  enableRowSelection = true,
  enableColumnResizing = false,
  enableGlobalFilter = true,
  enableColumnFilters = true,
  enableSorting = true,
  enablePagination = true,
  enableHiding = true,
  pageSize = 10,
  defaultPageIndex = 0,
  pageSizeOptions = [10, 20, 50, 100],
  globalFilterPlaceholder = "Pesquisar...",
  noResultsMessage = "Nenhum resultado encontrado",
  showSelectedRowCount = true,
  className,
  renderComponent,
  ...props
}) => {
  // Configurar estados para a tabela
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");

  // Ajustar visibilidade inicial das colunas
  useEffect(() => {
    const initialVisibility: VisibilityState = {};
    columns.forEach(column => {
      const columnId = column.id || column.accessorKey || column.field || '';
      if (column.hidden === true && columnId) {
        initialVisibility[columnId] = false;
      }
    });
    
    if (Object.keys(initialVisibility).length > 0) {
      setColumnVisibility(prev => ({
        ...prev,
        ...initialVisibility
      }));
    }
  }, [columns]);

  // Converter as colunas para o formato do TanStack Table
  const tableColumns = React.useMemo(() => {
    const result: ColumnDef<any>[] = [];
    
    // Adicionar coluna de seleção, se habilitada
    if (enableRowSelection) {
      result.push({
        id: 'select',
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Selecionar todos"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Selecionar linha"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      });
    }
    
    // Converter colunas fornecidas
    columns.forEach(column => {
      const columnDef: ColumnDef<any> = {};
      
      // ID e acessor
      columnDef.id = column.id || column.accessorKey || column.field;
      
      if (column.accessorKey || column.field) {
        columnDef.accessorKey = column.accessorKey || column.field;
      } else if (column.accessorFn) {
        columnDef.accessorFn = column.accessorFn;
      }
      
      // Cabeçalho
      if (column.header) {
        columnDef.header = column.header;
      } else if (column.headerName) {
        // Se sortable for true, adicionar botão de ordenação
        if (column.sortable !== false && enableSorting) {
          columnDef.header = ({ column: tableColumn }) => (
            <Button
              variant="ghost"
              onClick={() => tableColumn.toggleSorting(tableColumn.getIsSorted() === "asc")}
              className={cn(
                "p-0 font-medium",
                column.align === 'center' && 'justify-center',
                column.align === 'right' && 'justify-end'
              )}
            >
              {column.headerName}
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        } else {
          columnDef.header = column.headerName;
        }
      }
      
      // Célula
      if (column.cell) {
        columnDef.cell = column.cell;
      } else {
        // Renderização padrão baseada no tipo
        columnDef.cell = ({ row, column: tableColumn }) => {
          const value = row.getValue(tableColumn.id);
          
          if (value === null || value === undefined) {
            return "";
          }
          
          // Formatação baseada no tipo
          switch (column.type) {
            case 'currency':
              return (
                <div 
                  className={cn(
                    'font-medium',
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right'
                  )}
                >
                  {typeof value === 'number' 
                    ? new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value)
                    : value
                  }
                </div>
              );
            case 'date':
              return (
                <div 
                  className={cn(
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right'
                  )}
                >
                  {value instanceof Date 
                    ? value.toLocaleDateString() 
                    : value
                  }
                </div>
              );
            case 'boolean':
              return (
                <div 
                  className={cn(
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right'
                  )}
                >
                  {value === true 
                    ? '✓' 
                    : value === false 
                      ? '✗' 
                      : ''
                  }
                </div>
              );
            default:
              return (
                <div 
                  className={cn(
                    column.align === 'center' && 'text-center',
                    column.align === 'right' && 'text-right'
                  )}
                >
                  {String(value)}
                </div>
              );
          }
        };
      }
      
      // Outras configurações
      columnDef.enableSorting = column.enableSorting ?? column.sortable ?? enableSorting;
      columnDef.enableHiding = column.enableHiding ?? enableHiding;
      
      if (column.width) {
        columnDef.meta = {
          ...(columnDef.meta || {}),
          width: column.width
        };
      }
      
      if (column.minWidth) {
        columnDef.meta = {
          ...(columnDef.meta || {}),
          minWidth: column.minWidth
        };
      }
      
      if (column.maxWidth) {
        columnDef.meta = {
          ...(columnDef.meta || {}),
          maxWidth: column.maxWidth
        };
      }
      
      // Adicionar a coluna ao resultado
      result.push(columnDef);
    });
    
    // Adicionar coluna de ações, se fornecida
    if (actions && actions.length > 0) {
      result.push({
        id: 'actions',
        cell: ({ row }) => {
          const record = row.original;
          
          // Filtrar ações com base em condições
          const visibleActions = actions.filter(action => {
            if (typeof action.hidden === 'function') {
              return !action.hidden(record);
            }
            return !action.hidden;
          });
          
          if (visibleActions.length === 0) {
            return null;
          }
          
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Abrir menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                {visibleActions.map((action, index) => {
                  const isDisabled = typeof action.disabled === 'function'
                    ? action.disabled(record)
                    : action.disabled;
                  
                  return (
                    <React.Fragment key={action.id || index}>
                      {index > 0 && <DropdownMenuSeparator />}
                      <DropdownMenuItem
                        disabled={isDisabled}
                        onClick={() => action.onClick && action.onClick(record)}
                      >
                        {renderComponent ? (
                          renderComponent({
                            xtype: 'container',
                            layout: 'horizontal',
                            className: 'items-center',
                            gap: 'sm',
                            items: [
                              action.icon ? {
                                xtype: 'icon',
                                name: action.icon,
                                size: 16,
                                className: 'mr-2'
                              } : null,
                              {
                                xtype: 'content',
                                text: action.label
                              }
                            ].filter(Boolean)
                          }, index)
                        ) : (
                          <>
                            {action.icon && (
                              <span className="mr-2">{action.icon}</span>
                            )}
                            {action.label}
                          </>
                        )}
                      </DropdownMenuItem>
                    </React.Fragment>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
        enableSorting: false,
        enableHiding: false,
      });
    }
    
    return result;
  }, [columns, actions, enableRowSelection, enableSorting, enableHiding, renderComponent]);

  // Inicializar a tabela
  const table = useReactTable({
    data,
    columns: tableColumns,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
    enableRowSelection,
    enableColumnResizing,
    enableGlobalFilter,
    enableMultiRowSelection: true,
    getRowId: (row) => String(row[rowKey]),
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: enablePagination ? getPaginationRowModel() : undefined,
    initialState: {
      pagination: {
        pageIndex: defaultPageIndex,
        pageSize,
      },
    },
  });

  // Renderizar a tabela
  return (
    <div className={cn("w-full", className)} {...props}>
      {/* Cabeçalho da tabela com filtros e controles */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4">
        {/* Filtro global */}
        {enableGlobalFilter && (
          <div className="flex items-center gap-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={globalFilterPlaceholder}
              value={globalFilter}
              onChange={(e) => setGlobalFilter(e.target.value)}
              className="h-9 w-[250px] lg:w-[300px]"
            />
          </div>
        )}
        
        {/* Controles de visualização */}
        <div className="flex items-center gap-2">
          {/* Seletor de colunas visíveis */}
          {enableHiding && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="ml-auto h-9">
                  Colunas <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
      
      {/* Tabela principal */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead 
                    key={header.id}
                    style={{
                      width: header.column.getSize(),
                      ...((header.column.columnDef.meta as any)?.style || {})
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell 
                      key={cell.id}
                      style={{
                        width: cell.column.getSize(),
                        ...((cell.column.columnDef.meta as any)?.style || {})
                      }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={table.getAllColumns().length}
                  className="h-24 text-center"
                >
                  {noResultsMessage}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Rodapé com paginação */}
      {(enablePagination || showSelectedRowCount) && (
        <div className="flex flex-wrap items-center justify-between gap-2 py-4">
          {/* Contador de linhas selecionadas */}
          {showSelectedRowCount && (
            <div className="text-sm text-muted-foreground">
              {table.getFilteredSelectedRowModel().rows.length} de{" "}
              {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
            </div>
          )}
          
          {/* Paginação */}
          {enablePagination && (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Anterior
              </Button>
              <span className="text-sm">
                Página {table.getState().pagination.pageIndex + 1} de{" "}
                {table.getPageCount() || 1}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Próxima
              </Button>
              
              {/* Seletor de tamanho de página */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    {table.getState().pagination.pageSize} por página <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {pageSizeOptions.map((size) => (
                    <DropdownMenuItem
                      key={size}
                      onClick={() => table.setPageSize(size)}
                    >
                      {size} por página
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      )}
    </div>
  );
};