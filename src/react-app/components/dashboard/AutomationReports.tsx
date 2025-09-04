import React, { useState } from 'react';
import { BarChart3, Download, Calendar, Filter } from 'lucide-react';

interface ReportData {
  date: string;
  comments: number;
  dms: number;
  stories: number;
  lives: number;
  engagement: number;
}

const AutomationReports: React.FC = () => {
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');
  const [reportType, setReportType] = useState<'engagement' | 'usage' | 'performance'>('engagement');

  // Mock data for reports
  const reportData: ReportData[] = [
    { date: '2024-01-01', comments: 25, dms: 15, stories: 8, lives: 2, engagement: 78 },
    { date: '2024-01-02', comments: 32, dms: 18, stories: 12, lives: 3, engagement: 82 },
    { date: '2024-01-03', comments: 28, dms: 22, stories: 10, lives: 1, engagement: 75 },
    { date: '2024-01-04', comments: 41, dms: 25, stories: 15, lives: 4, engagement: 88 },
    { date: '2024-01-05', comments: 35, dms: 20, stories: 11, lives: 2, engagement: 85 },
    { date: '2024-01-06', comments: 29, dms: 17, stories: 9, lives: 3, engagement: 79 },
    { date: '2024-01-07', comments: 38, dms: 23, stories: 13, lives: 5, engagement: 91 },
  ];

  const handleExport = () => {
    alert('Relatório exportado com sucesso!');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Relatórios de Automação
          </h3>
          <div className="flex gap-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-500" />
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="7d">Últimos 7 dias</option>
                <option value="30d">Últimos 30 dias</option>
                <option value="90d">Últimos 90 dias</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value as any)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="engagement">Engajamento</option>
                <option value="usage">Uso</option>
                <option value="performance">Performance</option>
              </select>
            </div>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Exportar
            </button>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">Comentários Respondidos</p>
            <p className="text-2xl font-bold text-blue-600">271</p>
            <p className="text-xs text-blue-700 mt-1">+12% em relação ao mês anterior</p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-sm text-purple-800 font-medium">Mensagens Enviadas</p>
            <p className="text-2xl font-bold text-purple-600">189</p>
            <p className="text-xs text-purple-700 mt-1">+8% em relação ao mês anterior</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-sm text-green-800 font-medium">Tempo Economizado</p>
            <p className="text-2xl font-bold text-green-600">42h</p>
            <p className="text-xs text-green-700 mt-1">Aproximadamente 1.5 dias por semana</p>
          </div>
        </div>
        
        <div className="border border-gray-200 rounded-lg p-4">
          <h4 className="font-medium text-gray-800 mb-4">Desempenho por Dia</h4>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Data</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Comentários</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">DMs</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Stories</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Lives</th>
                  <th className="text-left py-2 text-sm font-medium text-gray-600">Engajamento</th>
                </tr>
              </thead>
              <tbody>
                {reportData.map((data, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 text-sm">{data.date}</td>
                    <td className="py-3 text-sm">{data.comments}</td>
                    <td className="py-3 text-sm">{data.dms}</td>
                    <td className="py-3 text-sm">{data.stories}</td>
                    <td className="py-3 text-sm">{data.lives}</td>
                    <td className="py-3 text-sm">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-2 mr-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${data.engagement}%` }}
                          ></div>
                        </div>
                        <span>{data.engagement}%</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationReports;