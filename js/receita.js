document.addEventListener("DOMContentLoaded", () => {

const id = new URLSearchParams(location.search).get("id");

async function carregar() {
  const { data, error } = await supabase
    .from("receitas")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    alert("Erro ao carregar receita");
    return;
  }

  nome.textContent = data.nome;
  ingredientes.textContent = data.ingredientes;
  modo.textContent = data.modo;

  if (data.imagem) {
    imagem.src = data.imagem;
  }
}

carregar();

});