document.addEventListener("DOMContentLoaded", () => {

  const blocoSenha = document.getElementById("bloco-senha");
  const btnValidar = document.getElementById("btn-validar");
  const form = document.getElementById("form-receita");

  // 🔐 VALIDAR SENHA
  btnValidar.addEventListener("click", async () => {

    const senhaDigitada = document.getElementById("senha").value;

    if (!senhaDigitada) {
      alert("Digite a senha");
      return;
    }

    const { data, error } = await supabase
      .rpc("validar_senha", { senha_input: senhaDigitada });

    if (error || data !== true) {
      alert("Senha incorreta");
      return;
    }

    // senha correta
    blocoSenha.style.display = "none";
    form.style.display = "block";
  });

  // 💾 SALVAR RECEITA
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // ⛔ impede reload da página

    const nome = document.getElementById("nome").value;
    const tipo = document.getElementById("tipo").value;
    const ingredientes = document.getElementById("ingredientes").value;
    const modo = document.getElementById("modo").value;
    const imagemInput = document.getElementById("imagem");

    let imagemBase64 = "";

    if (imagemInput.files.length > 0) {
      imagemBase64 = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(imagemInput.files[0]);
      });
    }

    const { error } = await supabase
      .from("receitas")
      .insert([{
        nome,
        tipo,
        ingredientes,
        modo,
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

});