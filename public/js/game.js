let selectedColor = 'white';
const winMessage = 'Congrats You won the Game ..!';
const lossMessage = 'Oops... You Lost';

const sendXHR = function(method, url, callback, message = '') {
  const req = new XMLHttpRequest();
  req.onload = function() {
    if (this.status === 200) {
      callback(JSON.parse(this.responseText));
    }
  };
  req.open(method, url);
  method === 'POST' && req.setRequestHeader('Content-type', 'application/json');
  req.send(message);
};

const getDivTemplate = function(childClass, id) {
  const template = `<div class="${childClass}" id="${id}"></div>`;
  const temp = document.createElement('div');
  temp.innerHTML = template;
  return temp.firstChild;
};

const generateChildTemplate = function(rowNum, childClass) {
  const holes = [];
  for (let divNum = 1; divNum < 6; divNum++) {
    const id = `${childClass}_${rowNum}_${divNum}`;
    const divTemplate = getDivTemplate(childClass, id);
    divTemplate.onclick = applySelectedColor;
    holes.push(divTemplate);
  }
  return holes;
};

const generateTemplate = function(divID, parentClass, childClass) {
  const placeholder = document.querySelector(divID);
  for (let rowNum = 10; rowNum > 0; rowNum--) {
    const temp = document.createElement('div');
    temp.classList.add(parentClass);
    temp.classList.add('inactive');
    temp.setAttribute('id', `${parentClass}_${rowNum}`);
    generateChildTemplate(rowNum, childClass).forEach(child =>
      temp.appendChild(child)
    );
    placeholder.appendChild(temp);
  }
};

const generateSourceColor = function(colors) {
  const sourcePlace = document.querySelector('#source-place');
  colors.forEach(color => {
    const temp = document.createElement('div');
    temp.classList.add('source');
    temp.onclick = selectColor;
    temp.style['background'] = color;
    sourcePlace.appendChild(temp);
  });
};

const makeRowActive = id =>
  document.querySelector(`#rows_${id}`).classList.remove('inactive');

const makeRowInactive = id =>
  document.querySelector(`#rows_${id}`).classList.add('inactive');

const findActiveRow = function() {
  const rows = Array.from(document.querySelectorAll('.rows'));
  return rows.find(row => !row.classList.value.includes('inactive'));
};

const main = function() {
  generateTemplate('#placeholder', 'rows', 'hole');
  generateTemplate('#feedback', 'result', 'result-place');
  makeRowActive(1);
  sendXHR('GET', 'sourceColor', generateSourceColor);
};

window.onload = main;

/////////////////////////////////////////////////

const activateSources = function() {
  const sources = document.querySelector('#source-place').children;
  Array.from(sources).forEach(source => source.classList.remove('inactive'));
};

const selectColor = function() {
  activateSources();
  const target = event.target;
  selectedColor = target.style.background;
  target.classList.add('inactive');
};

const applySelectedColor = function() {
  if (selectedColor === 'white') return;
  const target = event.target;
  target.style.background = selectedColor;
  target.classList.add('shadow');
};

const findActiveHoles = function() {
  const rows = Array.from(document.querySelectorAll('.rows'));
  return rows.find(row => !row.classList.value.includes('inactive')).children;
};

const applyColor = function(id, num, color) {
  const resultPlace = Array.from(document.querySelector(id).children);
  const greyDiv = resultPlace.filter(child => !child.style.background);
  for (let index = 0; index < num; index++) {
    const child = greyDiv.shift();
    child.style.background = color;
  }
};

const fillResultField = function(id, result) {
  applyColor(id, result[0], 'white');
  applyColor(id, result[1], 'red');
};

const showCodeColor = function(rowId) {
  const previousRow = Array.from(document.querySelector(rowId).children);
  const codeHoles = document.querySelector('.code-row').children;
  previousRow.forEach((row, index) => {
    codeHoles[index].style.background = row.style.background;
  });
  shiftInstructionWindow(winMessage);
};

const showCheckResult = function({ result, activeRow, isCracked, gameOver }) {
  makeRowInactive(activeRow - 1);
  makeRowActive(activeRow);
  if (gameOver) return shiftInstructionWindow(lossMessage);
  fillResultField(`#result_${activeRow - 1}`, result);
  if (isCracked) showCodeColor(`#rows_${activeRow - 1}`);
};

const submitColors = function() {
  const activeHoles = findActiveHoles();
  const colors = Array.from(activeHoles).map(hole => hole.style.background);
  if (colors.includes('')) return alert('Please fill up the colors');
  sendXHR('POST', 'submitColors', showCheckResult, JSON.stringify({ colors }));
};

const shiftInstructionWindow = function(message) {
  document.querySelector('#quiteWindow').classList.remove('hide');
  document.querySelector('#quiteWindow p').innerText = message;
  document.querySelector('#playBoard').classList.add('inactive');
  document.querySelector('#source-place').classList.add('inactive');
  document.querySelector('#check').classList.add('hide');
};

const startNewGame = function() {};
