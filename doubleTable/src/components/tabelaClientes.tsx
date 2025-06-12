"use client"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type SortingState,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
  type Updater,
  type ExpandedState,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// import { Button } from "@/components/ui/button"
import type { BaseCliente } from "./doubleTableInterfaces"
import { columnsOperacoes } from "./columnsOperacoes"
import { TabelaOperacoes } from "./tabelaOperacoes"
import React from "react"

interface DataTableProps<TData extends BaseCliente, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function TabelaClientes<TData extends BaseCliente, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {

  const [sorting, setSorting] = React.useState<SortingState>([])
  const defaultExpanded: Record<string, boolean> = {}
  data.forEach((cliente, idx) => {
    if (cliente.operacoes.length > 0) {
      defaultExpanded[idx.toString()] = true
    }
  })


  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: (row) => row.original.operacoes.length > 0,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      
    },
    initialState: {
      expanded: defaultExpanded
    },
    onSortingChange: setSorting,
    
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <React.Fragment key={row.id}>
              {/* Linha principal do cliente */}
              <TableRow
                data-state={row.getIsSelected() && "selected"}
                onClick={() => row.toggleExpanded()}
                className="cursor-pointer"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>

              {/* Linha expansível com detalhes, mostrada se expandida */}
              {row.getIsExpanded() && (
                <TableRow>
                  <TableCell colSpan={row.getVisibleCells().length} className="bg-muted py-2 px-4">
                    {/* Componente de tabela de operações */}
                    <TabelaOperacoes data={row.original.operacoes} columns={columnsOperacoes} />
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
