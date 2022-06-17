//model
const Post = require("../models/posts-m");
//create
const createPost = async (req, res) => {
  try {
    const { title, sdesc, fdesc, picture, categories } = req.body;
    req.user.password = undefined;
    req.user.__v = undefined;
    const post = await new Post({
      title,
      sdesc,
      fdesc,
      picture,
      categories,
      posted_by: req.user,
    });
    post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};
//show
const showAllPosts = async (req, res) => {
  try {
    const posts = await Post.find(req.body).populate(
      "posted_by",
      "_id name username email"
    );
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};
//specificUserPosts
const specificUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ posted_by: req.user._id }).populate(
      "posted_by",
      "_id name username email"
    );
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
};
//specificCategory
const specificCate = async (req, res) => {
  let regex = RegExp(req.params.categories, "i");
  try {
    const catePosts = await Post.find({ categories: regex })
    .populate("posted_by", "_id name username email")
    res.status(200).json(catePosts);
  } catch (error) {
    res.status(500).json(error);
  }
};
//specific data
const specificPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "posted_by",
      "_id name username email"
    );
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};
//update
const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    await Post.findByIdAndUpdate(post, { $set: req.body });
    res.status(200).json("post updated!");
  } catch (error) {
    res.status(500).json(error);
  }
};
//delete
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.delete();
    res.status(200).json("post destroyed!");
  } catch (error) {
    res.status(500).json(error);
  }
};
//like/unlike
const likePost = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $push: {
        likes: req.user._id,
      },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      return res.status(200).json(result);
    }
  });
};
const unlikePost = (req, res) => {
  Post.findByIdAndUpdate(
    req.body.postId,
    {
      $pull: {
        likes: req.user._id,
      },
    },
    {
      new: true,
    }
  ).exec((err, result) => {
    if (err) {
      return res.status(500).json(err);
    } else {
      return res.status(200).json(result);
    }
  });
};

module.exports = {
  createPost,
  showAllPosts,
  specificUserPosts,
  specificCate,
  specificPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
};
