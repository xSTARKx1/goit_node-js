const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      default: "NoName",
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

class Contact {
  constructor() {
    this.db = mongoose.model("Contacts", contactSchema);
  }

  getContacts = async () => {
    return await this.db.find();
  };

  createContact = async (contactData) => {
    return await this.db.create(contactData);
  };

  updateContact = async (contactId, contactData) => {
    return await this.db.findByIdAndUpdate(contactId, contactData, {
      new: true,
    });
  };

  deleteContact = async (contactId) => {
    return await this.db.findByIdAndRemove(contactId);
  };

  getContactById = async (contactId) => {
    return await this.db.findById(contactId);
  };
}

module.exports = new Contact();
