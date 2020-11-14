import { AsyncRouter } from 'express-async-router';

const router = new AsyncRouter();

router.put('/', turnOffAllCounties);
router.put('/:id', turnOffById);

export default router;