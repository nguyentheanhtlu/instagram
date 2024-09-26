import express from "express";
import UserController from "./../controllers/user.controller";
import Token from "../middlewares/jwt.middleware";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

export const router = express.Router();
const app = express();
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
const uploadAvatar = multer({ storage: storage });


router.post("/signup", UserController.signUpUser);
router.post("/login", UserController.loginUser);
router.get("/logout", UserController.logOut);

router.post("/password/forgot", UserController.forgotPassword);
router.put("/password/reset/:token", UserController.resetPassword);

router.use(Token.veryfyAccessToken);

router.put("/update/password", UserController.UpdatePassword);
router.put(
  "/update/profile",
  uploadAvatar.single("avatar"),
  UserController.updateProfile
);

router.get("/follow/:id", UserController.followUser);

router.get("/me", UserController.getAccountDetails);



router.get("/users", UserController.searchUsers);
router.get(
  "/users/suggested",
  UserController.suggestedUsers
);
router.get(
  "/userdetails/:id",
  UserController.getUserDetailsById
);
router.get("/user/:username", UserController.getUserDetail);