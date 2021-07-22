const getElementById = (id) => document.getElementById(id);
const getCurrentNumberOfColors = () =>
  Number(getElementById('numberOfColors').innerText);
const colorPalleteStates = [];
let palleteNumber = -1;

const getRandomColor = () => {
  const red = Math.random() * 256;
  const green = Math.random() * 256;
  const blue = Math.random() * 256;
  return `rgb(${red}, ${green}, ${blue})`;
};

const getPalleteColorDiv = (bgColor) => {
  const newDiv = document.createElement('div');
  newDiv.className = 'pallete_color';
  newDiv.style.backgroundColor = bgColor;
  return newDiv;
};

function incrementNumberOfColors() {
  let currentNumberOfColors = getCurrentNumberOfColors();
  if (currentNumberOfColors < 7)
    getElementById('numberOfColors').innerText = currentNumberOfColors + 1;
}
function decrementNumberOfColors() {
  let currentNumberOfColors = getCurrentNumberOfColors();
  if (currentNumberOfColors > 3)
    getElementById('numberOfColors').innerText = currentNumberOfColors - 1;
}

function generatePallete() {
  const palleteContainer = getElementById('palleteContainer');
  if (palleteContainer.classList.contains('initialize')) {
    palleteContainer.classList.remove('initialize');
  }
  palleteContainer.innerHTML = '';
  const newPalleteColorState = document.createElement('div');
  for (let count = 0; count < getCurrentNumberOfColors(); count++) {
    const bgColor = getRandomColor();
    const newPalleteColor = getPalleteColorDiv(bgColor);
    const copyPalleteColor = getPalleteColorDiv(bgColor);
    palleteContainer.appendChild(newPalleteColor);
    newPalleteColorState.appendChild(copyPalleteColor);
  }

  colorPalleteStates.length = palleteNumber + 1;
  colorPalleteStates.push(newPalleteColorState);
  palleteNumber++;
}

const decToHex = (dec) => {
  let hex = Number(dec).toString(16);
  if (hex.length === 1) {
    hex = '0' + hex;
  }
  return hex;
};

const rgbToHexCoverter = (rgb) => {
  rgb = rgb.slice(4, rgb.length - 1);
  const [red, green, blue] = rgb.split(', ');
  const hexRed = decToHex(red);
  const hexGreen = decToHex(green);
  const hexBlue = decToHex(blue);

  return `#${hexRed}${hexGreen}${hexBlue}`;
};

const colorNameDisplayHandler = (event) => {
  if (document.getElementsByClassName('pallete_color').length) {
    const x = event.clientX;
    const y = event.clientY;
    const currentColorDiv = document.elementFromPoint(x, y);

    if (currentColorDiv.classList.contains('pallete_color')) {
      currentColorDiv.style.cursor = 'pointer';
      const rgbColor = rgbToHexCoverter(currentColorDiv.style.backgroundColor);
      const colorName = document.createElement('div');
      colorName.id = 'colorName';
      currentColorDiv.appendChild(colorName);
      colorName.innerHTML = rgbColor;
      currentColorDiv.addEventListener('click', () => {
        copyToClipboard(rgbColor);
        colorName.innerHTML = 'Copied!';
      });
    }
  }
};

const colorNameRemovalHandler = (event) => {
  if (document.getElementsByClassName('pallete_color').length) {
    const colorName = getElementById('colorName');
    const x = event.clientX;
    const y = event.clientY;
    const currentColorDiv = document.elementFromPoint(x, y);
    if (colorName && currentColorDiv !== colorName) {
      colorName.remove();
    }
  }
};

const copyToClipboard = (str) => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
};

const undoHandler = () => {
  if (colorPalleteStates.length === 0) {
    alert(
      'There is no previous state, please click generate to get new color pallete!!!'
    );
    return;
  } else if (palleteNumber == -1) {
    alert(
      'There is no previous state, please click generate to get new color pallete or click redo to get next state if it exists!!!'
    );
    return;
  }
  palleteNumber--;
  const palleteContainer = getElementById('palleteContainer');
  if (palleteNumber === -1) {
    const initialPara = document.createElement('p');
    initialPara.innerHTML = 'Please Select Number of Colors and Click Generate';
    palleteContainer.innerHTML = '';
    palleteContainer.appendChild(initialPara);
    palleteContainer.classList.add('initialize');
    return;
  }
  palleteContainer.innerHTML = colorPalleteStates[palleteNumber].innerHTML;
  getElementById('numberOfColors').innerHTML =
    document.getElementsByClassName('pallete_color').length;
};

const redoHandler = () => {
  if (palleteNumber === colorPalleteStates.length - 1) {
    alert(
      'There is no next state, please click generate to get new color pallete or click undo to get previous color pallete if it exists!!!'
    );
    return;
  }
  palleteNumber++;
  const palleteContainer = getElementById('palleteContainer');
  palleteContainer.innerHTML = colorPalleteStates[palleteNumber].innerHTML;
  getElementById('numberOfColors').innerHTML =
    document.getElementsByClassName('pallete_color').length;
};

getElementById('incrementColors').addEventListener(
  'click',
  incrementNumberOfColors
);
getElementById('decrementColors').addEventListener(
  'click',
  decrementNumberOfColors
);

getElementById('generateColors').addEventListener('click', generatePallete);

getElementById('palleteContainer').addEventListener(
  'mouseover',
  colorNameDisplayHandler
);

getElementById('palleteContainer').addEventListener(
  'mouseout',
  colorNameRemovalHandler
);

getElementById('undo').addEventListener('click', undoHandler);
getElementById('redo').addEventListener('click', redoHandler);
