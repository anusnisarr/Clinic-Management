import API from "../intercepator";

export const getVisits = async (search , page , limit , columnsName ) => {

    const res = await API.get("/visit", { params: { search , page , limit , columnsName: columnsName?.join(",")} } );    
    return res.data
 
}

export const getTodayVisits = async () => {

    const res = await API.get("/visit/todayVisits");    
    return res.data
 
}

export const createNewVisitAndPatient = async (payload) => {

    const res = await API.post("/visit/registerPatientAndVisit" , payload );    
    return res.data
 
}

export const createVisit = async (payload) => {

    const res = await API.post("/visit/newVisit" , payload );    
    return res.data
 
}