const fs = require('fs').promises;
const path = require('path');
// const path = require('node:path');
const { v4: uuidv4 } = require('uuid');


const filePath = path.join(__dirname,"/db/contacts.json");



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
    const deleteContact = contacts[idx];
    if(idx === -1){
      return null
    }
    contacts.splice(idx,1);
    await fs.writeFile(filePath, JSON.stringify(contacts));
    return deleteContact;
;  }
  
  async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        name: name,
        email: email,
        phone: phone,
        id:uuidv4(),
    }
    contacts.push(newContact);
    await fs.writeFile(filePath, JSON.stringify(contacts));
    return newContact;
  }

  module.exports = {
    listContacts,
    getContactById,
    addContact,
    removeContact,
  }

