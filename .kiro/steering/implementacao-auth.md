# Implementação de Autenticação - EuQuero

## Estratégia de Autenticação

### OAuth Providers

1. **Google OAuth**
   - Usar @google-cloud/oauth ou similar
   - Configurar client ID e secret
   - Redirect URI para callback

2. **GitHub OAuth**
   - Usar GitHub OAuth App
   - Configurar aplicação no GitHub
   - Implementar fluxo de autorização

### Autenticação por Email

- Validação com Zod schemas
- Hash de senhas com bcrypt ou similar
- Tokens JWT para sessões
- Refresh tokens para segurança

## Estrutura de Dados

### Schema do Usuário

```typescript
// src/shared/types.ts
export interface User {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  provider: "email" | "google" | "github";
  providerId?: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

### Schema de Validação

```typescript
// Zod schemas para validação
export const LoginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
});

export const RegisterSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
  phone: z.string().regex(/^\(\d{2}\)\s\d{4,5}-\d{4}$/, "Telefone inválido"),
});
```

## Endpoints da API

### Rotas de Autenticação

```typescript
// src/worker/index.ts
app.post("/api/auth/login", loginHandler);
app.post("/api/auth/register", registerHandler);
app.post("/api/auth/logout", logoutHandler);
app.get("/api/auth/google", googleOAuthHandler);
app.get("/api/auth/github", githubOAuthHandler);
app.post("/api/auth/verify-email", verifyEmailHandler);
```

## Componentes React

### Estrutura de Componentes

```
src/react-app/components/auth/
├── LoginForm.tsx
├── RegisterForm.tsx
├── OAuthButtons.tsx
└── EmailVerification.tsx
```

## Fluxo de Verificação de Email

1. Usuário se cadastra
2. Sistema envia email de confirmação
3. Usuário clica no link do email
4. Sistema verifica token e ativa conta
5. Redirecionamento para login

## Segurança

- Validação de entrada com Zod
- Sanitização de dados
- Rate limiting para tentativas de login
- HTTPS obrigatório
- Tokens com expiração
- Logout seguro (invalidação de tokens)

<!-- ❌ Errado (formulário com POST)
<form onSubmit={handleSubmit}>
  <button type="submit">Login com Google
</form> -->
