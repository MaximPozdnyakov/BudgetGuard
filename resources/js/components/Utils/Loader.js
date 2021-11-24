import React from "react";

import { Spinner } from "react-bootstrap";

function Loader() {
    return (
        <div className="d-flex spinner-wrapper justify-content-center align-content-center">
            <Spinner animation="border" variant="primary" />
        </div>
    );
}

export default Loader;
