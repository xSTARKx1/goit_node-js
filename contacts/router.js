const { Router } = require("express");
const {
  getContactsController,
  createContactController,
  updateContactController,
  deleteContactController,
  findByIdController,
} = require("../contacts/contacts.controller");
const contactsRouter = Router();

contactsRouter.get("/", getContactsController);

contactsRouter.get("/:contactId", findByIdController);

contactsRouter.post("/", createContactController);

contactsRouter.delete("/:contactId", deleteContactController);

contactsRouter.patch("/", updateContactController);

module.exports = contactsRouter;
