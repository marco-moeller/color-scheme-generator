const BASE_URL = "https://www.thecolorapi.com/";
const COUNT = 5;

const colorPickerEl = document.querySelector("#color-picker");
const modeSelectorEl = document.querySelector("#mode-selector");

const submitBtn = document.querySelector("#submit-btn");
submitBtn.addEventListener("click", () => {
  fetchColorScheme();
});

const mainEl = document.querySelector("#main");
mainEl.addEventListener("click", (event) => {
  if (event.target.dataset.hex) {
    navigator.clipboard.writeText(event.target.dataset.hex);
    renderPopup();
  }
});

const modes = [
  "monochrome",
  "monochrome-dark",
  "monochrome-light",
  "analogic",
  "complement",
  "analogic-complement",
  "triad",
  "quad",
];

const initialcolors = [
  {
    hex: { value: "#F55A5A" },
  },
  {
    hex: { value: "#2B283A" },
  },
  {
    hex: { value: "#FBF3AB" },
  },
  {
    hex: { value: "#AAD1B6" },
  },
  {
    hex: { value: "#A626D3" },
  },
];

const init = () => {
  renderModeOptions();
  initColors();
};

const renderModeOptions = () => {
  modes.map(
    (mode) =>
      (modeSelectorEl.innerHTML += `
    <option class="mode-option" value="${mode}">${mode}</option>
    `)
  );
};

const initColors = () => {
  renderColors(initialcolors);
};

const fetchColorScheme = () => {
  fetch(
    BASE_URL +
      `scheme?hex=${colorPickerEl.value.substring(1)}&mode=${
        modeSelectorEl.value
      }&count=${COUNT}`
  )
    .then((response) => response.json())
    .then((data) => renderColors(data.colors));
};

const renderColors = (colors) => {
  mainEl.innerHTML = "";
  colors.map(
    (color) =>
      (mainEl.innerHTML += ` <div class="color-container">
                                <div class="color" data-hex="${color.hex.value}" style="background-color:${color.hex.value}"></div>
                                <div class="color-code" data-hex="${color.hex.value}">${color.hex.value}</div>
                            </div>`)
  );
};

const renderPopup = () => {
  const popupEl = document.querySelector("#popup");
  popupEl.classList.remove("hidden");
  setTimeout(() => {
    popupEl.classList.add("hidden");
  }, 1000);
};

init();
