const form = document.getElementById("form");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // 1️⃣ Verificar senha
  const resposta = await fetch("/api/verificar-senha", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ senha: senha.value })
  });

  if (!resposta.ok) {
    alert("Senha incorreta");
    return;
  }

  // 2️⃣ Ler imagem
  const file = imagem.files[0];
  let imagemBase64 = "";

  if (file) {
    imagemBase64 = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  }

  // 3️⃣ Salvar no Supabase
  const { error } = await supabase.from("receitas").insert([{
    nome: nome.value,
    tipo: tipo.value,
    ingredientes: ingredientes.value,
    modo: modo.value,
    imagem: imagemBase64
  }]);

  if (error) {
    console.error(error);
    alert("Erro ao salvar receita");
    return;
  }

  alert("Receita salva com sucesso!");
  window.location.href = "index.html";
});

