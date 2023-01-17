const { Schema, model } = require("mongoose");

const postSchema = new Schema({
  postText: {
    type: String,
    required: "you need a post!",
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  postAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    required: true,
    trim: true,
  },
  comments: [
    {
      commentText: {
        type: String,
        req: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});
const Post = model("Post", postSchema);

module.exports = Post;
