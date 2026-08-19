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
