import React from "react";
import { Navbar } from "react-bootstrap";

function Nav() {
    return (
        <Navbar className="border-bottom px-5 mb-5 bg-white">
            <Navbar.Brand className="font-weight-bold text-dark" href="#home">
                Budget App
                <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <a href="#login" className="font-weight-bold text-dark">
                        Maxim Pozdnyakow
                        <svg
                            viewBox="0 0 24 24"
                            width="24"
                            height="24"
                            stroke="currentColor"
                            strokeWidth="2"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="6 9 12 15 18 9"></polyline>
                        </svg>
                    </a>
                </Navbar.Text>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Nav;
