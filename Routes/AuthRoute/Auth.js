import authController from "../../Controller/Auth/AuthController";
import express from "express";

const router = express.Router();
const AuthController = new authController();

router.post("/api/signup", (request, response) => {
  AuthController.SignUp(request, response);
});

router.post("/api/login", (request, response) => {
  AuthController.Login(request, response);
});

export default router;
