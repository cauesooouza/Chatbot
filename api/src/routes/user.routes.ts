import { Router } from "express";
import { UserController } from "../modules/User/user.controller.js";
import { validateInput } from "../middleware/validateInput.js";
import { createUserSchema } from "../modules/User/user.schema.js";
import { validatePermission } from "../middleware/validatePermission.js";

const userController = new UserController();

const router = Router();
router.post('/new', validateInput(createUserSchema), validatePermission, userController.create);
router.get('/all', userController.get);
router.get('/', userController.getByEmail);

export default router;