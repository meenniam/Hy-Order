import axios from 'axios';


export default function setAuthorizationToken(token){
  //console.log(token);
  if(!token){
    /*return axios({
      //method: 'get,post',
      baseURL: "http://localhost:8080/api/login",
      headers: { 'Authorization': `Bearer ${token}` }
    })*/
    //console.log("niameen");

    //delete axios.defaults.headers.common['Authorization'];
    delete axios.defaults.headers.common.Authorization

  }
  else {
    //console.log(token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
}
