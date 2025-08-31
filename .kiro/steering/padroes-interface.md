# Padrões de Interface para EuQuero

## Diretrizes de Idioma
- **Idioma Principal**: Português brasileiro
- **Consistência**: Todos os textos devem seguir o mesmo padrão linguístico
- **Localização**: Adaptar formatos de data, moeda e telefone para o Brasil

## Componentes de Autenticação

### Formulário de Login
```tsx
// Estrutura do formulário de login
Email: [input type="email" placeholder="Digite seu email"]
Senha: [input type="password" placeholder="Digite sua senha"]
[Button: "Entrar"]
[Link: "Esqueci minha senha"]
[Divider: "ou"]
[Button: "Continuar com Google"]
[Button: "Continuar com GitHub"]
```

### Formulário de Cadastro
```tsx
// Estrutura do formulário de cadastro
👤 Usuário:
Email: [input type="email" placeholder="Digite seu email"]
Senha: [input type="password" placeholder="Crie uma senha"]
Telefone: [input type="tel" placeholder="(88) 98871-2711"]
[Button: "Cadastrar"]
[Text: "Confirmar via mensagem no email"]
```

## Componentes de Contato

### Rodapé
```tsx
// Estrutura do rodapé
📞 Suporte
📧 Email: contato@fcaq.com.br
💬 Telegram: https://t.me/+9cdym9gvPQ9iOWNh
📱 WhatsApp: +55 88 988712711
```

### Página de Contato
- Formulário de contato em português
- Todas as opções de suporte visíveis
- Links funcionais para Telegram e WhatsApp
- Email clicável (mailto:)

## Padrões de Texto

### Mensagens de Validação
- "Email obrigatório"
- "Senha deve ter pelo menos 8 caracteres"
- "Telefone inválido"
- "Email já cadastrado"
- "Login realizado com sucesso"

### Botões e Ações
- "Entrar" (não "Login")
- "Cadastrar" (não "Registrar")
- "Sair" (não "Logout")
- "Confirmar"
- "Cancelar"

### Navegação
- "Início"
- "Soluções"
- "Contato"
- "Sobre"
- "Minha Conta"

## Formatação Brasileira
- **Telefone**: (88) 98871-2711
- **Data**: DD/MM/AAAA
- **Moeda**: R$ 0,00
- **CEP**: 00000-000