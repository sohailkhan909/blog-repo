const router = require("express").Router();
const bcrypt = require("bcrypt");
const Post =require("../models/Post");
const User = require("../models/User");

// update
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json({ msg: "Updated user", updatedUser });
    } catch (err) {
      res.status(500).json({ msg: "update fail", err });
    }
  } else {
    res.status(401).json("you can update only your account");
  }
});

//delete
router.delete("/:id", async (req, res) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({username: User.username})
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ msg: "User has been deleted" });
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json({ msg: "user not found", err });
    }
  } else {
    res.status(401).json("you can delete only your account");
  }
});

router.get("/:id", async (req, res)=>{
    try {
        const user = await User.findById(req.params.id);
        const {/*if dont show like email, password etc*/ password, ...others } = user._doc;
        res.status(200).json({msg:"Data Find", others })
    } catch (err) {
        res.status(500).json({msg:"Unable to Find", err})
    }
})


module.exports = router;
