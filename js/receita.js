const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const receita = getReceitas().find(r => r.id == id);

document.getElementById("nome").textContent = receita.nome;
document.getElementById("ingredientes").textContent = receita.ingredientes;
document.getElementById("modo").textContent = receita.modoPreparo;

if (receita.imagem) {
  document.getElementById("imagem").src = receita.imagem;
}
