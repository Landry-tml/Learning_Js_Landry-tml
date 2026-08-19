let cart = [];

const itemNameInput = document.getElementById("itemName");
const itemPriceInput = document.getElementById("itemPrice");
const priorityCheck = document.getElementById("priorityCheck");
const addBtn = document.getElementById("addBtn");
const removeFirstBtn = document.getElementById("removeFirstBtn");
const removeLastBtn = document.getElementById("removeLastBtn");
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

function removeFirstItem() {
  if (cart.length === 0) return;
  cart.shift();
  renderCart();
}
function removeLastItem() {
  if (cart.length === 0) return;
  cart.pop();
  renderCart();
}
function removeItemByIndex(index) {
  cart.splice(index, 1);
  renderCart();
}

function getTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function renderCart() {
  itemsList.innerHTML = "";
  if (cart.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
    cart.forEach((item, index) => {
      const li = document.createElement("li");
      const nameSpan = document.createElement("span");
      nameSpan.className = "item-name";
      nameSpan.textContent = item.name;
      const qtySpan = document.createElement("span");
      qtySpan.className = "item-qty";
      qtySpan.textContent = `x${item.qty}`;
      const priceSpan = document.createElement("span");
      priceSpan.className = "item-price";
      priceSpan.textContent = `$${(item.price * item.qty).toFixed(2)}`;
      const delBtn = document.createElement("button");
      delBtn.className = "del-btn";
      delBtn.textContent = "✕";
      delBtn.addEventListener("click", () => removeItemByIndex(index));
      li.appendChild(nameSpan);
      li.appendChild(qtySpan);
      li.appendChild(priceSpan);
      li.appendChild(delBtn);
      itemsList.appendChild(li);
    });
  }
  totalValue.textContent = `$${getTotal().toFixed(2)}`;
}

addBtn.addEventListener("click", function () {
  const name = itemNameInput.value.trim();
  const price = Number(itemPriceInput.value);
  if (name === "" || isNaN(price) || price <= 0) {
    alert("Enter a valid item name and price.");
    return;
  }
  addItem(name, price, priorityCheck.checked);
  itemNameInput.value = "";
  itemPriceInput.value = "";
  priorityCheck.checked = false;
  itemNameInput.focus();
});

removeFirstBtn.addEventListener("click", removeFirstItem);
removeLastBtn.addEventListener("click", removeLastItem);

renderCart();