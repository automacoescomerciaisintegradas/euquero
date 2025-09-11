# Configuração do Sistema de Autenticação OAuth

Para que o sistema de autenticação OAuth funcione corretamente, você precisa configurar as credenciais dos provedores (Google, GitHub, Facebook e WhatsApp).

## 1. Configuração do Google OAuth

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Habilite a API de OAuth
4. Vá para "Credenciais" e crie uma nova credencial do tipo "ID do cliente OAuth"
5. Configure as origens JavaScript autorizadas: `http://localhost:5173`
6. Configure os URIs de redirecionamento autorizados: `http://localhost:5173/api/auth/google/callback`
7. Anote o Client ID e Client Secret

## 2. Configuração do GitHub OAuth

1. Acesse as [configurações de desenvolvedor do GitHub](https://github.com/settings/developers)
2. Clique em "OAuth Apps" e depois "New OAuth App"
3. Preencha as informações:
   - Application name: Nome do seu aplicativo
   - Homepage URL: `http://localhost:5173`
   - Authorization callback URL: `http://localhost:5173/api/auth/github/callback`
4. Registre o aplicativo e anote o Client ID e Client Secret

## 3. Configuração do Facebook OAuth

1. Acesse o [Facebook Developers](https://developers.facebook.com/)
2. Crie um novo aplicativo ou selecione um existente
3. Adicione o produto "Login do Facebook"
4. Configure as configurações:
   - URL de redirecionamento OAuth válidas: `http://localhost:5173/api/auth/facebook/callback`
   - Domínios permitidos: `localhost`
5. Anote o App ID (Client ID) e App Secret (Client Secret)

## 4. Configuração das variáveis de ambiente

Atualize o arquivo `.env` na raiz do projeto com as credenciais obtidas:

```
# OAuth Credentials
GOOGLE_CLIENT_ID=seu_google_client_id_real_aqui
GOOGLE_CLIENT_SECRET=seu_google_client_secret_real_aqui
GOOGLE_REDIRECT_URI=https://euquero.automacoescomerciais.com.br/api/auth/google/callback
GITHUB_CLIENT_ID=seu_github_client_id_real_aqui
GITHUB_CLIENT_SECRET=seu_github_client_secret_real_aqui
GITHUB_REDIRECT_URI=https://euquero.automacoescomerciais.com.br/api/auth/github/callback
FACEBOOK_CLIENT_ID=seu_facebook_client_id_real_aqui
FACEBOOK_CLIENT_SECRET=seu_facebook_client_secret_real_aqui
FACEBOOK_REDIRECT_URI=https://euquero.automacoescomerciais.com.br/api/auth/facebook/callback
```

Também atualize as variáveis no arquivo `wrangler.jsonc`:

```json
"vars": {
  "GOOGLE_CLIENT_ID": "seu_google_client_id_real_aqui",
  "GOOGLE_CLIENT_SECRET": "seu_google_client_secret_real_aqui",
  "GITHUB_CLIENT_ID": "seu_github_client_id_real_aqui",
  "GITHUB_CLIENT_SECRET": "seu_github_client_secret_real_aqui",
  "FACEBOOK_CLIENT_ID": "seu_facebook_client_id_real_aqui",
  "FACEBOOK_CLIENT_SECRET": "seu_facebook_client_secret_real_aqui"
}
```

## 5. URLs de autenticação

Após a configuração, as rotas de autenticação estarão disponíveis em:

- Google: http://localhost:5173/api/auth/google
- GitHub: http://localhost:5173/api/auth/github
- Facebook: http://localhost:5173/api/auth/facebook

## 6. Reiniciar o servidor

Após configurar as variáveis de ambiente, reinicie o servidor de desenvolvimento:

```bash
npm run dev
```