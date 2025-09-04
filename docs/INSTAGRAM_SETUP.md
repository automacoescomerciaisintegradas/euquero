# Configuração da Automação do Instagram

Este documento explica como configurar o ambiente Python para automação do Instagram no projeto EuQuero.

## Pré-requisitos

- Python 3.8 ou superior instalado
- Conta do Instagram (recomendado usar conta dedicada para automação)
- Acesso ao terminal/prompt de comando

## Instalação Automática (Windows)

1. Navegue até a pasta `scripts` do projeto
2. Execute o arquivo `setup-python-env.bat`
3. Aguarde a instalação das dependências

```bash
cd scripts
setup-python-env.bat
```

## Instalação Manual

### 1. Criar Ambiente Virtual

```bash
# Criar ambiente virtual
python -m venv instagram-env

# Ativar ambiente virtual (Windows)
instagram-env\Scripts\activate.bat

# Ativar ambiente virtual (Linux/Mac)
source instagram-env/bin/activate
```

### 2. Instalar Dependências

```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 3. Testar Instalação

```bash
python instagram-automation.py account_info seu_usuario sua_senha
```

## Uso do Script

### Obter Informações da Conta

```bash
python instagram-automation.py account_info usuario senha
```

### Enviar Foto

```bash
python instagram-automation.py upload_photo usuario senha "caminho/imagem.jpg" "Legenda da foto" "hashtag1,hashtag2,hashtag3"
```

### Enviar Story

```bash
python instagram-automation.py upload_story usuario senha "caminho/imagem.jpg"
```

## Integração com o Sistema EuQuero

O script Python é integrado ao backend Node.js através dos seguintes endpoints:

- `POST /api/instagram/connect` - Conectar conta do Instagram
- `POST /api/instagram/upload-photo` - Enviar foto
- `POST /api/instagram/upload-story` - Enviar story
- `GET /api/instagram/account/:userId` - Obter informações da conta
- `DELETE /api/instagram/disconnect/:userId` - Desconectar conta

## Segurança

### Boas Práticas

1. **Nunca hardcode credenciais** no código
2. Use **variáveis de ambiente** para informações sensíveis
3. Implemente **rate limiting** para evitar bloqueios
4. Use **contas dedicadas** para automação
5. **Monitore logs** para detectar problemas

### Variáveis de Ambiente

Crie um arquivo `.env` na pasta `scripts`:

```env
INSTAGRAM_USERNAME=seu_usuario
INSTAGRAM_PASSWORD=sua_senha
LOG_LEVEL=INFO
```

### Tratamento de Erros

O script trata automaticamente os seguintes erros:

- `LoginRequired` - Credenciais inválidas
- `ChallengeRequired` - Verificação de segurança necessária
- `PleaseWaitFewMinutes` - Limite de requisições atingido

## Limites do Instagram

### Limites Recomendados

- **Posts**: Máximo 25 por dia
- **Stories**: Máximo 100 por dia
- **Comentários**: Máximo 180 por hora
- **Curtidas**: Máximo 1000 por hora

### Sinais de Alerta

- Mensagens de "Tente novamente mais tarde"
- Captchas frequentes
- Bloqueios temporários
- Redução no alcance das postagens

## Troubleshooting

### Erro: "instagrapi não está instalado"

```bash
pip install instagrapi
```

### Erro: "Login necessário"

- Verifique se as credenciais estão corretas
- Tente fazer login manual no Instagram
- Verifique se a conta não está bloqueada

### Erro: "Desafio de segurança necessário"

- Faça login manual no Instagram
- Complete a verificação de segurança
- Tente novamente após alguns minutos

### Erro: "Muitas tentativas de login"

- Aguarde 15-30 minutos
- Use um IP diferente se possível
- Verifique se não há outros bots usando a mesma conta

## Logs e Monitoramento

Os logs são salvos em `instagram_automation.log` e incluem:

- Tentativas de login
- Uploads realizados
- Erros e exceções
- Informações de debug

### Exemplo de Log

```
2024-01-15 10:30:15 - INFO - Login realizado com sucesso para usuario_teste
2024-01-15 10:30:45 - INFO - Upload realizado com sucesso! ID: 3234567890123456789
2024-01-15 10:31:00 - ERROR - Limite de uploads atingido. Aguarde alguns minutos.
```

## Próximos Passos

1. Configure sua conta do Instagram no painel EuQuero
2. Teste o envio de uma foto
3. Configure automações baseadas em eventos
4. Monitore os logs para otimizar performance

## Suporte

Para suporte técnico:
- Email: contato@fcaq.com.br
- Telegram: https://t.me/+9cdym9gvPQ9iOWNh
- WhatsApp: +55 88 988712711