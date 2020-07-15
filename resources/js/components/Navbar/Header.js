import React from "react";
import { Navbar, Nav, } from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

function Header() {
    return (
        <Navbar className="border-bottom px-5 mb-5 bg-white">
            <div className="d-flex justify-content-between w-100">
                <Navbar.Brand className="font-weight-bold text-dark align-content-center" href="#home">
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
                <Nav>
                    <Nav.Item>
                        <Nav.Link>
                            <NavLink exact to="/" activeClassName="link-success">
                                Operations
                            </NavLink>
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link>
                            <NavLink exact to="overview" activeClassName="link-success">
                                Overview
                            </NavLink>
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <Navbar.Text className="align-content-center">
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
            </div>
        </Navbar>
    );
}

export default Header;
