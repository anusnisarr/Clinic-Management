import axios from "axios";
const env = import.meta.env

const API = axios.create({ baseURL: `${env.VITE_BASE_PATH}/visit`});

export const getVisits = async ( page , limit , columnsName ) => {

  try {

    const res = await API.get("/", { params: { page, limit , columnsName: columnsName?.join(",")} } );    
    return res.data

  } catch (error) {
    console.error("API Error:", error);
    throw error; 
  }

}
