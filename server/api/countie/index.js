import { AsyncRouter } from 'express-async-router';
import { turnOffAllCounties, turnOffById } from './countie.controller';

const router = new AsyncRouter();

router.put('/', turnOffAllCounties);
router.put('/:id', turnOffById);

export default router;