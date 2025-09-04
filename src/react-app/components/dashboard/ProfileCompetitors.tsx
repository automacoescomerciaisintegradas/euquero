import React from 'react';
import { Users, Trophy, TrendingUp, TrendingDown } from 'lucide-react';

interface Competitor {
  id: string;
  username: string;
  followers: number;
  engagementRate: number;
  growth: number;
  posts: number;
}

interface ProfileCompetitorsProps {
  competitors: Competitor[];
}

const ProfileCompetitors: React.FC<ProfileCompetitorsProps> = ({ competitors }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <Users className="w-5 h-5" />
          Competição do Perfil
        </h3>
      </div>
      
      <div className="divide-y divide-gray-200">
        {competitors.length === 0 ? (
          <div className="p-12 text-center">
            <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-800 mb-2">Nenhum competidor encontrado</h4>
            <p className="text-gray-600">
              Analisaremos seus concorrentes e forneceremos insights em breve
            </p>
          </div>
        ) : (
          competitors.map((competitor) => (
            <div key={competitor.id} className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
                  <div>
                    <h4 className="font-medium text-gray-800">@{competitor.username}</h4>
                    <p className="text-sm text-gray-600">
                      {competitor.followers.toLocaleString()} seguidores
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2 mb-1">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium text-gray-800">
                      {competitor.engagementRate}%
                    </span>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    {competitor.growth > 0 ? (
                      <TrendingUp className="w-3 h-3 text-green-500" />
                    ) : (
                      <TrendingDown className="w-3 h-3 text-red-500" />
                    )}
                    <span className={`text-xs ${competitor.growth > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {competitor.growth > 0 ? '+' : ''}{competitor.growth}%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span>{competitor.posts} posts</span>
                <button className="text-blue-600 hover:text-blue-800 font-medium">
                  Ver perfil
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfileCompetitors;