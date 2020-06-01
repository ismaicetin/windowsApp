import axios from 'axios'
import { http, API_URL } from './axios'

async function login(sendData) {
    return {
        "status": 200,
        "msg": "",
        "data": { 
            "username": "ismal  çetin",
            "title ": "Muhendis",
            "token": "100002", 
        }
    }
    return http.post(API_URL + "/auth/signin", sendData)
    }


    export default {
        login,
    }; 
