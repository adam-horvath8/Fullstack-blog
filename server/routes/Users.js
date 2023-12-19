const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("SUCCESS");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await Users.findOne({ where: { username: username } });

    if (!user) {
      return res.json({ error: "User doesn't exist" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.json({ error: "Wrong username and password combination" });
    }

    const accesToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );
    res.json(accesToken);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
