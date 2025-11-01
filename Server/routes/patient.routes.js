import express from 'express';

import { searchPatientByPhone , updatePatientInfo } from "../controllers/patient.controller.js"; 

const router = express.Router();

router.get('/search' , searchPatientByPhone)
router.patch('/update/:id' , updatePatientInfo)

export default router;


