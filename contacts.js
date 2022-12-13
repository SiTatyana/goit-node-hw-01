const fs = require('fs').promises;
const path = require('path');
// const path = require('node:path');
const { v4: uuidv4 } = require('uuid');


const filePath = path.join(__dirname,"/db/contacts.json");

const updateContacts = async(contacts) => await fs.writeFile (filePath, JSON.stringify(contacts, null, 2));


// TODO: задокументировать каждую функцию
async function listContacts() {
    const data = await fs.readFile(filePath);
    const contacts = JSON.parse(data);
    return contacts;
  }
  
  async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === String(contactId));
    if(!result){
        return null;
    }
    return result;
  }
  
  async function removeContact(contactId) {
    const contacts = await listContacts();
    const idx = contacts.findIndex(item => item.id === String(contactId));
    if(idx === -1){
      return null
    }
    const [result] =  contacts.splice(idx,1);
    await updateContacts(contacts);
    return result;
;  }
  
  async function addContact({name, email, phone}) {
    const contacts = await listContacts();
    const newContact = {
        id:uuidv4(),
        name: name,
        email: email,
        phone: phone,
    }
    contacts.push(newContact);
    await updateContacts(contacts)
    return newContact;
  }

  async function updateById (contactId, data) {
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === String(contactId));
    if(index === -1) {
      return null;
    }

    contacts[index] = {contactId, ...data};
    await updateContacts(contacts);
    return contacts[index];
  }

  module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateById,
  }

