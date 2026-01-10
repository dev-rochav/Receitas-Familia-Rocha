import { supabase } from "./supabase.js";

const SENHA = "Receita123@";

// 📌 Captura e converte o ID da URL
const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

let receita = null;

// 🚀 Carrega a receita
async function carregarReceita() {
  if (!id) {
    alert("ID da receita inválido");
    return;
  }

  const { data, error } = await supabase
    .from("receitas")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Erro Supabase:", error);
    alert("Erro ao carregar receita");
    return;
  }

  if (!data) {
    alert("Receita não encontrada");
    return;
  }

  receita = data;

  // 🖥️ Preenche a página
  document.getElementById("nome").textContent = receita.nome;

  if (receita.imagem) {
  const img = document.getElementById("imagem");
  img.src = receita.imagem;
  img.style.display = "block";
}

  document.getElementById("tipo").textContent = receita.tipo;
  document.getElementById("ingredientes").textContent = receita.ingredientes;
  document.getElementById("modo").textContent = receita.modo;

  configurarAcoes();
}

// 🔧 Configura ações somente após carregar a receita
function configurarAcoes() {
  const btnExcluir = document.getElementById("btn-excluir");
  const btnEditar = document.getElementById("btn-editar");
  const formEditar = document.getElementById("form-editar");

  if (!btnExcluir || !btnEditar || !formEditar) {
    console.warn("Botões ou formulário não encontrados no HTML");
    return;
  }

  btnExcluir.addEventListener("click", excluirReceita);
  btnEditar.addEventListener("click", mostrarFormularioEdicao);
  formEditar.addEventListener("submit", salvarEdicao);
}

// 🗑️ Excluir receita
async function excluirReceita() {
  const senha = prompt("Digite a senha para excluir:");
  if (senha !== SENHA) {
    alert("Senha incorreta");
    return;
  }

  const confirmar = confirm("Tem certeza que deseja excluir esta receita?");
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

  alert("Receita excluída com sucesso");
  window.location.href = "index.html";
}

// ✏️ Mostrar formulário de edição
function mostrarFormularioEdicao() {
  const senha = prompt("Digite a senha para editar:");
  if (senha !== SENHA) {
    alert("Senha incorreta");
    return;
  }

  const form = document.getElementById("form-editar");
  form.style.display = "block";

  document.getElementById("edit-nome").value = receita.nome;
  document.getElementById("edit-tipo").value = receita.tipo;
  document.getElementById("edit-ingredientes").value = receita.ingredientes;
  document.getElementById("edit-modo").value = receita.modo;

  form.scrollIntoView({ behavior: "smooth" });
}

// 💾 Salvar edição
async function salvarEdicao(e) {
  e.preventDefault();

  let imagemUrl = receita.imagem_url;

  const arquivo = document.getElementById("edit-imagem").files[0];

  // Se selecionou nova imagem
  if (arquivo) {
    const nomeArquivo = `${Date.now()}-${arquivo.name}`;

    const { error: uploadError } = await supabase.storage
      .from("imagens-receitas")
      .upload(nomeArquivo, arquivo, { upsert: true });

    if (uploadError) {
      alert("Erro ao enviar imagem");
      return;
    }

    const { data } = supabase.storage
      .from("imagens-receitas")
      .getPublicUrl(nomeArquivo);

    imagemUrl = data.publicUrl;
  }

  const { error } = await supabase
    .from("receitas")
    .update({
      nome: document.getElementById("edit-nome").value,
      tipo: document.getElementById("edit-tipo").value,
      ingredientes: document.getElementById("edit-ingredientes").value,
      modo: document.getElementById("edit-modo").value,
      imagem_url: imagemUrl
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


// ⏳ Inicializa
carregarReceita();
