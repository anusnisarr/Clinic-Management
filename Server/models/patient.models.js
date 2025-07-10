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
        
}, { timestamps: true })

const patientSchema = mongoose.Schema({

    tokenNo: {type: String},
    firstName : {type: String},
    lastName  : {type: String},
    phone  : {type: String},
    email  : {type: String},
    address  : {type: String},
    age  : {type: Number},
    gender  : {type: String},
    emergencyContact : {type: String},
    emergencyPhone : {type: String},
    appointmentType : {type: String},
    priority : {type: String},
    registrationTime : {type: String},
    registrationDate : {type: Date},
    status : {type: String},
    medicalHistory : [medicalHistorySchema]

}, { timestamps: true } )

const Patient = mongoose.model("Patient" , patientSchema)

export default Patient;