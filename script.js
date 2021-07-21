const getElementById = (id) => document.getElementById(id);
const getCurrentNumberOfColors = () =>
  Number(getElementById('numberOfColors').innerText);

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
  palleteContainer.innerHTML = '';
  for (let count = 0; count < getCurrentNumberOfColors(); count++) {
    const newPalleteColor = getPalleteColorDiv(getRandomColor());
    palleteContainer.appendChild(newPalleteColor);
  }
}

getElementById('incrementColors').addEventListener(
  'click',
  incrementNumberOfColors
);
getElementById('decrementColors').addEventListener(
  'click',
  decrementNumberOfColors
);

getElementById('generateColors').addEventListener('click', generatePallete);
