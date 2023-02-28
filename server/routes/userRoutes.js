import { Router } from 'express';
const userRoutes = Router();
import * as userController from "../controllers/usersController.js";

// Get Routes
userRoutes.route('/:username').get(userController.getUser);

// Put Routes
userRoutes.route('/updateUser').put(userController.updateUser);

export default userRoutes;