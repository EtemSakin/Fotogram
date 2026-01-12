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


const imgList = document.querySelector("[data-img-list]");
const dialog = document.getElementById("lightbox");
const dialogImg = document.getElementById("dialogImg");
const currentImg = document.getElementById("currentImg");
const currentHeadText = document.getElementById("imageName");

let currentImgIndex = 0;

function render() {
  createImagesList();
  setupDialogEvents();
}

function createImagesList() {
  imgList.innerHTML = images.map(renderListItemHTML).join("");

  const itemButtons = document.querySelectorAll("[data-open-dialog]");
  itemButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = Number(btn.dataset.index);
      openDialog(index);
    });
  });
}

function renderListItemHTML(filename, index) {
  return `
    <li>
      <button class="img-btn" type="button" data-open-dialog data-index="${index}">
        <img src="./img/${filename}" alt="Bild ${index + 1}" class="itemImage" />
      </button>
    </li>
  `;
}

function openDialog(index) {
  updateImg(index);
  dialog.showModal();
}

function closeDialog() {
  dialog.close();
}

function nextImage() {
  let nextIndex = currentImgIndex + 1;
  if (nextIndex >= images.length) nextIndex = 0;
  updateImg(nextIndex);
}

function previousImage() {
  let prevIndex = currentImgIndex - 1;
  if (prevIndex < 0) prevIndex = images.length - 1;
  updateImg(prevIndex);
}

 function updateImg(index) {
  dialogImg.src = `./img/${images[index]}`;
  dialogImg.alt = `Bild ${index + 1}`;

  currentImgIndex = index;
  currentImg.textContent = `${index + 1} / ${images.length}`;
  currentHeadText.textContent = images[index];
}

function setupDialogEvents() {
  if (!dialog) return;

  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    const clickedOutside =
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom;

    if (clickedOutside) closeDialog();
  });

  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") previousImage();
    if (event.key === "ArrowRight") nextImage();
    if (event.key === "Escape") closeDialog();
  });
}
