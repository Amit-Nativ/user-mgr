import { AsyncRouter } from 'express-async-router';
import { getAll, update, getByQuery } from './user.controller';
import { isAuthenticated } from '../../auth/auth.service'

const router = new AsyncRouter();

router.get('/:query', getByQuery)
router.put('/', update)

export default router;