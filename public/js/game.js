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

const getDIvTemplate = function(classes, id) {
  const template = `<div class="${classes.join(' ')}" id="${id}"></div>`;
  const temp = document.createElement('div');
  temp.innerHTML = template;
  return temp.firstChild;
};

const generateChildTemplate = function(rowNum, childClass) {
  const holes = [];
  for (let divNum = 1; divNum < 6; divNum++) {
    const id = `${childClass}_${rowNum}_${divNum}`;
    holes.push(getDIvTemplate([childClass, 'inactive'], id));
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

const generateSourceColor = function(colors) {
  const sourcePlace = document.querySelector('#source-place');
  colors.forEach(color => {
    const temp = document.createElement('div');
    temp.classList.add('source');
    temp.style['background-color'] = color;
    sourcePlace.appendChild(temp);
  });
};

const makeRowActive = function(id) {
  const children = document.querySelector(`#rows_${id}`).children;
  Array.from(children).forEach(child => child.classList.remove('inactive'));
};

const main = function() {
  generateTemplate('#placeholder', 'rows', 'hole');
  generateTemplate('#feedback', 'result', 'result-place');
  makeRowActive(1);
  sendXHR('GET', 'sourceColor', generateSourceColor);
};

window.onload = main;
