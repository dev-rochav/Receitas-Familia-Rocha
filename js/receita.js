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