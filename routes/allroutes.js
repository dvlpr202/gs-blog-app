//express
const express = require("express");
//router
const router = express.Router();
//user apis
const {
  register,
  login,
} = require("../controllers/authentication/user-auth-c");
//user routes
router.post("/u/reg", register);
router.post("/u/log", login);
//middleware
const middleware = require("../controllers/authentication/middleware");
//post apis
const {
  createPost,
  showAllPosts,
  specificUserPosts,
  specificCate,
  specificPost,
  updatePost,
  deletePost,
  likePost,
  unlikePost,
} = require("../controllers/post-c");
//post routes
router.post("/p/create", middleware, createPost);
router.get("/p/show", showAllPosts);
router.get("/p/sp/u/posts", middleware, specificUserPosts);
router.get("/p/sp/cate/:categories", specificCate);
router.get("/p/sp/post/:id", specificPost);
router.put("/p/up/post/:id", middleware, updatePost);
router.delete("/p/d/post/:id", middleware, deletePost);
router.put("/p/like", middleware, likePost);
router.put("/p/unlike", middleware, unlikePost);
//comments apis
const { createComment, showAllComments, deleteComment } = require("../controllers/comments-c");
//comments routes
router.post("/p/comment/create", middleware, createComment);
router.get("/p/comment/show/:id", showAllComments);
router.delete("/p/comment/delete/:id", middleware, deleteComment);

module.exports = router;
