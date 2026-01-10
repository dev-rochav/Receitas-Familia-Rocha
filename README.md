# 🍰 Receitas da Família

Um site simples, bonito e colaborativo para guardar e compartilhar receitas de família ❤️

Todos podem acessar pelo link, visualizar as receitas e, com uma senha, **adicionar, editar ou excluir** receitas. As informações ficam salvas na nuvem usando **Supabase**, e o site é hospedado no **Vercel**.

---

## ✨ Funcionalidades

* 📖 Lista de receitas em ordem alfabética
* 🔍 Busca por nome da receita
* 🧁 Filtro por tipo (doce ou salgado)
* 🖼️ Imagem da receita
* ➕ Cadastro de novas receitas (com senha)
* ✏️ Edição de receitas (com senha)
* 🗑️ Exclusão de receitas (com senha)
* 🔐 Confirmação de senha com campo oculto
* ☁️ Dados salvos no Supabase
* 🌐 Site público via Vercel

---

## 🛠️ Tecnologias utilizadas

* **HTML5**
* **CSS3**
* **JavaScript (ES Modules)**
* **Supabase** (Database + Storage)
* **Vercel** (Deploy)

---

## 📁 Estrutura do projeto

```
/
├── index.html          # Página inicial (lista de receitas)
├── receita.html        # Página de detalhes da receita
├── nova-receita.html   # Página para cadastrar receitas
├── css/
│   └── style.css       # Estilos do site
├── js/
│   ├── supabase.js     # Conexão com o Supabase
│   ├── index.js        # Lógica da página inicial
│   ├── receita.js     # Visualizar, editar e excluir receita
│   └── nova-receita.js# Cadastro de novas receitas
├── imagens/
│   └── favicon.png     # Ícone do site
└── README.md
```

---

## 🗄️ Estrutura da tabela `receitas` (Supabase)

| Coluna       | Tipo | Descrição                |
| ------------ | ---- | ------------------------ |
| id           | int  | Identificador da receita |
| nome         | text | Nome da receita          |
| tipo         | text | `doce` ou `salgado`      |
| ingredientes | text | Lista de ingredientes    |
| modo         | text | Modo de preparo          |
| imagem_url   | text | URL da imagem            |

---

## 🖼️ Storage (Supabase)

* Bucket: `imagens-receitas`
* Público
* Pasta usada: `public/`

---

## 🔐 Segurança

* O site **não possui login por usuário**
* A proteção é feita por **senha simples no frontend**
* As políticas do Supabase permitem:

  * SELECT
  * INSERT
  * UPDATE
  * DELETE

> ⚠️ Ideal para uso familiar ou educacional. Não recomendado para produção pública com dados sensíveis.

---

## 🚀 Como rodar localmente

1. Clone o projeto
2. Abra o arquivo `supabase.js`
3. Configure:

```js
const SUPABASE_URL = "SUA_URL";
const SUPABASE_ANON_KEY = "SUA_CHAVE_PUBLICA";
```

4. Abra `index.html` no navegador

---

## 🌐 Deploy no Vercel

1. Suba o projeto para um repositório (GitHub)
2. Conecte no Vercel
3. Deploy automático
4. Compartilhe o link com a família 🎉

---

## 💡 Próximas ideias

* Login por usuário
* Favoritar receitas
* Comentários
* Categorias personalizadas
* Múltiplas imagens por receita
* Impressão em PDF

---

## ❤️ Agradecimentos

Projeto criado com muito carinho para preservar receitas, memórias e histórias de família.

Bom apetite! 🍽️
