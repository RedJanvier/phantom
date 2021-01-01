import { Router } from 'express';
import role from './role';
import user from './user';

const router = Router();

router.use('/roles', role);
router.use('/users', user);

export default router;
