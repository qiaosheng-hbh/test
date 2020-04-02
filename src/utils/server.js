import axios from 'axios'

export const gerAll= () =>{
  return axios.get("/getAll");
}
