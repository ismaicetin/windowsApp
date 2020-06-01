import axios from 'axios'
import { http, API_URL } from './axios'

async function list() {
    // return {
    //     "status": 200,
    //     "msg": "",
    //     "data": [
    //         {
    //             "id": 5,
    //             "securityName": "IHLAS",
    //             "orderBookId": 100032,
    //             "priceDecimalFactor": 3,
    //             "sendBeforeMarketOpen": true
    //         },
    //         {
    //             "id": 6,
    //             "securityName": "IHLAS",
    //             "orderBookId": 100032,
    //             "priceDecimalFactor": 6,
    //             "sendBeforeMarketOpen": true
    //         }
    //     ]
    // } 

   
    return http.get("/securities/")
}

async function create(data) {
    //     "amount": 500,
    //     "exchangeInfo": "26636",
    //          “securityName": "ALBRK.E”,
    //     "price": 1000,
    //     "side": "B"

    // return {
    //     "status": 200,
    //     "msg": "",
    //     "data":    {
    //         "id": 7,
    //         "securityName": "IHLAS 7",
    //         "orderBookId": 100032,
    //         "priceDecimalFactor": 6,
    //         "sendBeforeMarketOpen": true
    //     }
    // }


    return http.post("/securities", data)
}
async function update(data) {
    //     “id”: 4,
    //     "amount": 500,
    //     "exchangeInfo": "26636",
    //      “securityName”: ”ALBRK.E”,
    //     "price": 1000,
    //     "side": "S", 

    // return {
    //     "status": 200,
    //     "msg": "",
    //     "data": null
    // }
    return http.put("/securities", data)
}
async function remove(id) {


    // return {
    //     "status": 200,
    //     "msg": "",
    //     "data": null
    // }
    return http.delete(`/securities/${id}`)
}


export default { 
    list,
    create,
    update,
    remove 
}; 
