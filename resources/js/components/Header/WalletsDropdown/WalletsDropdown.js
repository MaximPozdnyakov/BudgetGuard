import React from "react";
import { Dropdown } from "react-bootstrap";

import SelectedWallet from "./SelectedWallet";
import UserOptions from "./UserOptions";
import WalletsOptions from "./WalletsOptions";

function WalletsDropdown() {
    return (
        <Dropdown className="align-content-center" navbar={true}>
            <SelectedWallet />
            <WalletsOptions />
            <Dropdown.Divider className="d-flex d-sm-none" />
            <UserOptions />
        </Dropdown>
    );
}

export default WalletsDropdown;
