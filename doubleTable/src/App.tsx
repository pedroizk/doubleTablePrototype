import type { Cliente} from "./components/doubleTableInterfaces"
import { clientes } from "./data/data"
import { TabelaClientes } from "./components/tabelaClientes"
import { columns } from "./components/doubleTableColumns"


function App() {
  

  return (
  <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tabela de Clientes com Operações</h1>
      <TabelaClientes<Cliente, unknown> columns={columns} data={clientes} />
    </div>
  )
}

export default App
