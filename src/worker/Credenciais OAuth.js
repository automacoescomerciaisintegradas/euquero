// Configuração do Google no BetterAuth
app.use("/api/auth/*", async (c, next) => {
  const auth = new BetterAuth({
    adapter: customAdapter(c.env.DB),
    providers: {
      google: google({
        clientId: c.env.GOOGLE_CLIENT_ID, // Verifique se está carregado do .env
        clientSecret: c.env.GOOGLE_CLIENT_SECRET,
      }),
    },
  });
  c.set("auth", auth);
  await next();
});

// Rota de inicialização do Google
app.get("/api/auth/google", async (c) => {
  const auth = c.get("auth");
  return auth.handler(c.req.raw);
});

// Rota de callback do Google
app.get("/api/auth/google/callback", async (c) => {
  const user = c.get("user-google") as any; // Verifique se 'user-google' está sendo populado

  if (!user) {
    return c.json({ error: "Autenticação GoogleFalha" }, 400);
  }

  try {
    // Criar/atualizar usuário no banco
    const dbUser = await createOrUpdateUser(c.env.DB, {
      email: user.email || `${user.id}@google.com`,
      name: user.name,
      provider: "google",
      providerId: user.id,
    });

    return c.redirect("/dashboard");
  } catch (error) {
    console.error("Erro Google:', error);
    return c.json({ error: "Erro servidor" }, 500);
  }
});