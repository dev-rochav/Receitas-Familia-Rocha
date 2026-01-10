import { supabase } from "./supabase.js";

const SENHA = "Receita123@";

// Captura o ID da URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

let receita = null;

// 🚀 Função principal
async function carregarReceita() {
  const { data, error } = await supabase
    .from("receitas")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    alert("Erro ao carregar receita");
    return;
  }

  receita = data;

  // Preenche a página
  document.getElementById("nome").textContent = receita.nome;
  document.getElementById("tipo").textContent = receita.tipo;
  document.getElementById("ingredientes").textContent = receita.ingredientes;
  document.getElementById("modo").textContent = receita.modo;

  configurarAcoes();
}

// 🔧 Configura botões DEPOIS de carregar
function configurarAcoes() {
  document.getElementById("btn-excluir").addEventListener("click", excluir);
  document.getElementById("btn-editar").addEventListener("click", mostrarFormularioEdicao);
  document.getElementById("form-editar").addEventListener("submit", salvarEdicao);
}

// 🗑️ Excluir
async function excluir() {
  const senha = prompt("Digite a senha para excluir:");
  if (senha !== SENHA) return alert("Senha incorreta");

  const confirmar = confirm("Tem certeza?");
  if (!confirmar) return;

  const { error } = await supabase
    .from("receitas")
    .delete()
    .eq("id", receita.id);

  if (error) {
    console.error(error);
    alert("Erro ao excluir");
    return;
  }

  alert("Receita excluída");
  window.location.href = "index.html";
}

// ✏️ Mostrar formulário de edição
function mostrarFormularioEdicao() {
  const senha = prompt("Digite a senha para editar:");
  if (senha !== SENHA) return alert("Senha incorreta");

  document.getElementById("form-editar").style.display = "block";

  document.getElementById("edit-nome").value = receita.nome;
  document.getElementById("edit-tipo").value = receita.tipo;
  document.getElementById("edit-ingredientes").value = receita.ingredientes;
  document.getElementById("edit-modo").value = receita.modo;
}

// 💾 Salvar edição
async function salvarEdicao(e) {
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
    console.error(error);
    alert("Erro ao salvar");
    return;
  }

  alert("Receita atualizada");
  location.reload();
}

// ⏳ Inicia tudo
carregarReceita();
