const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const contactsRouter = require("./contacts/router");
const mongoose = require("mongoose");

const runServer = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, { useUnifiedTopology: true });
    console.log("Database connection successful!");
  } catch (e) {
    process.exit(1);
  }

  const PORT = process.env.PORT || 3000;
  const app = express();

  app.use(express.json());

  app.use(cors());

  app.use("/api/contacts", contactsRouter);

  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
};

runServer();
