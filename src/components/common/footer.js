import React from "react";

const Footer = props => {
    var d=new Date()
    return (
    <footer className="footer">
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-12 footer-copyright">
                    <p className="mb-0">Copyright {d.getFullYear()} © Quotise All rights reserved.</p>
                </div>
                {/* <div className="col-md-6">
                    <p className="pull-right mb-0">Hand crafted & made with
                        <i className="fa fa-heart"></i>
                    </p>
                </div> */}
            </div>
        </div>
</footer>
)};

export default Footer;