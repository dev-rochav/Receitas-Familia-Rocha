document.getElementById("form").addEventListener("submit", e => {
  e.preventDefault();

  const leitor = new FileReader();
  const file = document.getElementById("imagem").files[0];

  leitor.onload = () => salvar(leitor.result);
  if (file) leitor.readAsDataURL(file);
  else salvar("");
});

function salvar(imagem) {
  const receitas = getReceitas();

  receitas.push({
    id: Date.now(),
    nome: nome.value,
    tipo: tipo.value,
    ingredientes: ingredientes.value,
    modoPreparo: modo.value,
    imagem
  });

  salvarReceitas(receitas);
  window.location.href = "index.html";
}
