import {AsyncRouter} from 'express-async-router';
import localRoute from './local';

const router = AsyncRouter();

router.use('/', localRoute);

export default router;