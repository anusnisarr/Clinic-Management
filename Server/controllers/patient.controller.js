import Patient from "../models/patient.models.js"
import PatientVisit from "../models/visits.modals.js";

export const getTodayPatient = async (req, res) => {

    try {

        const today = new Date();

        // Start of today
        const startOfDay = new Date(today.setHours(0, 0, 0, 0));

        // End of today
        const endOfDay = new Date(new Date().setHours(23, 59, 59, 999));

        const GetTodayPatients = await Patient.find({
        updatedAt: { $gte: startOfDay, $lte: endOfDay }
        });

        return res.status(200).json(GetTodayPatients);
        

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

export const getAllPatient = async (req, res) => {
    try {
        const allPatient = await Patient.find().sort({ createdAt: -1 });

        res.status(201).json(allPatient);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

export const registerPatient = async (req, res) => {
    const {PatientInfo , visitDetails} = req.body    
    
    try {
        const patient = await Patient.create(PatientInfo)
        const visit = await PatientVisit.create({...visitDetails , patientId: patient._id})

        const patientWithVisit = await visit.populate("patientId")        
                
        res.status(201).json(patientWithVisit);        

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

export const updatePatientInfo = async (req, res) => {
    const { id } = req.params
    const { status , tokenNo } = req.body || {};
    
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(id, { $set: {status , tokenNo} }, { new: true })
        
        if (!updatedPatient) {
            return res.status(404).json({ message: "Patient not found" });
        }
        console.log(updatedPatient);
        
        res.status(201).json(updatedPatient);
        
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

export const deleteAllPatient = async (req, res) => {
    try {
        const deleteAllPatients = await Patient.deleteMany({});

        res.status(201).json(deleteAllPatients);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}