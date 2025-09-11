# Integração com WhatsApp

A integração com WhatsApp permite que os usuários entrem em contato diretamente com a equipe através do WhatsApp. Esta integração é usada tanto para suporte quanto para autenticação.

## Como funciona

A integração com WhatsApp é implementada através de um link direto para o número de telefone configurado. Quando o usuário clica no botão "Continuar com WhatsApp", ele é redirecionado para o aplicativo WhatsApp com uma mensagem pré-definida.

## Configuração

### 1. Número de Telefone

O número de telefone do WhatsApp é configurado no arquivo `src/shared/landing-data.ts`:

```typescript
export const whatsappConfig: WhatsAppConfig = {
  phoneNumber: "5588988712711",
  defaultMessage:
    "Olá! Gostaria de saber mais sobre o EuQuero. Podem me ajudar?",
  teamName: "Equipe EuQuero",
  welcomeMessage:
    "Olá! Tem dúvidas sobre nossa plataforma? Estamos aqui para ajudar!",
};
```

### 2. Mensagem Padrão

A mensagem padrão é usada quando o usuário clica no botão de autenticação via WhatsApp. Esta mensagem pode ser personalizada conforme a necessidade.

## Implementação

### Frontend

A implementação no frontend está no componente `WhatsAppFloat.tsx` e nos botões de OAuth:

1. `src/react-app/components/WhatsAppFloat.tsx` - Componente flutuante do WhatsApp
2. `src/react-app/components/auth/OAuthButtons.tsx` - Botão de autenticação via WhatsApp
3. `src/react-app/pages/AuthPage.tsx` - Página de autenticação com handler para o WhatsApp

### Backend

No backend, a integração com WhatsApp é mais simples, pois não requer autenticação OAuth. O link direto é usado para abrir o WhatsApp com a mensagem pré-definida.

## Personalização

### Alterando o Número de Telefone

Para alterar o número de telefone do WhatsApp, modifique o arquivo `src/shared/landing-data.ts`:

```typescript
export const whatsappConfig: WhatsAppConfig = {
  phoneNumber: "NOVO_NUMERO_AQUI", // <- Altere aqui
  defaultMessage:
    "Olá! Gostaria de saber mais sobre o EuQuero. Podem me ajudar?",
  teamName: "Equipe EuQuero",
  welcomeMessage:
    "Olá! Tem dúvidas sobre nossa plataforma? Estamos aqui para ajudar!",
};
```

### Alterando a Mensagem Padrão

Para alterar a mensagem padrão, modifique o arquivo `src/shared/landing-data.ts`:

```typescript
export const whatsappConfig: WhatsAppConfig = {
  phoneNumber: "5588988712711",
  defaultMessage:
    "NOVA_MENSAGEM_AQUI", // <- Altere aqui
  teamName: "Equipe EuQuero",
  welcomeMessage:
    "Olá! Tem dúvidas sobre nossa plataforma? Estamos aqui para ajudar!",
};
```

## Testando a Integração

Para testar a integração com WhatsApp:

1. Inicie o servidor de desenvolvimento: `npm run dev`
2. Acesse a página de autenticação: http://localhost:5173/auth
3. Clique no botão "Continuar com WhatsApp"
4. Verifique se o WhatsApp abre com a mensagem pré-definida

## Considerações de Segurança

A integração com WhatsApp é considerada segura porque:

1. Não requer armazenamento de credenciais sensíveis
2. A comunicação acontece diretamente entre o usuário e o WhatsApp
3. A mensagem pré-definida pode ser personalizada para evitar abusos

## Troubleshooting

### O WhatsApp não abre ao clicar no botão

1. Verifique se o WhatsApp está instalado no dispositivo
2. Confirme se o número de telefone está correto no arquivo `landing-data.ts`
3. Teste o link diretamente no navegador: `https://wa.me/5588988712711`

### A mensagem não aparece corretamente

1. Verifique se a mensagem está corretamente codificada com `encodeURIComponent`
2. Confirme se não há caracteres especiais não suportados
3. Teste a URL diretamente no navegador

## Próximos Passos

1. **Integração com API do WhatsApp Business** - Para mensagens automatizadas
2. **Webhooks para notificações** - Receber notificações de mensagens recebidas
3. **Autenticação via WhatsApp** - Implementar login com WhatsApp
4. **Template de mensagens** - Criar templates reutilizáveis para diferentes contextos

## Suporte

- 📧 Email: contato@fcaq.com.br
- 💬 Telegram: https://t.me/+9cdym9gvPQ9iOWNh
- 📱 WhatsApp: +55 88 988712711