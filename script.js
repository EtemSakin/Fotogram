// 1) Bilderliste (einfach: nur Dateinamen)
const images = [
  "Component 17.png",
  "Component 6.png",
  "Component 7.png",
  "Component 8.png",
  "Component 9.png",
  "Component 10.png",
  "Component 11.png",
  "Component 12.png",
  "Component 13.png",
  "Component 14.png",
  "Component 15.png",
  "Component 16.png",
];

// 2) Elemente holen
let currentImageIndex = 0;

const imgList = document.querySelector("[data-img-list]");
const dialog = document.getElementById("lightbox");
const dialogImg = document.getElementById("dialogImg");
const currentImgText = document.getElementById("currentImg");
const titleText = document.getElementById("imageName");

// 3) Start
function render() {
  createImagesList();
  addDialogEvents();
}

// 4) Galerie erstellen (klassisch mit for-Schleife)
function createImagesList() {
  imgList.innerHTML = "";

  for (let i = 0; i < images.length; i++) {
    imgList.innerHTML += `
      <li>
        <img class="itemImage" src="./img/${images[i]}" alt="Bild ${i + 1}" onclick="openDialog(${i})">
      </li>
    `;
  }
}

// 5) Dialog öffnen/schließen
function openDialog(index) {
  currentImageIndex = index;
  updateDialogImage();
  dialog.showModal();
}

function closeDialog() {
  dialog.close();
}

// 6) Nächstes/Vorheriges Bild (mit Loop)
function nextImage() {
  currentImageIndex++;

  if (currentImageIndex >= images.length) {
    currentImageIndex = 0;
  }

  updateDialogImage();
}

function previousImage() {
  currentImageIndex--;

  if (currentImageIndex < 0) {
    currentImageIndex = images.length - 1;
  }

  updateDialogImage();
}

// 7) Bild + Text im Dialog aktualisieren
function updateDialogImage() {
  dialogImg.src = "./img/" + images[currentImageIndex];
  dialogImg.alt = "Bild " + (currentImageIndex + 1);

  currentImgText.innerHTML = (currentImageIndex + 1) + " / " + images.length;

  // Dateiname ohne .png anzeigen (optional)
  titleText.innerHTML = images[currentImageIndex].replace(".png", "");
}

// 8) Events: ESC, Pfeiltasten, Klick außerhalb
function addDialogEvents() {
  // ESC / Pfeiltasten
  document.addEventListener("keydown", function (event) {
    if (!dialog.open) return;

    if (event.key === "Escape") closeDialog();
    if (event.key === "ArrowRight") nextImage();
    if (event.key === "ArrowLeft") previousImage();
  });

  // Klick außerhalb (Backdrop)
  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
      closeDialog();
    }
  });
}
