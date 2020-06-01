import React, { Fragment } from 'react';
import man from '../../../assets/images/userLogo.png'
import { Link } from 'react-router-dom';
import { Edit } from 'react-feather';

const UserPanel = () => {
    const url= '';
    var curentUser = JSON.parse(localStorage.getItem('bistq_curentUser')) 

    return (
        <Fragment>
            <div className="sidebar-user text-center">
                <div>
                    <img className="img-60 rounded-circle lazyloaded blur-up" src={url ? url : man} alt="#" />
                    <div className="profile-edit">
                        <Link to="#">
                            <Edit />
                        </Link>
                    </div>
                </div>
                <h6 className="mt-3 f-14">{(curentUser.username || "")} </h6>
                <p>{(curentUser.title ||"")}</p>
            </div>
        </Fragment>
    );
};

export default UserPanel;