const allowedOrigins = require("../config/allowedOrigins");

const credentials = (req, res, next) => {
  console.log(req.headers.origin);
  const origin = req.headers.origin;

  console.log("here");
  console.log(allowedOrigins);
  if (allowedOrigins.includes(origin)) {
    console.log("in if");
    res.header("Access-Control-Allow-Credentials", true);
  }
  next();
};

module.exports = credentials;
