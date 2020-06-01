import React, { Fragment, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

// ** Import custom components for redux**
import { Provider } from 'react-redux';
// import App from "./components/app";
// LOGİN PAGE
import Header from './components/common/header-component/header';
import login from './views/login';
import Main from './views/Main';
import PopupContext from "./context/PopupContext"
// import OrderList from './views/Order/OrderList';  
// import OrderHisory from './views/Order/OrderHisory';  
// import SecuritiesList from './views/Securities/SecuritiesList';  
import "./services/command"
import "./assets/react-resizable.css";
function Root() {
    useEffect(() => {
        const layout = localStorage.getItem('layout_version')
        document.body.classList.add(layout);
    }, []);


    return (
        <div className="App"> 
            <BrowserRouter basename={'/'}>
                <Switch>
                    <Fragment>
                        {localStorage.bistq_curentUser == undefined ?
                            <Route exact component={login} />
                            :
                            <> 
                                <PopupContext>
                                    <Header />
                                    <Main />
                                </PopupContext>
                            </> 
                        }
                    </Fragment>
                </Switch>
            </BrowserRouter>
        </div>
    );
}

ReactDOM.render(<Root />, document.getElementById('root'));

serviceWorker.unregister();