import React from "react";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function DefaultHeader() {
    return (
        <Navbar className="border-bottom px-5 mb-5 bg-white">
            <div className="d-flex justify-content-center w-100">
                <Link to="/">
                    <Navbar.Brand className="font-weight-bold text-dark align-content-center">
                        Budget Guard
                    </Navbar.Brand>
                </Link>
            </div>
        </Navbar>
    );
}

export default DefaultHeader;
