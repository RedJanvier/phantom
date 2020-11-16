import { Router } from 'express';
import { user } from '../controllers';

const router = Router();

router.route('/').post(user.create).get(user.getAll);
router.route('/:id').get(user.getOne).delete(user.delete).patch(user.update);

export default router;
