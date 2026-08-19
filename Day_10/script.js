function Contact(id, name, phone, email) {
  this.id = id;
  this.name = name;
  this.phone = phone;
  this.email = email;
}

Contact.prototype.getInitials = function () {
  return this.name.split(" ").map(part => part[0]).join("").slice(0, 2).toUpperCase();
};