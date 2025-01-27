require("dotenv").config(); // Load environment variables
const Comment = require("./models/Comments");
const Post = require("./models/Posts");
const mongoose = require("mongoose");

console.log(process.env);
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    const post = await Post.findById("678038657e7a7a24a72e5df5");

    if (!post) {
      return console.error("Post not found");
    }
    console.log("Blog Service connected to MongoDB");
    const comment = new Comment({
      content: "pokemon sounds cool",
      author: "677d99b6a2d16beedfabdfc8",
      post: "678038657e7a7a24a72e5df5",
    });
    await comment.save();
    post.comments.push(comment._id);
    await post.save();
  })
  .catch((err) => {
    console.error("Database connection error:", err);
  });
