"use client"

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  type SortingState,
  getExpandedRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import type { Operacao } from "./doubleTableInterfaces"
import React from "react"

interface OperacoesTableProps {
  columns: ColumnDef<Operacao>[]
  data: Operacao[]
}

export function TabelaOperacoes({ columns, data }: OperacoesTableProps) {
    const [sorting, setSorting] = React.useState<SortingState>([])
  if (data.length === 0) {
    return <div className="text-muted-foreground p-2">Nenhuma operação registrada.</div>
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,    
  })

  return (
    <Table className="w-full text-sm">
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHead key={header.id}>
                {header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
