import express from 'express';

import { registerPatient , getAllPatient , deleteAllPatient , getTodayPatient, updateMedicalHistory , searchPatientByPhone , updatePatientInfo} from "../controllers/patient.controller.js"; 

const router = express.Router();

router.get('/' , getAllPatient)
router.get('/search' , searchPatientByPhone)
router.get('/todayPatient' , getTodayPatient)
router.post('/Create' , registerPatient)
router.patch('/update/:id' , updatePatientInfo)
router.patch('/updateMedicalHistory/:_id' , updateMedicalHistory)
router.delete('/Delete' , deleteAllPatient)



export default router;


