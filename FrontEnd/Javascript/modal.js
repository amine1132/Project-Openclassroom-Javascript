const openAdd = document.querySelector("#addpicture");
const modalAdd = document.querySelector("#modalsAdd");
const closeAddWorkModalBtn = document.querySelector("#close-ajout");
const previousBtn = document.querySelector(".precedent");

const openModalBtn = document.querySelector("#project-Edit");
const modalDelete = document.querySelector("#modalsDelete");
const closeModalBtn = document.querySelector("#suppr");

const projetUpload = document.querySelector("#previewImage");
const backgroundvisualisation = document.querySelector(".AjoutPhotoContainer");
const uploadImageInput = document.querySelector("#imageUpload");
const envoieProjet = document.querySelector("#validerAjout");
const uploadContent = document.querySelector("#previewdetails");

const addProjectForm = document.querySelector("#add-form");

const backgroundModal = document.querySelector("#modals");

function openGalleryModal() {
  modalDelete.style.display = "flex";
  backgroundModal.style.display = "block";
  addWorkModal();
}

function openAddWorkModal() {
  modalAdd.style.display = "flex";
  backgroundModal.style.display = "block";
}

// Fonction pour fermer le modal
function closeGalleryModal() {
  modalDelete.style.display = "none";
  backgroundModal.style.display = "none";
}

function closeAddWorkModal() {
  modalAdd.style.display = "none";
  backgroundModal.style.display = "none";
}

// Ouvrir le modal
if (openModalBtn) openModalBtn.addEventListener("click", openGalleryModal);
if (openAdd)
  openAdd.addEventListener("click", function () {
    closeGalleryModal();
    openAddWorkModal();
  });

// Fermer le modal et aussi la flèche précédent
closeModalBtn.addEventListener("click", closeGalleryModal);
closeAddWorkModalBtn.addEventListener("click", closeAddWorkModal);

previousBtn.addEventListener("click", function () {
  closeAddWorkModal();
  openGalleryModal();
  addWorkModal();
});

window.onclick = function (event) {
  if (event.target == backgroundModal) {
    closeAddWorkModal();
    closeGalleryModal();
  }
};

// Supprimer des photos
function deleteWork(event, id) {
  fetch("http://localhost:5678/api/works/" + id, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: Authorization(),
      "Content-Type": "application/json",
    },
    params: {
      id: id,
    },
  })
    .then(() => {
      const parentDiv = event.parentNode;
      parentDiv.remove();
      const alert = document.getElementById("alert");
      alert.innerHTML = "Votre photo a été supprimé avec succès";
      alert.style.display = "block";
      setTimeout(() => {
        alert.style.display = "none";
      }, 5000);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// Fonctions pour ajouter des projets
async function sendWorkData(data) {
  const postUrl = "http://localhost:5678/api/works";

  const response = await fetch(postUrl, {
    method: "POST",
    headers: {
      Authorization: Authorization(),
    },
    body: data,
  });

  return response.json();
}

// Fonction pour gérer l'envoi du formulaire
async function handleFormSubmit(event) {
  event.preventDefault();

  // Vérifier que tous les champs obligatoires sont remplis
  if (!addProjectForm.checkValidity()) {
    alert("Veuillez remplir tous les champs obligatoires.");
    return;
  }
  console.log(addProjectForm);

  const title = addProjectForm.querySelector("#titreAjout").value;
  const category = addProjectForm.querySelector("#selectCategorie").value;
  const file = uploadImageInput.files[0];

  const formData = new FormData();
  formData.append("title", title);
  formData.append("category", category);
  formData.append("image", file);

  try {
    const response = await sendWorkData(formData);
    console.log(response);

    const alert = document.getElementById("alert");
    alert.innerHTML = "Votre photo a été ajouté avec succès";
    alert.style.display = "block";
    setTimeout(function () {
      alert.style.display = "none";
    }, 5000);
  } catch (error) {
    console.error("Erreur :", error);
  }
}

uploadImageInput.addEventListener("change", function () {
  uploadImage();
});

addProjectForm.addEventListener("submit", handleFormSubmit);

function uploadImage() {
  if (uploadImageInput.files && uploadImageInput.files[0]) {
    const reader = new FileReader();
    const image = new Image();
    const fileName = uploadImageInput.files[0].name;

    reader.onload = (event) => {
      image.src = event.target.result;
      image.alt = fileName.split(".")[0];
    };

    uploadContent.style.display = "none";
    envoieProjet.style.backgroundColor = "#1D6154";
    projetUpload.style.display = "block";
    backgroundvisualisation.style.backgroundColor = "#FFFFFF";
    reader.readAsDataURL(uploadImageInput.files[0]);
    projetUpload.appendChild(image);
  }
}
