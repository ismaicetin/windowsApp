import React, { Fragment } from 'react';
// import Header from './common/header-component/header';
// import Sidebar from './common/sidebar-component/sidebar';
// import RightSidebar from './common/right-sidebar';
// import Footer from './common/footer';
// import ThemeCustomizer from './common/theme-customizer'
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Loader from './common/loader';

// loderhide
// import { Spinner } from 'reactstrap';
// import { Spinner } from 'react-bootstrap';
import { Spinner } from 'reactstrap';

const Default = ({ children, show = false, button = false }) => {


    {/* <div class="containerSpin">
                                <div class="loaderSpin"></div>
                            </div> */}
    return (
        <Fragment>
            {
                show ?

                    <div style={{ display: "block", width: "auto", textAlign: "center" }}>

                        {button ?

                            <button class="btn btn-primary">
                                <span class="spinner-border spinner-border-sm"></span>
                            </button>
                            :
                            <>
                                <div class="spinner-grow" style={{ width: "3rem", height: "3rem" }} role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="spinner-grow" style={{ width: "3rem", height: "3rem" }} role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                                <div class="spinner-grow" style={{ width: "3rem", height: "3rem" }} role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </>
                        }

                    </div>
                    :
                    children
            }
        </Fragment>
    );
}

export default Default;


