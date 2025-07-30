import { Router } from "express";
import { LeadController } from "../modules/Lead/lead.controller.js";
import { validateInput } from "../middleware/validateInput.js";
import { createLeadSchema, updateLeadSchema } from "../modules/Lead/lead.schema.js";
import { sessionAuth } from "../middleware/sessionAuth.js";
import { validatePermission } from "../middleware/validatePermission.js";

const leadController = new LeadController();
const router = Router();

router.post('/new', validateInput(createLeadSchema), validatePermission, leadController.create);
// router.get('/dashboard', )
router.get('/all', sessionAuth, leadController.get);
router.get('/:id', sessionAuth, leadController.getById);
router.patch('/update', validateInput(updateLeadSchema), validatePermission, leadController.update);
router.delete('/delete/:id', sessionAuth, leadController.delete);

export default router;