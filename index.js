const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const argv = require("yargs").argv;
const contactsRouter = require("./contacts/router");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use(cors());

app.use("/api/contacts", contactsRouter);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
