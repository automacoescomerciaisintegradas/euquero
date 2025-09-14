// Rotas explícitas para OAuth explícitas
app.get("/api/auth/google", async (c) => {
  const auth = c.get("auth");
  return auth.handler(c.req.raw);
});

// Callback para Google
app.get("/api/auth/google/callback", async (c) => {
  const user = c.get("user-google") as FacebookUser | undefined;
  
  if (!user) {
    return c.json({ error: "Falha na autenticação com Google" }, 400);
  }

  try {
    // Criar ou atualizar usuário no banco de dados
    const dbUser = await createOrUpdateUser(c.env.DB, {
      email: user.email || `${user.id}@google.com`,
      name: user.name,
      provider: "google",
      providerId: user.id,
    });

    // Redirecionar para o dashboard após login bem-sucedido
    return c.redirect("/dashboard");
  } catch (error) {
    console.error("Erro ao criar/atualizar usuário do Google:", error);
    return c.json({ error: "Erro interno do servidor" }, 500);
  }
});// Rotas explícitas para OAuth explícitas
app.get("/api/auth/google", async (c) => {
  const auth = c.get("auth");
  return auth.handler(c.req.raw);
});

// Callback para Google
app.get("/api/auth/google/callback", async (c) => {
  const user = c.get("user-google") as FacebookUser | undefined;
  
  if (!user) {
    return c.json({ error: "Falha na autenticação com Google" }, 400);
  }

  try {
    // Criar ou atualizar usuário no banco de dados
    const dbUser = await createOrUpdateUser(c.env.DB, {
      email: user.email || `${user.id}@google.com`,
      name: user.name,
      provider: "google",
      providerId: user.id,
    });

    // Redirecionar para o dashboard após login bem-sucedido
    return c.redirect("/dashboard");
  } catch (error) {
    console.error("Erro ao criar/atualizar usuário do Google:", error);
    return c.json({ error: "Erro interno do servidor" }, 500);
  }
});