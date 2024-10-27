import express from "express";
import { 
    registerUser, 
    loginUser, 
    userProfile } from "../controllers/UserController.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get("/profile", userProfile);

export default userRouter;