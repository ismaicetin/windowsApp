import { http } from './axios'
 
async function connState(data) { 


    // return {
    //     message:"",
    //     status:200,
    //     data:[
    //         {ouchConnected:1, part:1},
    //         {ouchConnected:1, part:2}
    //     ]
    // }
//    return {"status":200,"message":"","data":[{"part":0,"ouchConnected":0},{"part":1,"ouchConnected":1}]}
    return http.get("connstate") 
} 



export default {
    connState 
}; 
