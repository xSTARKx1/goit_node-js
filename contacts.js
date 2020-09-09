const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.resolve(__dirname, "db", "contacts.json");

async function listContacts() {
  const usersList = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(usersList);
}

async function getContactById(contactId) {
  const usersData = await listContacts();

  return usersData.find(({ id }) => id === contactId);
}

async function removeContact(contactId) {
  const usersData = await listContacts();
  const newList = usersData.filter(({ id }) => id !== contactId);
  fs.writeFile(contactsPath, JSON.stringify(newList));
}

async function addContact(name, email, phone) {
  const usersData = await listContacts();
  const id = usersData.length ? [...usersData].pop().id + 1 : 1;
  const newUser = {
    id,
    name,
    email,
    phone,
  };
  usersData.push(newUser);
  const usersDataAsJSON = JSON.stringify(usersData);
  fs.writeFile(contactsPath, usersDataAsJSON);
  return newUser;
}

module.exports = {
  listContacts,
  addContact,
  getContactById,
  removeContact,
};
