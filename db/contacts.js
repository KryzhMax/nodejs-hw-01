const nodemon = require("nodemon");
const fs = require("fs/promises");
const path = require("path");
const ids = require("short-id");

const contactsPath = path.join(__dirname, "contacts.json");

async function updateContactList(contacts) {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function listContacts() {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) return null;
  const [result] = contacts.splice(index, 1);
  await updateContactList(contacts);
  return result;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    id: ids.generate(),
    name,
    email,
    phone,
  };
  const newList = [...contacts, newContact];
  await updateContactList(newList);
  return newContact;
}

module.exports = {
  addContact,
  removeContact,
  getContactById,
  listContacts,
};
