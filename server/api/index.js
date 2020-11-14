import { AsyncRouter } from 'express-async-router';

import user from './user';
import countie from './countie';

const router = AsyncRouter();

router.use('/users', user);
router.use('/conties', countie);

export default router;