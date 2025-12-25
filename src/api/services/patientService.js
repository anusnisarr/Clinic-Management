import API from "../intercepator";

export const getPatient = async (search ,  page , limit , columnsName ) => {

    const res = await API.get("/patient", { params: { search , page, limit ,  columnsName: columnsName?.join(",")} } );    
    return res.data
    
}

export const getPatientByPhone = async ( phone ) => {

    const res = await API.get(`/patient/search?phone=${phone}`);    
    return res.data
    
}

export const updatedPatientDetails = async ( payload ) => {

    console.log("updatedPatientData" , payload );
    

    const res = await API.patch(`/patient/update/${payload.id}` ,  {patientData : payload.patientData} );
    return res.data
    
}

