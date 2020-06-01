import React, { createContext, useState, useEffect, useRef } from 'react';
// import { SnackbarProvider, useSnackbar } from 'notistack';
// import PopupService from "../services/Popup.service"
export const PopupContext = createContext();

var currentUser = JSON.parse(sessionStorage.getItem("currentUser"))






const PopupProvider = (props) => {

    const [Popupler, setPopupler] = useState([]);
    const esaiRef = useRef([])

    const addPopup = (title, component) => {
        let newPopup = {
            "title": title,
            "component": component
        } 
        setPopupler([...Popupler, newPopup]);
        // alert("tanımlama yapınız");    
    }

    useEffect(() => {


        return () => { }
    }, []);


    return (
        < PopupContext.Provider value={
            {
                Popupler,
                setPopupler,
                addPopup,
            }
        } >
            {props.children}
        </PopupContext.Provider>
    );
};


export default PopupProvider;
