import { Router } from 'express';
import { role } from '../controllers';

const router = Router();

router.post('/', role.create);
router.route('/:id').delete(role.delete).patch(role.update);

export default router;
