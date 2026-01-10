const SENHA = "Receita123@";

document.addEventListener("DOMContentLoaded", () => {
  carregar();
});

async function carregar() {

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    alert("Receita não encontrada");
    return;
  }

  const { data: receita, error } = await supabase
    .from("receitas")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !receita) {
    console.error("Erro Supabase:", error);
    alert("Erro ao carregar receita");
    return;
  }

  console.log("Receita carregada:", receita); // debug

  document.getElementById("nome").textContent = receita.nome;
  document.getElementById("tipo").textContent = receita.tipo;
  document.getElementById("ingredientes").textContent = receita.ingredientes;
  document.getElementById("modo").textContent = receita.modo;

  if (receita.imagem) {
    const img = document.getElementById("imagem");
    img.src = receita.imagem;
    img.style.display = "block";
  } 
}

document.getElementById("btn-excluir").addEventListener("click", async () => {
  const senha = prompt("Digite a senha para excluir:");

  if (senha !== SENHA) {
    alert("Senha incorreta");
    return;
  }

  const confirmar = confirm("Tem certeza que deseja excluir esta receita?");
  if (!confirmar) return;

  const { error } = await supabase
    .from("receitas")
    .delete()
    .eq("id", receita.id);

  if (error) {
    alert("Erro ao excluir");
    console.error(error);
    return;
  }

  alert("Receita excluída");
  window.location.href = "index.html";
});

document.getElementById("btn-editar").addEventListener("click", () => {
  const senha = prompt("Digite a senha para editar:");

  if (senha !== SENHA) {
    alert("Senha incorreta");
    return;
  }

  document.getElementById("form-editar").style.display = "block";

  document.getElementById("edit-nome").value = receita.nome;
  document.getElementById("edit-tipo").value = receita.tipo;
  document.getElementById("edit-ingredientes").value = receita.ingredientes;
  document.getElementById("edit-modo").value = receita.modo;
});

document.getElementById("form-editar").addEventListener("submit", async (e) => {
  e.preventDefault();

  const { error } = await supabase
    .from("receitas")
    .update({
      nome: document.getElementById("edit-nome").value,
      tipo: document.getElementById("edit-tipo").value,
      ingredientes: document.getElementById("edit-ingredientes").value,
      modo: document.getElementById("edit-modo").value
    })
    .eq("id", receita.id);

  if (error) {
    alert("Erro ao salvar");
    console.error(error);
    return;
  }

  alert("Receita atualizada!");
  location.reload();
});
