import { Router } from "express";
import { LeadController } from "../modules/Lead/lead.controller.js";
import { validateInput } from "../middleware/validations/validateInput.js";
import { createLeadSchema, updateLeadSchema } from "../modules/Lead/lead.schema.js";
import { sessionAuth } from "../middleware/auth/sessionAuth.js";
import { validatePermission } from "../middleware/validations/validatePermission.js";

const leadController = new LeadController();
const router = Router();

router.post('/new', validateInput(createLeadSchema), validatePermission, leadController.create);
router.get('/all', sessionAuth, leadController.get);
router.get('/:id', sessionAuth, leadController.getById);
router.patch('/update', validateInput(updateLeadSchema), validatePermission, leadController.update);
router.delete('/delete/:id', sessionAuth, leadController.delete);

export default router;