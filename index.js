const contacts = require("./contacts.js");
const argv = require("yargs").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts().then((res) => console.table(res));
      break;

    case "get":
      contacts.getContactById(id).then((res) => console.log(res));
      break;

    case "add":
      contacts.addContact(name, email, phone).then((res) => console.log(res));
      break;

    case "remove":
      contacts.removeContact(id).then((res) => console.log(res));
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}
invokeAction(argv);
