import express from 'express'
import { userLogin, createUser } from '../controllers/users.controller.js';

const router = express.Router();

router.post('/login', userLogin);

router.post('/create', createUser)

export default router;

