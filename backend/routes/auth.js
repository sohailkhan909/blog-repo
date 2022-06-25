const router = require("express").Router();

const User = require("../models/User");

const bcrypt = require("bcrypt");

// Register

router.post("/register", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPass = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPass,
  });

  const user = await newUser.save((err, data) => {
    if (err) {
      return res.status(400).json({ message: "Insert Fail", err });
    } else {
      return res
        .status(200)
        .json({ message: "Insert successfull", result: data });
    }
  });
});


//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(400).json("Wrong Credaintails");

    const validated = await bcrypt.compare(req.body.password, user.password);
    !validated && res.status(400).json("wrong");

    const { password, ...others } = user;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
