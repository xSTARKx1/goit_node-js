const { Router } = require("express");
const contacts = require("../contacts.js");
const contactsRouter = Router();

contactsRouter.get("/", async (req, res) => {
  const list = await contacts.listContacts();
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(list);
});

contactsRouter.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(+contactId);

  if (contact) {
    res.status(200).json(contact);
    return;
  }

  res.status(404).json({ message: "Not found" });
});

contactsRouter.post("/", async (req, res) => {
  const { name, email, phone } = req.body;
  if (typeof name === "string" && name && email && phone) {
    await contacts.addContact(name, email, phone);
    res.status(201).json(req.body);
    return;
  }

  res.status(400).json({ message: "missing required name field" });
});

contactsRouter.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;

  const contact = await contacts.getContactById(+contactId);

  if (contact) {
    await contacts.removeContact(+contactId);
    res.status(200).json({ message: "contact deleted" });
    return;
  }
  res.status(404).json({ message: "Not found" });
});

contactsRouter.patch("/:contactId", async (req, res) => {
  const { name, email, phone } = req.body;
  const { contactId } = req.params;

  if (!(name || email || phone)) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  const contact = await contacts.getContactById(+contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  const updatedContact = await contacts.updateContact(+contactId, {
    name,
    email,
    phone,
  });

  res.status(200).json(updatedContact);
});

module.exports = contactsRouter;
