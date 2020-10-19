import { AsyncRouter } from 'express-async-router';
import { login, register, authAdmin, me } from './controller';
import './passport';
import {isAuthenticated} from '../auth.service'

const router = new AsyncRouter();

router.post('/login', login);
router.post('/register', register);
router.post('/admin', authAdmin);
router.get('/me', isAuthenticated(), me)

export default router;