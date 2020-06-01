
import axios from 'axios'
// import { ToastContainer, toast } from 'react-toastify';
// export const API_URL = process.env.REACT_APP_BASE_URL
import { logout} from '../components/common/header-component/userMenu';

var API_URL_Dom = document.getElementById("iso").innerText
export const API_URL = API_URL_Dom || "http://195.214.133.229:3000"


function parseError(messages) {
    // error
    if (messages) {
        // toast.error(messages)
        if (messages instanceof Array) {
            return Promise.reject({ messages: messages })
        } else {
            return Promise.reject({ messages: [messages] })
        }
    } else {
        return Promise.reject({ messages: ['Bir hata oluştu'] })
    }
}

function parseBody(response) {
    //  if (response.status === 200 && response.data.status.code === 200) { // - if use custom status code

    if (response.status === 200) {
        if (response.data.status === 401) {
            logout();
        }
        return response.data
    } else {
        console.error(response.data)
        return parseError(response.data.messages)
    }
}


let instance = axios.create({
    baseURL: API_URL
})


async function refleshToken(config) {

    var token = localStorage.getItem('bistq_token')
    if (token) {
        // var a = await axios.post(`${API_URL}/refresh/`, { 'refresh': token });
        // config.headers.jiwstmail = a.data.access;
        config.headers.Authorization = 'Bearer ' + token

        // localStorage.setItem("newToken", a.data.access)

    }
    return config
}







// request header
instance.interceptors.request.use((config) => {

    return refleshToken(config);
    //     // Do something before request is sent 

    //     // api token
    //     // const apiToken = sessionStorage.getItem('token')
    //     // config.headers = { 'Custom-Header-IF-Exist': apiToken }
    //     const h_token =  localStorage.getItem('h_token');
    //    // alert(apiToken.token)  
    //     config['Content-Type'] = 'application/json'
    //     if(h_token){ config["headers"] = { 'Authorization': h_token }}  
    //     return config
}, error => {
    return Promise.reject(error)
})





// response parse
instance.interceptors.response.use((response) => {
    console.log(response.config.url + "  =>  ");
    console.log(response.data);
    return parseBody(response)
}, error => {
    console.warn('Error status', error)
    // return Promise.reject(error)
    if (error.response) {
        return parseError(error.response.data)
    } else {
        console.error(error)
        // toast.error(error)
        return Promise.reject(error)
    }
})






export const http = instance