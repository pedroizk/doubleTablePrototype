export type Operacao = {
  idOperacao: number;
  sacado: string;
  titulo: string;
  codigo: string;
  valor: number;
  vencimento: string;
  valorOriginal: number;
  dataDigitacao: string;
  idCedente: number;
  idSacado: number;
  bordero: number;
  dataEmissao: string;
  estado: number;
  recompra: number | null;
  dataAtualizacao: string;
  codigoCliente: string;
  nomeSacado: string;
  idTitulo: string;
  est_port: string;
  numero_port: string;
};


export type Cliente = {
  cliente: string;
  valorOperado: number;
  titulosAtraso: number;
  operacoes: Operacao[];
};

export interface BaseCliente {
 operacoes: Operacao[];
}