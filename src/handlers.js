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

const provideSourceColor = (req, res) => res.json(sourceColors);

module.exports = { provideSourceColor };
