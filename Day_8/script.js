function areaOfCircle(radius) {
  return Math.PI * radius * radius;
}
function areaOfRectangle(width, height) {
  return width * height;
}
function areaOfTriangle(base, height) {
  return 0.5 * base * height;
}
function areaOfSquare(side) {
  return side * side;
}

function calculateArea(shape, ...dimensions) {
  switch (shape) {
    case "circle": return areaOfCircle(dimensions[0]);
    case "rectangle": return areaOfRectangle(dimensions[0], dimensions[1]);
    case "triangle": return areaOfTriangle(dimensions[0], dimensions[1]);
    case "square": return areaOfSquare(dimensions[0]);
    default: return null;
  }
}

function createFormatter(unit) {
  return function (value) {
    return `${value.toFixed(2)} ${unit}`;
  };
}
const formatArea = createFormatter("units\u00b2");

const shapeConfig = {
  circle: [{ id: "radius", label: "Radius" }],
  rectangle: [{ id: "width", label: "Width" }, { id: "height", label: "Height" }],
  triangle: [{ id: "base", label: "Base" }, { id: "height", label: "Height" }],
  square: [{ id: "side", label: "Side length" }]
};

const shapeSelect = document.getElementById("shapeSelect");
const dimensionInputs = document.getElementById("dimensionInputs");
const calcBtn = document.getElementById("calcBtn");
const resultBox = document.getElementById("result");
const resultValue = document.getElementById("resultValue");

function renderInputs(shape) {
  dimensionInputs.innerHTML = "";
  shapeConfig[shape].forEach(field => {
    const label = document.createElement("label");
    label.setAttribute("for", field.id);
    label.textContent = field.label;

    const input = document.createElement("input");
    input.type = "number";
    input.id = field.id;
    input.min = "0";
    input.step = "any";
    input.placeholder = "e.g. 5";

    dimensionInputs.appendChild(label);
    dimensionInputs.appendChild(input);
  });
  resultBox.classList.remove("show");
}

function handleCalculate() {
  const shape = shapeSelect.value;
  const fields = shapeConfig[shape];
  const values = [];

  for (const field of fields) {
    const raw = document.getElementById(field.id).value;
    const num = Number(raw);
    if (raw.trim() === "" || isNaN(num) || num <= 0) {
      showError(`Enter a valid positive number for ${field.label.toLowerCase()}.`);
      return;
    }
    values.push(num);
  }
}