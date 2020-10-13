const { Router } = require("express");
const {
  getContactsController,
  createContactController,
  updateContactController,
  deleteContactController,
  findByIdController,
} = require("../contacts/contacts.controller");
const { checkAuthTokenMiddleware } = require("../middlewares/auth.middleware");

const contactsRouter = Router();

contactsRouter.get("/", checkAuthTokenMiddleware, getContactsController);

contactsRouter.get("/:contactId", checkAuthTokenMiddleware, findByIdController);

contactsRouter.post("/", checkAuthTokenMiddleware, createContactController);

contactsRouter.delete(
  "/:contactId",
  checkAuthTokenMiddleware,
  deleteContactController
);

contactsRouter.patch("/", checkAuthTokenMiddleware, updateContactController);

module.exports = contactsRouter;
