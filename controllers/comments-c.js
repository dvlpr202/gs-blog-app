//model
const Comments = require("../models/comments-m")
//create
const createComment = async (req, res) => {
    try {
        const { comment, post_id } = req.body;
        req.user.password = undefined;
        req.user.__v = undefined;
        const comments = await new Comments({
            comment,
            post_id,
            posted_by: req.user
        })
        comments.save()
        res.status(201).json(comments)
    } catch (error) {
        res.status(500).json(error)
    }
}
const showAllComments = async (req, res) => {
    try {
        const comments = await Comments.find({
            post_id: req.params.id
        })
        .populate("posted_by", "_id name username email")
        res.status(200).json(comments)
    } catch (error) {
        res.status(500).json(error)
    }
}
//delete comment
const deleteComment = async (req, res) => {
    try {
      const comments = await Comments.findById(req.params.id);
      comments.delete();
      res.status(200).json("post destroyed!");
    } catch (error) {
      res.status(500).json(error);
    }
  };

module.exports = {
    createComment,
    showAllComments,
    deleteComment
}