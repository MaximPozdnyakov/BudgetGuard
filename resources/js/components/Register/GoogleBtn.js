import React from "react";
import { Button } from "react-bootstrap";

import GoogleLogo from "../Icons/GoogleLogo";

function GoogleBtn() {
    const registerWithGoogle = e => {
        e.preventDefault();
        window.location.href = `${window.location.origin}/api/redirect/google`;
    };
    return (
        <div className="d-flex justify-content-center nowrap">
            <Button
                variant="light"
                block
                className="d-flex position-relative justify-content-center"
                onClick={registerWithGoogle}
            >
                <div className="icon-left">
                    <GoogleLogo />
                </div>
                <div>Register with Google</div>
            </Button>
        </div>
    );
}

export default GoogleBtn;
