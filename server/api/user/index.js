import { AsyncRouter } from 'express-async-router';
import { update, getByQuery } from './user.controller';

const router = new AsyncRouter();

router.get('/:query', getByQuery);
router.put('/', update);

export default router;