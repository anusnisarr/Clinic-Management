import express from 'express';

import { getAllVisits , getTodayVisit , registerPatientAndVisit , updateMedicalHistory , deleteAllVisits } from "../controllers/patient.controller.js"; 

const router = express.Router();

router.get('/' , getAllVisits)
router.get('/todayPatient' , getTodayVisit)
router.post('/registerPatientAndVisit' , registerPatientAndVisit)
router.patch('/updateMedicalHistory/:_id' , updateMedicalHistory)
router.delete('/Delete' , deleteAllVisits)



export default router;


