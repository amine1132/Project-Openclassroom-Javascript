// permet d'afficher pour le mode éditeur
const modeEdition = document.querySelector(".mode-edition");
const buttonedit = document.querySelectorAll(".modifier");
const logout = document.querySelector('[href="login.html"]');
const filtre = document.querySelectorAll("#category");

// voir si on à récuperer le token
if (Connected()) {
  modeEdition.style.display = "flex";

  const logo = document.querySelector("#logo");
  logo.style.paddingTop = "25px";
  logo.style.fontSize = "17px";

  const navHeader = document.querySelector("#navHeader");
  navHeader.style.paddingTop = "25px";

  for (let i = 0; i < filtre.length; i++) {
    filtre[i].style.display = "none";
  }

  for (let i = 0; i < buttonedit.length; i++) {
    buttonedit[i].style.display = "flex";
  }

  // Changer login en logout
  logout.textContent = "logout";
  logout.setAttribute("href", "#");

  // logout permet de nous déconnecter
  logout.addEventListener("click", (event) => {
    event.preventDefault();

    localStorage.removeItem("userId");
    localStorage.removeItem("auth");
    window.location.reload();
  });
}
