form.onsubmit = async e => {
  e.preventDefault();

  const senhaOk = await fetch("/api/verificar-senha", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ senha: senha.value })
  });

  if (!senhaOk.ok) {
    alert("Senha incorreta");
    return;
  }

  const reader = new FileReader();
  const file = imagem.files[0];

  reader.onload = async () => {
    await supabase.from("receitas").insert([{
      nome: nome.value,
      tipo: tipo.value,
      ingredientes: ingredientes.value,
      modo: modo.value,
      imagem: reader.result
    }]);

    location.href = "index.html";
  };

  if (file) reader.readAsDataURL(file);
  else reader.onload();
};

