import Patient from "../models/patient.models.js"
import PatientVisit from "../models/visits.modals.js";

export const getTodayVisit = async (req, res) => {

    try {

        const today = new Date();

        // Start of today
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));

        // End of today
        const endOfDay = new Date(new Date().setHours(23, 59, 59, 999));

        const getTodayVisits = await PatientVisit.find({
        updatedAt: { $gte: startOfDay, $lte: endOfDay }
        }).populate("patient");

        return res.status(200).json(getTodayVisits);
        

    } catch (err) {
        console.error("getTodayPatients error:", err.message);
        return res.status(500).json({ error: "Server error" , message: err.message});
    }

}

export const searchPatientByPhone = async (req, res) => {

    const { phone } = req.query
    
    try {
        if (!phone || phone.length < 4) {
            return res.status(200).json([]); // Don't search if too short
        }

        if (!/^\d+$/.test(phone)) {
            return res.status(400).json({ error: 'Phone must contain digits only' });
        }

        const matches = await Patient.find({
            phone: { $regex: `${phone}`, $options: 'i' }
        }).limit(5);

        res.status(200).json(matches);
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

export const getAllVisits = async (req, res) => {
    try {
        const allPatient = await Patient.find().sort({ createdAt: -1 });

        res.status(201).json(allPatient);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

export const registerPatientAndVisit = async (req, res) => {
    const {PatientInfo , visitDetails} = req.body    
    
    try {
        const patient = await Patient.create(PatientInfo)
        const visit = await PatientVisit.create({...visitDetails , patient: patient._id})

        const patientWithVisit = await visit.populate("patient")        
                
        res.status(201).json(patientWithVisit);        

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

export const insertNewVisit = async (req, res) => {

    const { patientId , visitDetails } = req.body || {};
    
    try {
        const response = await PatientVisit.create({...visitDetails , patient: patientId})
        
        const newVisit = await response.populate("patient")

        console.log(newVisit);
        
        res.status(201).json(newVisit);
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

export const updatePatientInfo = async (req, res) => {
    const { id } = req.params
    const patientData = req.body    

    try {
        const updatedPatient = await Patient.findByIdAndUpdate(id, patientData  , {new: true})

        res.status(201).json(updatedPatient);
        console.log(updatedPatient);


    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

export const updateMedicalHistory = async (req, res) => {
    const id = req.params

    try {
        const patient = await Patient.findByIdAndUpdate(id, { $set: { medicalHistory: req.body } })

        res.status(201).json(patient);
        console.log(patient);


    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

export const deleteAllVisits = async (req, res) => {
    try {
        const deleteAllPatients = await Patient.deleteMany({});
        const deleteAllVisits = await PatientVisit.deleteMany({});

        res.status(201).json({deleteAllPatients ,deleteAllVisits });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}