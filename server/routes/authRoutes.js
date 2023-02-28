import { Router } from 'express';
const authRoutes = Router();
import * as userController from "../controllers/usersController.js";
import verifyUser  from "../middleware.js";

// Post Routes
authRoutes.route('/register').post(userController.registerUser);
// authRoutes.route('/registerEmail').post();
authRoutes.route('/login').post(verifyUser, userController.loginUser);
// authRoutes.route('/authenticate').post();

// Get Routes
authRoutes.route('/generateOtp').get(userController.generateOtp);
authRoutes.route('/verifyOtp').get(userController.verifyOtp);
authRoutes.route('/createResetSession').get(userController.createResetSession);

// Put Routes
authRoutes.route('/resetPassword').put(userController.resetPassword);

export default authRoutes;