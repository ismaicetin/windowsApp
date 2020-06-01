import React, { useState, useContext, useEffect, Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import Loader from "../components/Loader"
import { Modal, Card, Button } from 'react-bootstrap';
import { Rnd } from 'react-rnd';
import login from '../views/login';

import { PopupContext } from "../context/PopupContext"


var MainComponent={
    "login":login 
}
const Main = () => {
    const PopupContexts = useContext(PopupContext);
    // const [userName, setUserName] = useState("");
    // const [password, setPassword] = useState("");
    // const [loaderShow, setloaderShow] = useState("");
    // const [value, setValue] = useState(
    //     localStorage.getItem('profileURL' || man)
    // );

    useEffect(() => {

    }, []);

    // const loginAuth = async () => {


    // }

   const getComponent=(component)=>{
        const TagName = MainComponent[component]
        return <TagName />
    }




    return (
        <div id="main">
            <div className="container-fluid p-0">
                {/* <!-- login page start--> */}
                <div className="authentication-main">
                    <div className="row">
                        <div className="col-md-12">

                            {JSON.stringify(PopupContexts.Popupler)}

                            {/* <Draggable handle=".modal-header">
                                <ResizableBox axis="both">
                                    <Modal.Dialog className="bg-danger" size="lg">
                                        <Modal.Header closeButton id="header">
                                            <Modal.Title className="h6">Modal title</Modal.Title>
                                        </Modal.Header>

                                        <Modal.Body>
                                            <p>Modal body text goes here.</p>
                                        </Modal.Body>

                                        <Modal.Footer>
                                            <Button variant="secondary">Close</Button>
                                            <Button variant="primary">Save changes</Button>
                                        </Modal.Footer>
                                    </Modal.Dialog>
                                </ResizableBox>
                            </Draggable> */}

                            {PopupContexts.Popupler.map((item) =>
                                <Rnd
                                    default={{ x: 500, y: 205, }}
                                    bounds="window"
                                    dragHandleClassName="header"
                                >
                                    <div className="box" style={{ margin: 0, height: '100%', width: "100%" }}>
                                        <Card border="primary" style={{ margin: 0, height: '100%', width: "100%" }} >
                                            <Card.Header className="header">{item.title}</Card.Header>
                                            <Card.Body>
                                               { getComponent(item.component)}
                                        </Card.Body>
                                        </Card>
                                    </div>

                                </Rnd>
                            )}





                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;