const ContactDB = require("./contacts.model");

const getContactsController = async (req, res, next) => {
  try {
    const contacts = await ContactDB.getContacts();
    res.json(contacts);
  } catch (e) {
    next(e);
  }
};

const createContactController = async (req, res, next) => {
  try {
    const { body } = req;
    const newContact = await ContactDB.createContact(body);
    res.status(201).json(newContact);
  } catch (e) {
    next(e);
  }
};

const updateContactController = async (req, res, next) => {
  try {
    const { id, ...data } = req.body;
    const updatedContact = await ContactDB.updateContact(id, data);
    res.status(200).json(updatedContact);
  } catch (e) {
    next(e);
  }
};

const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await ContactDB.deleteContact(contactId);
    res.end();
  } catch (e) {
    next(e);
  }
};

const findByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await ContactDB.getContactById(contactId);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json(contact);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getContactsController,
  createContactController,
  updateContactController,
  deleteContactController,
  findByIdController,
};
