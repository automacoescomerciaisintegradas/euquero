import React from 'react';
import { AlertTriangle, CheckCircle, XCircle, Info } from 'lucide-react';

interface Alert {
  id: string;
  type: 'warning' | 'success' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface AlertNotificationsProps {
  alerts: Alert[];
  onDismiss: (id: string) => void;
}

const AlertNotifications: React.FC<AlertNotificationsProps> = ({ alerts, onDismiss }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'success': return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getBackgroundColor = (type: string) => {
    switch (type) {
      case 'warning': return 'bg-yellow-50 border-yellow-200';
      case 'success': return 'bg-green-50 border-green-200';
      case 'error': return 'bg-red-50 border-red-200';
      default: return 'bg-blue-50 border-blue-200';
    }
  };

  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <div 
          key={alert.id} 
          className={`border rounded-lg p-4 ${getBackgroundColor(alert.type)}`}
        >
          <div className="flex items-start gap-3">
            <div className="mt-0.5">
              {getIcon(alert.type)}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <h4 className="font-medium text-gray-800">{alert.title}</h4>
                <button
                  onClick={() => onDismiss(alert.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
              <div className="flex items-center justify-between mt-3">
                <p className="text-xs text-gray-500">
                  {alert.timestamp.toLocaleDateString('pt-BR')} às {alert.timestamp.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                </p>
                {alert.action && (
                  <button
                    onClick={alert.action.onClick}
                    className="text-sm font-medium text-blue-600 hover:text-blue-800"
                  >
                    {alert.action.label}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertNotifications;