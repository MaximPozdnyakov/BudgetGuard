import React, { useState } from "react";
import { OverlayTrigger } from "react-bootstrap";
import { When } from "react-if";

import BtnAddTransaction from "./BtnAddTransaction";
import TransactionFormPopup from "./TransactionFormPopup";

function TransactionFormOverlay() {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const toggleForm = () => setIsFormOpen(isFormOpen => !isFormOpen);

    return (
        <div>
            <When condition={isFormOpen}>
                <div className="dark-overlay" onClick={toggleForm}></div>
            </When>
            <OverlayTrigger
                placement="bottom-start"
                overlay={TransactionFormPopup({ toggleForm })}
                show={isFormOpen}
            >
                <BtnAddTransaction {...{ toggleForm }} />
            </OverlayTrigger>
        </div>
    );
}

export default TransactionFormOverlay;
