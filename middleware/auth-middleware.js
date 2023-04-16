const jwt = require("jsonwebtoken");
const config = require("config");
const jwtConfig = config.get("jwt");

function getToken(req) {
  const tokenHeader = req.headers.authorization;
  if (tokenHeader) {
    const token = tokenHeader.split(" ")[1];
    return token;
  }
}

// middleware to check if the user is logged in
const requireAuth = (req, res, next) => {
  const token = getToken(req);
  if (token) {
    jwt.verify(token, jwtConfig.secret, (err, decodedToken) => {
      if (err) {
        res.send("Token invalid");
      } else {
        res.locals.token = decodedToken;
        next();
      }
    });
  } else {
    res.status(401).send("Please login");
  }
};

module.exports = { requireAuth, getToken };
