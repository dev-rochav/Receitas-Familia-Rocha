const lista = document.getElementById("listaReceitas");
const busca = document.getElementById("busca");
const filtro = document.getElementById("filtroTipo");

function renderizar() {
  const receitas = getReceitas();
  lista.innerHTML = "";

  const textoBusca = busca.value.toLowerCase();
  const tipo = filtro.value;

  receitas
    .filter(r =>
      r.nome.toLowerCase().includes(textoBusca) &&
      (tipo === "" || r.tipo === tipo)
    )
    .forEach(r => {
      const li = document.createElement("li");
      li.innerHTML = `
        <a href="receita.html?id=${r.id}">
          ${r.nome} (${r.tipo})
        </a>
      `;
      lista.appendChild(li);
    });
}

busca.addEventListener("input", renderizar);
filtro.addEventListener("change", renderizar);

renderizar();
