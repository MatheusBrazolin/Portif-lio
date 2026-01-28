const linksMenu = document.querySelectorAll(".menu-link");
const secoes = document.querySelectorAll(".secao");

linksMenu.forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();

    // Ativa o menu clicado
    linksMenu.forEach(l => l.classList.remove("ativo"));
    link.classList.add("ativo");

    // Mostra a seção correspondente
    secoes.forEach(secao => secao.classList.remove("ativa"));
    const id = link.getAttribute("data-section");
    document.getElementById(id).classList.add("ativa");
  });
});
const botoesLerMais = document.querySelectorAll(".btn-ler-mais");

botoesLerMais.forEach(botao => {
  botao.addEventListener("click", () => {
    const cardAtual = botao.closest(".projeto-card");
    const descricaoAtual = cardAtual.querySelector(".descricao-projeto");
    const estaAberto = descricaoAtual.classList.contains("ativa");

    // Fecha todos os cards
    document.querySelectorAll(".descricao-projeto").forEach(descricao => {
      descricao.classList.remove("ativa");
    });

    // Reseta texto de todos os botões
    botoesLerMais.forEach(btn => {
      btn.textContent = "Ler mais";
    });

    // Se não estava aberto, abre o clicado
    if (!estaAberto) {
      descricaoAtual.classList.add("ativa");
      botao.textContent = "Ler menos";
    }
  });
});
