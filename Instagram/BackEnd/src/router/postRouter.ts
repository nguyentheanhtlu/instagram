import express from "express";
import multer from 'multer';
import path from 'path';
import Posts from "../controllers/post.controller";
import Token from "../middlewares/jwt.middleware";
import fs from 'fs';
const uploadDir = path.join(__dirname, '../../../uploads/');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

export const Post = express.Router();

Post.use(Token.veryfyAccessToken);

Post.post("/post/new", upload.single('image_url'), Posts.newPost);

Post.get("/post/:id", Posts.likeUnlikePost)
  .delete("/post/:id", Posts.deletePost)
  .put("/post/:id", Posts.updateCaption);

Post.post("/post/comment/:id", Posts.newComment)
  .delete("/post/comment/:id", Posts.DeleteComment)
  .put("/post/comment/:id", Posts.updateComment);

Post.get("/posts", Posts.followersPosts);

Post.get("/posts/all",Posts.allPosts);

Post.get("/post/detail/:id", Posts.getPostDetails);