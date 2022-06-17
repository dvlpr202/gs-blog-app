const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const commentsSchema = mongoose.Schema({
  comment: {
    type: String,
  },
  post_id: {
      type: String
  },
  posted_by: {
    type: ObjectId,
    ref: "User",
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Comments", commentsSchema);
