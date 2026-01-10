document.addEventListener("DOMContentLoaded", () => {

  const btnValidar = document.getElementById("btn-validar");
  const blocoSenha = document.getElementById("bloco-senha");
  const form = document.getElementById("form-receita");

  btnValidar.addEventListener("click", async () => {

    const senhaDigitada = document.getElementById("senha").value;

    if (!senhaDigitada) {
      alert("Digite a senha");
      return;
    }

    // chama função no Supabase para validar senha
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

});
