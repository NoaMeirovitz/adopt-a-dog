const jwt = require("jsonwebtoken");
const config = require("config");
const { Users } = require("../models/users");
const { getToken } = require("../middleware/auth-middleware");
const jwtConfig = config.get("jwt");
const Joi = require("joi");
const { userSchema } = require("../schema/user");

const maxAge = 3 * 24 * 60 * 60; // 3 days

function createToken(user) {
  const userDataToSign = { ...user };
  delete userDataToSign.password;
  return jwt.sign({ ...user }, jwtConfig.secret, {
    expiresIn: maxAge,
  });
}

async function tryLogin(username, password) {
  const user = await Users.findOne({ username, password });

  if (!user) {
    return new Error("Auth error");
  }

  return user;
}

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await tryLogin(username, password);
    if (user instanceof Error) {
      res.status(401).json({
        message: "Invalid username or password",
      });
    } else {
      const token = createToken(user);

      res.status(201).json({
        userId: user.id,
        username: user.username,
        role: user.role,
        jwt: token,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function forgotPassword(req, res) {
  try {
    const { username, answer } = req.body;
    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.forgotPasswordAnswer.toLowerCase() !== answer.toLowerCase()) {
      return res.status(400).json({ message: "Incorrect answer" });
    }

    res.json({ message: "Correct answer", isValid: true });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
async function resetPassword(req, res) {
  try {
    const { username, password } = req.body;
    const user = await Users.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    user.password = password;
    await user.save();

    res.json({ message: "Password changed" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

async function refresh(req, res) {
  const token = getToken(req);
  if (token) {
    jwt.verify(token, jwtConfig.secret, (err, decodedToken) => {
      if (err) {
        res.send("Token invalid");
      } else {
        res.status(201).json({
          userId: decodedToken._doc._id,
          username: decodedToken._doc.username,
          role: decodedToken._doc.role,
        });
      }
    });
    return;
  }
  res.send({ status: "no token" });
}

async function logout(req, res) {
  res.cookie("jwt", "", {
    maxAge: 1,
  });
  res.status(200).json({
    logged_out: true,
  });
}

async function signup(req, res) {
  const { username, password, address, phone, forgotPasswordAnswer } = req.body;
  try {
    const user = {
      username: username,
      password: password,
      address: address,
      phone: phone,
      forgotPasswordAnswer,
    };
    const { error } = userSchema.validate(user);
    if (error) {
      throw new Error(error.message);
    }
    const userExist = await Users.findOne({ username });
    if (userExist) {
      throw new Error("User already exist");
    }

    const newUser = await Users.create(user);
    res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: err.message,
      status: 500,
    });
  }
}

module.exports = {
  login,
  logout,
  signup,
  refresh,
  forgotPassword,
  resetPassword,
};
