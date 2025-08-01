import { Router } from "express";
import { UserController } from "../modules/User/user.controller.js";
import { validateInput } from "../middleware/validations/validateInput.js";
import { createUserSchema } from "../modules/User/user.schema.js";
import { validatePermission } from "../middleware/validations/validatePermission.js";
import { sessionAuth } from "../middleware/auth/sessionAuth.js";

const userController = new UserController();

const router = Router();
router.post('/new', validateInput(createUserSchema), validatePermission, userController.create);
router.get('/all', sessionAuth, userController.get);
router.get('/', sessionAuth, userController.getByEmail);

export default router;