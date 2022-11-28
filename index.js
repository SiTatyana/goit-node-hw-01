
const argv = require("yargs").argv;
const contacts = require("./contacts.js");

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactsList = await contacts.listContacts();
      console.log(contactsList);
      break;

    case "get":
      const contact = await contacts.getContactById(contactId);
      if (!contact){
        throw new Error(`Contact with id=${contactId} not found`);
      }
      console.log(contact);
      break;

    case "add":
      const newContact = await contacts.addContact(name, email, phone);
      console.log(newContact);
      break;

    case "remove":
      const removeContact = await contacts.removeContact(contactId);
      console.log(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);


// "nodemon": "^2.0.20"