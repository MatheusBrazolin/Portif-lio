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
