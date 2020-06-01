import React, { Fragment, useState, useEffect } from 'react';
import connectionService from "../../../services/connectionService"
// import { ShoppingBag, Download, AlertCircle } from 'react-feather';

const Default = props => {
    const [connectionState, setconnectionState] = useState({})
    // const [connectionState2, setconnectionState2] = useState(0)

    const fetchData = () => {
        connectionService.connState().then(response => {
            if (response.status == 200) {
                var data = response.data
                var temp = {}
                data.map(item => {
                    temp["ouchConnected" + item.part] = item.ouchConnected 
                    return item
                }) 
                setconnectionState(temp)

            }
        })


    }
    useEffect(() => {
        fetchData()
        const interval = setInterval(() => {
            fetchData()
        }, 5000);
        return () => clearInterval(interval);
    }, [])



    return (
        <Fragment>
            <div>
            {/* {JSON.stringify(connectionState)} */}
                {/* <div class="btn-group btn-group-toggle" > */}
                    {connectionState.ouchConnected1==1 ?
                        <button type="button" class="btn btn-success">ExchConn1 </button>
                        :
                        <button type="button" class="btn btn-danger">ExchConn1 </button>
                    }
                    {connectionState.ouchConnected2==1 ?
                        <button type="button" class="btn btn-success ml-1">ExchConn2  </button>
                        :
                        <button type="button" class="btn btn-danger ml-1">ExchConn2  </button>
                    }
                </div>
            {/* </div> */}
        </Fragment>
    );
};

export default Default;