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

let currentImageIndex = 0;

const imgList = document.querySelector("[data-img-list]");
const dialog = document.getElementById("lightbox");
const dialogImg = document.getElementById("dialogImg");
const currentImgText = document.getElementById("currentImg");
const titleText = document.getElementById("imageName");

function render() {
  createImagesList();
  addDialogEvents();
}

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

function openDialog(index) {
  currentImageIndex = index;
  updateDialogImage();
  dialog.showModal();
}

function closeDialog() {
  dialog.close();
}

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

function updateDialogImage() {
  dialogImg.src = "./img/" + images[currentImageIndex];
  dialogImg.alt = "Bild " + (currentImageIndex + 1);

  currentImgText.innerHTML = (currentImageIndex + 1) + " / " + images.length;

  titleText.innerHTML = images[currentImageIndex].replace(".png", "");
}

function addDialogEvents() {
 
  document.addEventListener("keydown", function (event) {
    if (!dialog.open) return;

    if (event.key === "Escape") closeDialog();
    if (event.key === "ArrowRight") nextImage();
    if (event.key === "ArrowLeft") previousImage();
  });

  dialog.addEventListener("click", function (event) {
    if (event.target === dialog) {
      closeDialog();
    }
  });
}
