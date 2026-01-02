function getReceitas() {
  return JSON.parse(localStorage.getItem("receitas")) || [];
}

function salvarReceitas(receitas) {
  localStorage.setItem("receitas", JSON.stringify(receitas));
}
