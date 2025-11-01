import express from 'express';

import { getAllVisits , getTodayVisit , insertNewVisit ,  registerPatientAndVisit , updateMedicalHistory , deleteAllVisits } from "../controllers/patient.controller.js"; 

const router = express.Router();

router.get('/' , getAllVisits)
router.get('/todayVisits' , getTodayVisit)
router.post('/registerPatientAndVisit' , registerPatientAndVisit)
router.post('/newVisit' , insertNewVisit)
router.patch('/updateMedicalHistory/:_id' , updateMedicalHistory)
router.delete('/Delete' , deleteAllVisits)



export default router;


