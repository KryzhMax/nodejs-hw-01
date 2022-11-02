const { Command } = require("commander");
const program = new Command();
const path = require("path");

const contacts = require("./db/contacts");

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "add":
      const addedContact = await contacts.addContact({ name, email, phone });
      break;
    case "remove":
      const removedContact = await contacts.removeContact(id);
      break;
    case "get":
      const chosenContact = await contacts.getContactById(id);
      break;
    case "list":
      const allContacts = await contacts.listContacts();
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);
const argv = program.opts();
invokeAction(argv);
