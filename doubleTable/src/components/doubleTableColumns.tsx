"use client"
 
import type { ColumnDef } from "@tanstack/react-table"
import { ChevronDown, ChevronRight } from "lucide-react";
import type { Cliente } from "./doubleTableInterfaces";
import { ArrowUpDown } from "lucide-react"
import { Button } from "./ui/button";

export const columns: ColumnDef<Cliente>[] = [
  
  {
    id: "expander",
    header: () => null,  
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <button onClick={() => row.toggleExpanded()}>
          {row.getIsExpanded() ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </button>
      ) : null;
    }
  },
  {
    accessorKey: "cliente",
    header: "Nome do Cliente"
  },
  {
    accessorKey: "valorOperado",
    header: "Valor Operado"
  },
  {
    id: "quantidadeAtrasados",
    accessorFn: (row) => row.operacoes.length,
    header: ({ column }) => {
      return (
        <Button className="cursor-pointer"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Quantidade de atrasados
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {return <div className="pl-3">{row.original.operacoes.length}</div>},
    enableSorting: true,
    sortingFn: "basic",
  },
  {
    accessorKey: "titulosAtraso",
    header: "Títulos em Atraso"
  },
  {
  id: "quantidadeDeDinheiro",
  accessorFn: (row) =>
    row.operacoes.reduce((acc, op) => acc + (op.valor ?? 0), 0),
  header: ({ column }) => (
    <div className="text-right pr-2">
    <Button
      className="cursor-pointer"
      variant="ghost"
      onClick={() =>
        column.toggleSorting(column.getIsSorted() === "asc")
      }
    >
      Valor Total (R$)
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
    </div>
  ),
  cell: ({ row }) => {
    const total = row.original.operacoes.reduce(
      (acc, op) => acc + (op.valor ?? 0),
      0
    );
    return <div className="text-right font-medium px-5">{total.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}
    </div>


  },
  enableSorting: true,
  sortingFn: "basic",
}
];
