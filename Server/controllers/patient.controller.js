import Patient from "../models/patient.models.js" 

export const getTodayPatient = async (req , res) => {
    
    try {
        const start = new Date();
        start.setHours(0, 0, 0, 0); // today 00:00:00

        const end = new Date();
        end.setHours(23, 59, 59, 999); // today 23:59:59.999

        const GetTodayPatients = await Patient.find({
        updatedAt: { $gte: start, $lte: end }
        });

        res.status(201).json(GetTodayPatients);  

    } catch (error) {
        res.status(400).json({ error: error.message });
        console.error('error:' ,  error.message)
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

export const getAllPatient = async (req , res) => {
    try {
        const allPatient = await Patient.find().sort({ createdAt: -1 }); 
        
        res.status(201).json(allPatient);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

export const registerPatient = async (req , res) => {
    try {
        const patient = await Patient.create(req.body)
        
        res.status(201).json(patient);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

export const updatePatientInfo = async (req , res) => {
    const { id } = req.params
    try {
        const updatedPatient = await Patient.findByIdAndUpdate(id , {$set:req.body} , { new: true })
        
        res.status(201).json(updatedPatient);
        
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

export const updateMedicalHistory = async (req , res) => {
    const id = req.params

    try {
        const patient = await Patient.findByIdAndUpdate(id , {$set:{medicalHistory:req.body}})
        
        res.status(201).json(patient);
        console.log(patient);
        

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

export const deleteAllPatient = async (req , res) => {
    try {
        const deleteAllPatients = await Patient.deleteMany({});
        
        res.status(201).json(deleteAllPatients);

        console.log(deleteAllPatient);
        

    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}