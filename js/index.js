const lista = document.getElementById("lista");
const busca = document.getElementById("busca");
const filtro = document.getElementById("filtro");

async function carregar() {
  const { data, error } = await supabase
    .from("receitas")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    alert("Erro ao carregar receitas");
    return;
  }

  lista.innerHTML = "";

  data
    .filter(r =>
      r.nome.toLowerCase().includes(busca.value.toLowerCase()) &&
      (filtro.value === "" || r.tipo === filtro.value)
    )
    .forEach(r => {
      const li = document.createElement("li");
      li.innerHTML = `<a href="receita.html?id=${r.id}">
        ${r.nome} (${r.tipo})
      </a>`;
      lista.appendChild(li);
    });
}

busca.oninput = carregar;
filtro.onchange = carregar;

carregar();