const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
const dotenv = require("dotenv").config();
const connectDB = require("./utils/db");

const http = require("http");

const app = express();
//const hostname = "0.0.0.0";
const port = process.env.PORT || 3001;

connectDB();

// Routers
const homeRoute = require("./routes/home.route");
const loginRoute = require("./routes/login.route");
const logoutRoute = require("./routes/logout.route");
const inputRoute = require("./routes/input.route");
const tableRoute = require("./routes/table.route");

app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(cookieParser("secret"));
app.use(
  session({
    cookie: { maxAge: 60000 * 10 },
    secret: "secret",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(flash());

app.use("/", homeRoute);
app.use("/login", loginRoute);
app.use("/logout", logoutRoute);
app.use("/input", inputRoute);
app.use("/table", tableRoute);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
