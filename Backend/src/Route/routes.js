import express from 'express';
const Route = express.Router();
import * as UserController from '../controllers/registerUser.js';

Route.post("/register", UserController.registerUser);
Route.post("/login", UserController.loginUser);
Route.get("/userProfile", UserController.getUserProfileByUserId)

export default Route;