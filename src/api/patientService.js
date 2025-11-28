import axios from "axios";
const env = import.meta.env

const API = axios.create({ baseURL: `${env.VITE_BASE_PATH}/patient`});

export const getPatient = async (search ,  page , limit , columnsName ) => {

  try {

    const res = await API.get("/", { params: { search , page, limit ,  columnsName: columnsName?.join(",")} } );    
    return res.data

  } catch (error) {
    throw error; 
  }

}
