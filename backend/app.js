const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const errorHandler = require("./middleware/errorHandler");
const manageCategory = require("./routes/managaeCategory");
const user = require("./routes/user");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const session = require("express-session");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const PORT = process.env.PORT || 3600;
app.use(cookieParser());
app.use(credentials);
// Cross Origin Resource Sharing
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

app.use(express.json());
//middleware for cookies

app.use("/", express.static(path.join(__dirname, "/public")));

// routes
app.use("/login", require("./routes/login"));
app.use("/user", user);
app.use("/register", require("./routes/register"));
app.use("/AdminPanel/manageCategory", manageCategory);
app.get("/AdminPanel", (req, res) => {
  res.status(200).send({ home: "home page" });
});
app.use("/logout", require("./routes/logout"));

app.get("/", (req, res) => {
  const token = req.cookies.jwt;
  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.sendStatus(401);
      }
      return res.sendStatus(403);
    }
    req.user = decoded.username;
    req.email = decoded.email;
    if (req.email) {
      return res.status(200).json({
        email: req.email,
        isAdmin: req.isAdmin,
        Login: true,
      });
    } else {
      return res.status(200).json({ Login: false });
    }
  });
});
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
