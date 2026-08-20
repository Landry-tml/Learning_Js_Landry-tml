function Contact(id, name, phone, email) {
  this.id = id;
  this.name = name;
  this.phone = phone;
  this.email = email;
}

Contact.prototype.getInitials = function () {
  return this.name
    .split(" ")
    .map(part => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};

const addressBookManager = {
  contacts: [],
  nextId: 1,

  addContact(name, phone, email) {
    const contact = new Contact(this.nextId++, name, phone, email);
    this.contacts.push(contact);
    return contact;
  },

  findContact(query) {
    const q = query.trim().toLowerCase();
    if (q === "") return this.contacts;
    return this.contacts.filter(c =>
      c.name.toLowerCase().includes(q) ||
      (c.phone && c.phone.toLowerCase().includes(q)) ||
      (c.email && c.email.toLowerCase().includes(q))
    );
  },

  removeContact(id) {
    this.contacts = this.contacts.filter(c => c.id !== id);
  },

  updateContact(id, updates) {
    const contact = this.contacts.find(c => c.id === id);
    if (contact) Object.assign(contact, updates);
    return contact;
  },

  getById(id) {
    return this.contacts.find(c => c.id === id);
  }
};

const form = document.getElementById("contactForm");
const nameInput = document.getElementById("nameInput");
const phoneInput = document.getElementById("phoneInput");
const emailInput = document.getElementById("emailInput");
const submitBtn = document.getElementById("submitBtn");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const searchInput = document.getElementById("searchInput");
const cardsList = document.getElementById("cardsList");
const emptyMsg = document.getElementById("emptyMsg");
const countLabel = document.getElementById("countLabel");

let editingId = null; 

function saveContacts() {
  localStorage.setItem("addressBookContacts", JSON.stringify(addressBookManager.contacts));
  localStorage.setItem("addressBookNextId", String(addressBookManager.nextId));
}


function renderContacts(list) {
  cardsList.innerHTML = "";

  if (list.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
    list.forEach(contact => {
      const card = document.createElement("div");
      card.className = "card";

      const avatar = document.createElement("div");
      avatar.className = "avatar";
      avatar.textContent = contact.getInitials();

      const info = document.createElement("div");
      info.className = "card-info";
      const nameEl = document.createElement("div");
      nameEl.className = "name";
      nameEl.textContent = contact.name;
      const detailEl = document.createElement("div");
      detailEl.className = "detail";
      detailEl.textContent = [contact.phone, contact.email].filter(Boolean).join(" \u00b7 ") || "No details";
      info.appendChild(nameEl);
      info.appendChild(detailEl);

      const actions = document.createElement("div");
      actions.className = "card-actions";

      const editBtn = document.createElement("button");
      editBtn.className = "icon-btn";
      editBtn.textContent = "\u270e";
      editBtn.addEventListener("click", () => startEdit(contact.id));

      const delBtn = document.createElement("button");
      delBtn.className = "icon-btn";
      delBtn.textContent = "\u2715";
      delBtn.addEventListener("click", () => {
        addressBookManager.removeContact(contact.id);
        refresh();
      });

      actions.appendChild(editBtn);
      actions.appendChild(delBtn);

      card.appendChild(avatar);
      card.appendChild(info);
      card.appendChild(actions);
      cardsList.appendChild(card);
    });
  }

  countLabel.textContent = `${addressBookManager.contacts.length} contact${addressBookManager.contacts.length === 1 ? "" : "s"}`;

  saveContacts();
}

function refresh() {
  renderContacts(addressBookManager.findContact(searchInput.value));
}

function startEdit(id) {
  const contact = addressBookManager.getById(id);
  if (!contact) return;
  editingId = id;
  nameInput.value = contact.name;
  phoneInput.value = contact.phone;
  emailInput.value = contact.email;
  submitBtn.textContent = "Save Changes";
  cancelEditBtn.style.display = "inline-block";
  nameInput.focus();
}

function stopEdit() {
  editingId = null;
  form.reset();
  submitBtn.textContent = "Add Contact";
  cancelEditBtn.style.display = "none";
}



form.addEventListener("submit", function (e) {
  e.preventDefault();
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();
  const email = emailInput.value.trim();

  if (name === "") {
    alert("Name is required.");
    return;
  }

  if (editingId !== null) {
    addressBookManager.updateContact(editingId, { name, phone, email });
  } else {
    addressBookManager.addContact(name, phone, email);
  }

  stopEdit();
  refresh();
});

cancelEditBtn.addEventListener("click", stopEdit);


searchInput.addEventListener("input", refresh);


const savedContacts = JSON.parse(localStorage.getItem("addressBookContacts"));
const savedNextId = localStorage.getItem("addressBookNextId");

if (savedContacts && savedContacts.length > 0) {
  
  addressBookManager.contacts = savedContacts.map(
    c => new Contact(c.id, c.name, c.phone, c.email)
  );
  addressBookManager.nextId = savedNextId ? Number(savedNextId) : addressBookManager.contacts.length + 1;
}

refresh();