import React, { useState, useContext , Fragment } from 'react'; 
// import logo from '../../../assets/images/endless-logo.png';
// import Language from './language';
// import UserMenu from './userMenu';
// import Notification from './notification';
// import SearchHeader from './searchHeader';
// import ConnectionState from './connectionState';
import { Navbar, NavDropdown, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { AlignLeft, Maximize, Bell, MessageCircle, MoreHorizontal } from 'react-feather';
 
import {PopupContext} from "../../../context/PopupContext"

const Header = () => {
    const PopupContexts = useContext(PopupContext);

    // const [sidebar, setSidebar] = useState(false);
    // const [rightSidebar, setRightSidebar] = useState(true);
    // const [headerbar, setHeaderbar] = useState(true);


    function addPopup(title,component) {
        PopupContexts.addPopup(title,component);
    }

    //full screen function
    function goFull() {
        if ((document.fullScreenElement && document.fullScreenElement !== null) ||
            (!document.mozFullScreen && !document.webkitIsFullScreen)) {
            if (document.documentElement.requestFullScreen) {
                document.documentElement.requestFullScreen();
            } else if (document.documentElement.mozRequestFullScreen) {
                document.documentElement.mozRequestFullScreen();
            } else if (document.documentElement.webkitRequestFullScreen) {
                document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            }
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            }
        }
    }

    return (
        <Fragment>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
                <Navbar.Brand href="#home">
                    {/* <img src={logo} /> */}
  ESAİ

  </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link   onClick={(e)=>addPopup("Features","login")}>Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                        <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Nav id="right-header-menu" >

                        <NavDropdown title="Setting" >
                            {/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider /> */}
                            <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
                        </NavDropdown>
                        {/* <Nav.Link href="#deets">More deets</Nav.Link>
                        <Nav.Link eventKey={2} href="#memes">
                            Logout
            </Nav.Link> */}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Fragment>
    )
};
export default Header;