const canvas = $("#canvas");
const color = $("#color");
const input: HTMLInputElement = document.querySelector("#tile-count-input");
const label: HTMLLabelElement = document.querySelector("#tile-count-label");
const pen: HTMLButtonElement = document.querySelector("#pen")
const eraser: HTMLButtonElement = document.querySelector("#eraser");
const clear: HTMLButtonElement = document.querySelector("#clear");
let isMouseDown = false;

const createTiles = (tileCount: number): HTMLDivElement[] => {
  return Array(tileCount ** 2)
    .fill(100 / tileCount + "%")
    .map((size) => {
      let tile = document.createElement("div")
      tile.style.width = tile.style.height = size;
      tile.onmousedown = tile.onmouseover = (e) => {
        e.preventDefault();
        if (e.type == "mouseover" && !isMouseDown) return false;
        tile.style.backgroundColor =
          pen.classList.contains("active-mode") ?
            String(color.val()) : String(canvas.css("background-color"));
      }
      return tile;
    })
}


const initCanvas = (input: HTMLInputElement, label: HTMLLabelElement, canvas: JQuery) => {
  canvas.empty();
  label.textContent = `${input.value}x${input.value}`
  let tiles = createTiles(Number(input.value));
  for (let tile of tiles) canvas.append(tile)
}


const changeMode = (selected: HTMLButtonElement, deselected: HTMLButtonElement) => {
  selected.classList.add("active-mode")
  deselected.classList.remove("active-mode")
}


document.body.onmousedown = () => isMouseDown = true;
document.body.onmouseup = () => isMouseDown = false;

initCanvas(input, label, canvas)
color.val(window.localStorage.getItem("color"));
color.on("change", () => window.localStorage.setItem("color", String(color.val())))
input.onchange = () => initCanvas(input, label, canvas);

changeMode(pen, eraser);
pen.onclick = () => changeMode(pen, eraser);
eraser.onclick = () => changeMode(eraser, pen);
clear.onclick = () => initCanvas(input, label, canvas);
