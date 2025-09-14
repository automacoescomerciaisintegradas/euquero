import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Switch,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress
} from '@mui/material';
import { Shield, Download, Trash2, AlertTriangle } from 'lucide-react';

const PrivacySettings = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [dataConsent, setDataConsent] = useState(true);

  const handleDataExport = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/privacy/data');
      if (!response.ok) throw new Error('Falha ao exportar dados');
      
      const data = await response.json();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'meus_dados.json';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      setSuccess('Seus dados foram exportados com sucesso');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDataDeletion = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/privacy/data-deletion', {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Falha ao solicitar exclusão de dados');
      
      setSuccess('Sua solicitação de exclusão de dados foi recebida');
      setDeleteDialogOpen(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleConsentChange = async (checked: boolean) => {
    try {
      setLoading(true);
      const response = await fetch('/api/privacy/consent', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ consent: checked }),
      });
      if (!response.ok) throw new Error('Falha ao atualizar consentimento');
      
      setDataConsent(checked);
      setSuccess('Suas preferências de consentimento foram atualizadas');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      <Box className="flex items-center gap-2 mb-6">
        <Shield className="text-blue-500" size={24} />
        <Typography variant="h5">Configurações de Privacidade</Typography>
      </Box>

      {error && (
        <Alert severity="error" className="mb-4" onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" className="mb-4" onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      <Box className="space-y-4">
        {/* Consentimento de Dados */}
        <Paper className="p-4">
          <Box className="flex items-center justify-between">
            <Box>
              <Typography variant="subtitle1" className="font-medium">
                Processamento de Dados
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Permita que processemos seus dados para melhorar nossos serviços
              </Typography>
            </Box>
            <Switch
              checked={dataConsent}
              onChange={(e) => handleConsentChange(e.target.checked)}
              disabled={loading}
            />
          </Box>
        </Paper>

        {/* Exportação de Dados */}
        <Paper className="p-4">
          <Box className="flex items-center justify-between">
            <Box>
              <Typography variant="subtitle1" className="font-medium">
                Exportar Meus Dados
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Baixe uma cópia de todos os seus dados
              </Typography>
            </Box>
            <Button
              variant="outlined"
              startIcon={<Download size={18} />}
              onClick={handleDataExport}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : 'Exportar'}
            </Button>
          </Box>
        </Paper>

        {/* Exclusão de Dados */}
        <Paper className="p-4">
          <Box className="flex items-center justify-between">
            <Box>
              <Typography variant="subtitle1" className="font-medium text-red-600">
                Excluir Meus Dados
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Solicite a exclusão permanente de todos os seus dados
              </Typography>
            </Box>
            <Button
              variant="outlined"
              color="error"
              startIcon={<Trash2 size={18} />}
              onClick={() => setDeleteDialogOpen(true)}
              disabled={loading}
            >
              Solicitar
            </Button>
          </Box>
        </Paper>
      </Box>

      {/* Diálogo de Confirmação de Exclusão */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle className="flex items-center gap-2">
          <AlertTriangle className="text-red-500" size={24} />
          Confirmar Exclusão de Dados
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" gutterBottom>
            Você está prestes a solicitar a exclusão de todos os seus dados. Esta ação não pode ser desfeita.
          </Typography>
          <Typography variant="body2" color="error">
            Após a exclusão:
          </Typography>
          <ul className="list-disc ml-6 mt-2 space-y-1">
            <li>Sua conta será permanentemente encerrada</li>
            <li>Todos os seus dados pessoais serão excluídos</li>
            <li>Você perderá acesso a todos os serviços</li>
          </ul>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setDeleteDialogOpen(false)}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button
            onClick={handleDataDeletion}
            variant="contained"
            color="error"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Confirmar Exclusão'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PrivacySettings;