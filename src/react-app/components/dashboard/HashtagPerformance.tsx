import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface HashtagData {
  hashtag: string;
  posts: number;
  impressions: number;
  engagements: number;
  reach: number;
}

interface HashtagPerformanceProps {
  data: HashtagData[];
}

const HashtagPerformance: React.FC<HashtagPerformanceProps> = ({ data }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800">
          Desempenho por Hashtag
        </h3>
      </div>
      
      <div className="p-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hashtag" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar 
                dataKey="posts" 
                name="Posts" 
                fill="#3b82f6" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="impressions" 
                name="Impressões" 
                fill="#10b981" 
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="engagements" 
                name="Engajamentos" 
                fill="#8b5cf6" 
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Hashtag Mais Usada</h4>
            <p className="text-2xl font-bold text-blue-600">
              #{data.reduce((max, item) => item.posts > max.posts ? item : max, data[0]).hashtag}
            </p>
            <p className="text-sm text-gray-600">
              {Math.max(...data.map(item => item.posts))} posts
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Maior Engajamento</h4>
            <p className="text-2xl font-bold text-green-600">
              #{data.reduce((max, item) => item.engagements > max.engagements ? item : max, data[0]).hashtag}
            </p>
            <p className="text-sm text-gray-600">
              {Math.max(...data.map(item => item.engagements)).toLocaleString()} engajamentos
            </p>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-800 mb-2">Maior Alcance</h4>
            <p className="text-2xl font-bold text-purple-600">
              #{data.reduce((max, item) => item.reach > max.reach ? item : max, data[0]).hashtag}
            </p>
            <p className="text-sm text-gray-600">
              {Math.max(...data.map(item => item.reach)).toLocaleString()} alcance
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HashtagPerformance;