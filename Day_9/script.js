let cart = [];

const itemNameInput = document.getElementById("itemName");
const itemPriceInput = document.getElementById("itemPrice");
const priorityCheck = document.getElementById("priorityCheck");
const addBtn = document.getElementById("addBtn");
const removeFirstBtn = document.getElementById("removeFirstBtn");
const removeLastBtn = document.getElementById("removeLastBtn");
const previewBtn = document.getElementById("previewBtn");
const previewBox = document.getElementById("previewBox");
const itemsList = document.getElementById("itemsList");
const emptyMsg = document.getElementById("emptyMsg");
const totalValue = document.getElementById("totalValue");

function addItem(name, price, priority) {
  const existingIndex = cart.findIndex(item => item.name.toLowerCase() === name.toLowerCase());
  
  if (existingIndex !== -1) {
    cart[existingIndex].qty += 1;
  } else if (priority) {
    cart.unshift({ name, price, qty: 1 });
  } else {
    cart.push({ name, price, qty: 1 });
  }
  renderCart();
}