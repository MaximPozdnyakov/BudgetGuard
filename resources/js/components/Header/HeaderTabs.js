import React from "react";
import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function HeaderTabs() {
    return (
        <Nav className="align-content-center mt-2 top-center-links">
            <Nav.Item className="mr-3">
                <NavLink exact to="/operations" activeClassName="link-success">
                    Operations
                </NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink exact to="/overview" activeClassName="link-success">
                    Overview
                </NavLink>
            </Nav.Item>
        </Nav>
    );
}

export default HeaderTabs;
