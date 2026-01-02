document.addEventListener("DOMContentLoaded", async () => {

  const lista = document.getElementById("lista-receitas");

  if (!lista) {
    console.error("Elemento lista-receitas não encontrado");
    return;
  }

  const { data: receitas, error } = await supabase
    .from("receitas")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar receitas:", error);
    return;
  }

  if (!receitas || receitas.length === 0) {
    lista.innerHTML = "<li>Nenhuma receita cadastrada</li>";
    return;
  }

  receitas.forEach((receita) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <a href="receita.html?id=${receita.id}">
        ${receita.nome} (${receita.tipo})
      </a>
    `;

    lista.appendChild(li);
  });

});
