function Contact(id, name, phone, email) {
  this.id = id;
  this.name = name;
  this.phone = phone;
  this.email = email;
}

Contact.prototype.getInitials = function () {
  return this.name.split(" ").map(part => part[0]).join("").slice(0, 2).toUpperCase();
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

let editingId = null; // tracks whether the form is adding or updating