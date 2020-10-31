import { AsyncRouter } from 'express-async-router';
import { update, getByQuery, getAll } from './user.controller';

const router = new AsyncRouter();

router.get('/:query', getByQuery);
router.get('', getAll);
router.put('/', update);

export default router;