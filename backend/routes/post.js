const router = require("express").Router();
const Post = require("../models/Post");
const User = require("../models/User");

// Create post
router.post("/", async (req, res) => {
  const newPost = new Post(req.body);
  const savePost = await newPost.save((err, result) => {
    if (err) {
      return res.status(200).json({ msg: "failed posting", er: err });
    } else {
      return res.status(200).json({ msg: "Data post", reslt: result });
    }
  });
});

//update post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.id) {
      try {
        const updatePost = await Post.findByIdAndUpdate(req.params.id, {
          $set: req.body,
        });
        res.status(200).json({ msg: "Update post", updatePost });
      } catch (err) {
        res.status(500).json({ msg: "error throw", err });
      }
    } else {
      res.status(400).json({ msg: "you can not update only your post" });
    }
  } catch (err) {
    res.status(500).json({ msg: "failed" });
  }
});

//delete post
//id work in post collection (pass in postman )
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.id) {
      try {
        await post.delete();
        res.status(200).json({ msg: "Post has been deleted" });
      } catch (err) {
        res.status(500).json({ msg: "error throw", err });
      }
    } else {
      res.status(400).json({ msg: "you can not delete only your post" });
    }
  } catch (err) {
    res.status(500).json({ msg: "failed", err });
  }
});

//get post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({ msg: "Data Find", post });
  } catch (err) {
    res.status(500).json({ msg: "Unable to Find", err });
  }
});

//get all post
router.get("/", async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.findById({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json({ msg: "Data Find", posts });
  } catch (err) {
    res.status(500).json({ msg: "Unable to Find", err });
  }
});

module.exports = router;
