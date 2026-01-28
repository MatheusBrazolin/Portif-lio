document.addEventListener("DOMContentLoaded", () => {
  initMenu();
  initLerMais();
  initToast();
  initTema();
});

/* ======================
   MENU DE NAVEGAÇÃO
====================== */
function initMenu() {
  const linksMenu = document.querySelectorAll(".menu-link");
  const secoes = document.querySelectorAll(".secao");

  linksMenu.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      ativarItem(linksMenu, link, "ativo");
      mostrarSecao(secoes, link.dataset.section);
    });
  });
}

function ativarItem(lista, itemAtivo, classe) {
  lista.forEach(item => item.classList.remove(classe));
  itemAtivo.classList.add(classe);
}

function mostrarSecao(secoes, id) {
  secoes.forEach(secao => secao.classList.remove("ativa"));
  document.getElementById(id)?.classList.add("ativa");
}

/* ======================
   LER MAIS / LER MENOS
====================== */
function initLerMais() {
  const botoes = document.querySelectorAll(".btn-ler-mais");

  botoes.forEach(botao => {
    botao.addEventListener("click", () => {
      const card = botao.closest(".projeto-card");
      const descricao = card.querySelector(".descricao-projeto");
      const estaAberto = descricao.classList.contains("ativa");

      fecharDescricoes();
      resetarBotoes(botoes);

      if (!estaAberto) {
        descricao.classList.add("ativa");
        botao.textContent = "Ler menos";
      }
    });
  });
}

function fecharDescricoes() {
  document.querySelectorAll(".descricao-projeto")
    .forEach(desc => desc.classList.remove("ativa"));
}

function resetarBotoes(botoes) {
  botoes.forEach(btn => btn.textContent = "Ler mais");
}

/* ======================
   TOAST DE BOAS-VINDAS
====================== */
function initToast() {
  const toast = document.getElementById("mensagem");
  if (!toast) return;

  const hoje = new Date().toLocaleDateString("pt-BR");
  const ultimaVisita = localStorage.getItem("ultimaVisita");

  toast.textContent = gerarMensagem(ultimaVisita, hoje);
  localStorage.setItem("ultimaVisita", hoje);

  mostrarToast(toast);
}

function gerarMensagem(ultima, hoje) {
  if (!ultima) return "👋 Bem-vindo! Obrigado por visitar meu portfólio.";
  if (ultima === hoje) return "👋 Que bom te ver novamente hoje!";
  return "👋 Bem-vindo de volta! Fique à vontade.";
}

function mostrarToast(toast) {
  setTimeout(() => toast.classList.add("ativo"), 300);
  setTimeout(() => toast.classList.add("saindo"), 3500);
  setTimeout(() => toast.remove(), 4200);
}

/* ======================
   TEMA DARK / LIGHT
====================== */
function initTema() {
  const botaoTema = document.getElementById("toggle-tema");
  if (!botaoTema) return;

  const temaSalvo = localStorage.getItem("tema");
  aplicarTema(temaSalvo, botaoTema);

  botaoTema.addEventListener("click", () => {
    const darkAtivo = document.body.classList.toggle("dark");
    salvarTema(darkAtivo, botaoTema);
  });
}

function aplicarTema(tema, botao) {
  if (tema === "dark") {
    document.body.classList.add("dark");
    botao.textContent = "☀️";
  }
}

function salvarTema(darkAtivo, botao) {
  localStorage.setItem("tema", darkAtivo ? "dark" : "light");
  botao.textContent = darkAtivo ? "☀️" : "🌙";
}
