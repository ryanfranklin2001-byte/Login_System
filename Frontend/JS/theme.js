function inicializarTema() {
  const btnThemeToggle = document.querySelector(".theme-toggle-btn");
  const body = document.body;

  // 1. Recupera o tema salvo no localStorage
  const temaSalvo = localStorage.getItem("theme");

  if (temaSalvo === "light") {
    body.classList.add("light");
    if (btnThemeToggle) {
      btnThemeToggle.textContent = "☀️"; // Ícone para o tema claro
    }
  } else {
    body.classList.remove("light");
    if (btnThemeToggle) {
      btnThemeToggle.textContent = "🌙"; // Ícone para o tema escuro
    }
  }

  // 2. Configura o evento de clique no botão
  if (btnThemeToggle) {
    btnThemeToggle.addEventListener("click", () => {
      body.classList.toggle("light");

      if (body.classList.contains("light")) {
        btnThemeToggle.textContent = "☀️";
        localStorage.setItem("theme", "light");
      } else {
        btnThemeToggle.textContent = "🌙";
        localStorage.setItem("theme", "dark");
      }
    });
  }
}
