const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postsSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  sdesc: {
    type: String,
    required: true,
  },
  fdesc: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
  },
  categories: {
    type: Array,
  },
  likes: [
    {
      type: ObjectId,
      ref: "User",
    },
  ],
  comments: [
    {
      text: String,
      posted_by: {
        type: ObjectId,
        ref: "User",
      },
    },
  ],
  posted_by: {
    type: ObjectId,
    ref: "User",
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Post", postsSchema);
