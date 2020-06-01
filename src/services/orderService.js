import { http } from './axios'

async function getOrderList(array) {
    // return {
    //     "status": 200,
    //     "msg": "",
    //     "data": [
    //         // {

    //         //     "amount": "",
    //         //     "exchangeInfo": "", //account  
    //         //     "securityName": "",
    //         //     "price": "",
    //         //     "side": "" 
    //         // },
    //         {
    //             "id": 2,
    //             "amount": 500,
    //             "exchangeInfo": "26636", //account 
    //             "orderBookId": 100000,
    //             "securityName": "ALBRK.E2",
    //             "price": 100000,
    //             "side": "S",
    //             "priceDecimalFactor": 3,
    //             "transmitDate": "2020-04-17"
    //         },
    //         {
    //             "id": 3,
    //             "amount": 500,
    //             "exchangeInfo": "26636",
    //             "orderBookId": 100001,
    //             "securityName": "IHLAS.E3",
    //             "price": 1000,
    //             "side": "B",
    //             "priceDecimalFactor": 3,
    //             "transmitDate": "2020-04-18"
    //         }
    //     ]
    // }
    var a, b, list = []

    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        try {
            a = await http.get(`/orders/findui/partition/1?date=${element}`)
            b = await http.get(`/orders/findui/partition/2?date=${element}`)

            list = [...list, ...a.data, ...b.data]
        } catch (error) {
            console.log(error)
        }

    }


    return {
        "status": 200,
        "msg": "",
        "data": list
    }

}

async function create(data) {
    //     "amount": 500,
    //     "exchangeInfo": "26636",
    //          “securityName": ”ALBRK.E”,
    //     "price": 1000,
    //     "side": "B"
    // var d = new Date()
    // return {
    //     "status": 200,
    //     "msg": "",
    //     "data": {
    //         "id": d.getTime(),
    //         ...data
    //     }
    // }
    data.amount = parseFloat(data.amount)
    data.price = parseFloat(data.price)


    return http.post("/orders/add", data)

 
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
    data.amount = parseFloat(data.amount)
    data.price = parseFloat(data.price)
    return http.put("/orders/update", data)
}
async function remove(id) {


    // return {
    //     "status": 200,
    //     "msg": "",
    //     "data": null
    // }
    return http.delete(`/orders/delete/order/${id}`)
}



async function getOrderHistory(filterDate) {


    // return {
    //     "status": 200,
    //     "msg": "",
    //     "data": [
    //         {

    //             "amount": 500,
    //             "transmitDate": "2020-04-20",
    //             "exchangeInfo": "26636",
    //             "orderBookId": 100002,
    //             "price": 1000,
    //             "side": "S",
    //             "exchangeTimestamp": 1587023341256,
    //             "status": "ACCEPTED"


    //         }
    //     ]
    // }
    return http.get(`history/?fromDate=${filterDate.fromDate}&toDate=${filterDate.toDate}`)
}




export default {
    getOrderList,
    create,
    update,
    remove,
    getOrderHistory
}; 
