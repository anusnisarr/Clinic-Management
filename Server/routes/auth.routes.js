import express from 'express';

import { login , register } from "../controllers/auth.controller.js"; 

const router = express.Router();
router.get('/Login' , login)
router.get('/SignUp' , register)

export default router;