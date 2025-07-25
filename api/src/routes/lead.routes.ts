import { Router } from "express";
import { LeadController } from "../modules/Lead/lead.controller.js";
import { validateInput } from "../middleware/validateInput.js";
import { createLeadSchema, updateLeadSchema } from "../modules/Lead/lead.schema.js";
import { sessionAuth } from "../middleware/sessionAuth.js";

const leadController = new LeadController();
const router = Router();

router.post('/new', validateInput(createLeadSchema), leadController.create);
// router.get('/dashboard', )
router.get('/all', sessionAuth, leadController.get);
router.get('/:id', sessionAuth, leadController.getById);
router.patch('/update', validateInput(updateLeadSchema), leadController.update);
router.delete('/delete/:id', sessionAuth, leadController.delete);

export default router;