"use client"

import type { ColumnDef } from "@tanstack/react-table"
import type { Operacao } from "./doubleTableInterfaces"
import { Button } from "./ui/button"
import { ArrowUpDown } from "lucide-react"

export const columnsOperacoes: ColumnDef<Operacao>[] = [
  {
    accessorKey: "sacado",
    header: "Sacado",
  },
  {
    accessorKey: "codigo",
    header: "Cód.",
  },
  {
    accessorKey: "titulo",
    header: "Título",
  },
  {
    accessorKey: "vencimento",
    header: "Vencimento",
    cell: ({ row }) => {
      const date = new Date(row.getValue("vencimento"))
      const formatted = new Intl.DateTimeFormat("pt-BR", {
        dateStyle: "short",
      }).format(date)

      return <div className="">{formatted}</div>
    },
  },
  {
    accessorKey: "dataDigitacao",
    header: "Digitação",
  },
  {
    accessorKey: "dataAtualizacao",
    header: "Atualizado em",
  },
  {
    accessorKey: "idTitulo",
    header: "Nosso Nº",
  },
  {
    accessorKey: "estado",
    header: "Estado",
  },
 {
  accessorKey: "valor",
  header: ({ column }) => (
    <div className="text-right">
    <Button
      className="cursor-pointer"
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      Valor (R$)
      <ArrowUpDown className="ml-1 h-2 w-2" />
    </Button>
    </div>
  ),
  cell: ({ getValue }) => {
    const valor = getValue<number>();
    return (
      <div className="pr-3 text-right">
        {valor.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}
      </div>
    );
  },
  enableSorting: true,
  sortingFn: "basic",
}



]
