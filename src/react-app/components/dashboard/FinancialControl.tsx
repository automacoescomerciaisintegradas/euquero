import React, { useState, useEffect } from 'react';

interface Transaction {
  id: string;
  descricao: string;
  valor: number;
  status: 'credit' | 'debit';
  data: string;
}

// Função utilitária para exportar CSV
function exportToCSV(transactions: Transaction[]): void {
  const header = ['ID', 'Descrição', 'Valor', 'Status', 'Data'];
  const rows = transactions.map(t => [t.id, t.descricao, t.valor, t.status, t.data]);
  let csvContent = header.join(',') + '\n' + rows.map(r => r.join(',')).join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'transacoes.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}

const FinancialControl: React.FC = () => {
  const [txData, setTxData] = useState<Transaction[]>([]);
  const [filtro, setFiltro] = useState<string>('');
  const [tipo, setTipo] = useState<'credit' | 'debit' | ''>('');
  const [dataInicio, setDataInicio] = useState<string>('');
  const [dataFim, setDataFim] = useState<string>('');

  // Buscar userId do contexto global/localStorage (ajuste conforme sua autenticação)
  const userId = window.localStorage.getItem('userId') || '1';

  useEffect(() => {
    async function fetchData() {
      // Simulando fetch
      const mockData: Transaction[] = [
        { id: '1', descricao: 'Venda Pix', valor: 100.50, status: 'credit', data: '2025-09-01' },
        { id: '2', descricao: 'Compra', valor: -50.00, status: 'debit', data: '2025-09-02' },
      ];
      setTxData(mockData);
    }
    fetchData();
  }, []);

  const filteredTxs = txData.filter(t => {
    if (filtro && !t.descricao.toLowerCase().includes(filtro.toLowerCase())) return false;
    if (tipo && t.status !== tipo) return false;
    if (dataInicio && new Date(t.data) < new Date(dataInicio)) return false;
    if (dataFim && new Date(t.data) > new Date(dataFim)) return false;
    return true;
  });

  const totalCredito = filteredTxs
    .filter(t => t.status === 'credit')
    .reduce((sum, t) => sum + t.valor, 0);
  const totalDebito = filteredTxs
    .filter(t => t.status === 'debit')
    .reduce((sum, t) => sum + Math.abs(t.valor), 0);
  const saldo = totalCredito - totalDebito;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Controle Financeiro</h3>
      {/* Filtros */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
        <input
          type="text"
          placeholder="Filtrar por descrição"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value as 'credit' | 'debit' | '')}
          className="border p-2 rounded"
        >
          <option value="">Todos</option>
          <option value="credit">Crédito</option>
          <option value="debit">Débito</option>
        </select>
        <input
          type="date"
          value={dataInicio}
          onChange={(e) => setDataInicio(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={dataFim}
          onChange={(e) => setDataFim(e.target.value)}
          className="border p-2 rounded"
        />
      </div>

      {/* Resumo */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-green-600 font-bold">Total Crédito: R$ {totalCredito.toFixed(2)}</div>
        <div className="text-red-600 font-bold">Total Débito: R$ {totalDebito.toFixed(2)}</div>
        <div className={`font-bold ${saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          Saldo: R$ {saldo.toFixed(2)}
        </div>
      </div>

      {/* Tabela */}
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Descrição</th>
              <th className="px-4 py-2">Valor</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Data</th>
            </tr>
          </thead>
          <tbody>
            {filteredTxs.map(t => (
              <tr key={t.id} className="border-b">
                <td className="px-4 py-2">{t.id}</td>
                <td className="px-4 py-2">{t.descricao}</td>
                <td className="px-4 py-2 text-green-600 font-semibold">R$ {Number(t.valor).toFixed(2)}</td>
                <td className={`px-4 py-2 font-bold ${t.status === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                  {t.status}
                </td>
                <td className="px-4 py-2">{t.data}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => exportToCSV(filteredTxs)}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Exportar CSV
      </button>
    </div>
  );
};

export default FinancialControl;
