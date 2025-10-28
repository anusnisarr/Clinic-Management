import mongoose from "mongoose";

const medicalHistorySchema = mongoose.Schema({
        
        diagnosis: {type: String},
        symptoms: {type: String},
        medicines: [
            {
                name: {type: String},
                dosage: {type: String},
                frequency: {type: String},
                duration: {type: String},
            }
        ],
        notes: {type: String},
        attachments: [{type: String}]
        
})

const patientVisitSchema = mongoose.Schema({
    patientId : {type: mongoose.Schema.Types.ObjectId, ref: "Patient"},
    appointmentType : {type: String},
    tokenNo: {type: String},
    priority : {type: String},
    registrationTime : {type: String},
    registrationDate : {type: Date},
    status : {type: String},
    medicalHistory : [medicalHistorySchema]
        
}, { timestamps: true })

const PatientVisit = mongoose.model("PatientVisit" , patientVisitSchema)

export default PatientVisit;
