const sourceColors = [
  '#ff2121',
  '#a24040',
  '#2828f1',
  '#f5a106',
  '#08d208',
  '#7b0a7b',
  '#eaea0e',
  '#f952f9'
];

// ['red', 'brown', 'blue', 'orange', 'green', 'purple', 'yellow', 'pink'];

const generateChildTemplate = function(rowNum, childClass) {
  const holes = [];
  for (let divNum = 1; divNum < 6; divNum++) {
    const temp = document.createElement('div');
    temp.classList.add(childClass);
    temp.setAttribute('id', `${childClass}_${rowNum}_${divNum}`);
    holes.push(temp);
  }
  return holes;
};

const generateTemplate = function(divID, parentClass, childClass) {
  const placeholder = document.querySelector(divID);
  for (let rowNum = 10; rowNum > 0; rowNum--) {
    const temp = document.createElement('div');
    temp.classList.add(parentClass);
    temp.setAttribute('id', `${parentClass}_${rowNum}`);
    generateChildTemplate(rowNum, childClass).forEach(child =>
      temp.appendChild(child)
    );
    placeholder.appendChild(temp);
  }
};

const generateSourceColor = function() {
  const sourcePlace = document.querySelector('#source-place');
  sourceColors.forEach(color => {
    const temp = document.createElement('div');
    temp.classList.add('source');
    temp.style['background-color'] = color;
    sourcePlace.appendChild(temp);
  });
};

const main = function() {
  generateTemplate('#placeholder', 'rows', 'hole');
  generateTemplate('#feedback', 'result', 'result-place');
  generateSourceColor();
};

window.onload = main;
