import React, { useState, useEffect } from 'react';
import { Users, Filter, Search } from 'lucide-react';

interface Lead {
  id: number;
  email: string;
  phone?: string;
  name?: string;
  type: 'frio' | 'quente';
  source: string;
  created_at: string;
}

export default function LeadManagement() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filteredLeads, setFilteredLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'frio' | 'quente'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({ total: 0, quentes: 0, frios: 0 });

  useEffect(() => {
    fetchLeads();
    fetchStats();
  }, []);

  useEffect(() => {
    let result = leads;
    
    // Aplicar filtro por tipo
    if (filter !== 'all') {
      result = result.filter(lead => lead.type === filter);
    }
    
    // Aplicar filtro de busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(lead => 
        lead.email.toLowerCase().includes(term) ||
        (lead.name && lead.name.toLowerCase().includes(term)) ||
        (lead.phone && lead.phone.includes(term))
      );
    }
    
    setFilteredLeads(result);
  }, [leads, filter, searchTerm]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('authToken');
      
      const response = await fetch('/api/leads', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setLeads(result.leads);
      } else {
        console.error('Erro ao buscar leads:', result.error);
        // Usar dados de exemplo em caso de erro
        setLeads(getSampleLeads());
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
      // Usar dados de exemplo em caso de erro
      setLeads(getSampleLeads());
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      const response = await fetch('/api/leads/stats', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      const result = await response.json();
      
      if (response.ok) {
        setStats(result.stats);
      } else {
        console.error('Erro ao buscar estatísticas:', result.error);
      }
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
    }
  };

  const getSampleLeads = (): Lead[] => {
    return [
      {
        id: 1,
        email: 'joao.silva@example.com',
        phone: '(11) 99999-9999',
        name: 'João Silva',
        type: 'quente',
        source: 'registration',
        created_at: '2023-05-15T10:30:00Z'
      },
      {
        id: 2,
        email: 'maria.santos@example.com',
        name: 'Maria Santos',
        type: 'frio',
        source: 'registration',
        created_at: '2023-05-14T14:20:00Z'
      },
      {
        id: 3,
        email: 'pedro.almeida@example.com',
        phone: '(21) 98888-8888',
        name: 'Pedro Almeida',
        type: 'quente',
        source: 'registration',
        created_at: '2023-05-13T09:15:00Z'
      }
    ];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getTypeBadge = (type: 'frio' | 'quente') => {
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
        type === 'quente' 
          ? 'bg-green-100 text-green-800' 
          : 'bg-blue-100 text-blue-800'
      }`}>
        {type === 'quente' ? 'Quente' : 'Frio'}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <h3 className="text-lg font-medium text-gray-900">Gestão de Leads</h3>
          
          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
            {/* Filtro por tipo */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value as 'all' | 'frio' | 'quente')}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Todos os leads</option>
                <option value="quente">Leads Quentes</option>
                <option value="frio">Leads Frios</option>
              </select>
            </div>
            
            {/* Busca */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Buscar leads..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-1 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lead
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contato
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tipo
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Data
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLeads.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500">
                  Nenhum lead encontrado
                </td>
              </tr>
            ) : (
              filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-gray-500" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {lead.name || 'Nome não informado'}
                        </div>
                        <div className="text-sm text-gray-500">{lead.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{lead.phone || 'Telefone não informado'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getTypeBadge(lead.type)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(lead.created_at)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Total de leads: <span className="font-medium">{stats.total}</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-700">
              Leads quentes: <span className="font-medium text-green-600">
                {stats.quentes}
              </span>
            </div>
            <div className="text-sm text-gray-700">
              Leads frios: <span className="font-medium text-blue-600">
                {stats.frios}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}