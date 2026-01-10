import { supabase } from "./supabase.js";
document.addEventListener("DOMContentLoaded", async () => {

  const lista = document.getElementById("lista-receitas");
  const buscaInput = document.getElementById("busca");
  const botoesFiltro = document.querySelectorAll(".botoes-filtro button");

  let receitas = [];
  let filtroTipo = "todos";

  // 🔹 Buscar receitas no Supabase
  const { data, error } = await supabase
    .from("receitas")
    .select("*")
    .order("nome", { ascending: true });


  if (error) {
    console.error(error);
    return;
  }

  receitas = data;

  renderizar();

  // 🔍 Busca por nome
  buscaInput.addEventListener("input", renderizar);

  // 🍰 Filtro por tipo
  botoesFiltro.forEach(btn => {
    btn.addEventListener("click", () => {
      filtroTipo = btn.dataset.tipo;

      botoesFiltro.forEach(b => b.classList.remove("ativo"));
      btn.classList.add("ativo");

      renderizar();
    });
  });

  // 🔁 Renderização
  function renderizar() {
    const termo = buscaInput.value.toLowerCase();
    lista.innerHTML = "";

    const filtradas = receitas.filter(r => {
      const nomeMatch = r.nome.toLowerCase().includes(termo);
      const tipoMatch = filtroTipo === "todos" || r.tipo === filtroTipo;
      return nomeMatch && tipoMatch;
    });

    if (filtradas.length === 0) {
      lista.innerHTML = "<li>Nenhuma receita encontrada</li>";
      return;
    }

    filtradas.forEach(receita => {
      const li = document.createElement("li");
      li.innerHTML = `
        <a href="receita.html?id=${receita.id}">
          <strong>${receita.nome}</strong><br>
          <small>${receita.tipo}</small>
        </a>
      `;
      lista.appendChild(li);
    });
  }

});
