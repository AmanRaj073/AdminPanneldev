const express = require("express");
const app = express();

const mongoose = require("mongoose");
const cookiesparser = require("cookie-parser");
const flash = require("connect-flash");
const session = require("express-session");

require("dotenv").config();
const path = require("path");
app.use(cookiesparser());

app.set("view engine", "ejs");
app.set("views", "View");

app.use(express.static(path.join(__dirname, "Public")));

app.use(express.urlencoded({ extended: true }));

const authent = require("./middleware/middleware");
app.use(authent.filterz);

const homie = require("./Router/router");
app.use(homie);

const blog = require("./Router/blogR");
app.use(blog);

const user = require("./Router/userR");
app.use(user);

const db =
"mongodb+srv://bravebrowsersurface:0kvqPevUYtGifz3J@cluster0.jbx8dbw.mongodb.net/NewEra";

app.use(
  session({
    secret: "AOMP",
    saveUninitialized: true,
    resave: true,
  })
);
app.use(flash());

// const authenter = require("./middleware/middleware")
// app.use(authenter.filterz);

// const faq = require("./Controller/faq")
// app.use(faq)

const port = process.env.PORT || 3300;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    app.listen(port, () => {
      console.log(`Port host on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Data Base is Offline");
  });
