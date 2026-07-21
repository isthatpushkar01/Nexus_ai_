import { Router } from 'express';
import * as machineController from '../controllers/machineController.js';
import { authenticate } from '../middleware/auth.js';
import { validateBody, validateParams } from '../middleware/validation.js';
import { machineSchema } from '../utils/validators.js';
import { z } from 'zod';

const router = Router();

const idSchema = z.object({
  id: z.string(),
});

router.use(authenticate);

router.get('/', machineController.getMachines);
router.post('/', validateBody(machineSchema), machineController.createMachine);
router.get('/:id', validateParams(idSchema), machineController.getMachineById);
router.put('/:id', validateParams(idSchema), validateBody(machineSchema.partial()), machineController.updateMachine);
router.delete('/:id', validateParams(idSchema), machineController.deleteMachine);

export default router;
