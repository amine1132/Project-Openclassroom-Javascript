// permet de récuperer l'id utilisateur et le token
function Authorization() {
  const token = JSON.parse(localStorage.getItem("auth")).token;
  return "Bearer " + token;
}

// permet de voir si l'utilisateur est connecté
function Connected() {
  const connecting = Authorization() ? true : false;
  return connecting;
}
