import React from "react";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { selectBalance } from "../../../selectors/selectors";

function CurrentBalance({ balance }) {
    return (
        <div className="d-md-block d-flex justify-content-between align-items-center">
            <h6 className="font-weight-bold mb-0 mb-md-2">
                Current wallet balance
            </h6>
            <div
                className={`balance-text font-weight-bold ${
                    balance > 0 ? "text-success" : balance < 0 && "text-danger"
                }`}
            >
                {balance > 0 && "+"}
                <NumberFormat
                    value={balance}
                    displayType={"text"}
                    thousandSeparator={true}
                />{" "}
                USD
            </div>
        </div>
    );
}

CurrentBalance.propTypes = {
    balance: PropTypes.number.isRequired
};

const mapStateToProps = state => ({ balance: selectBalance(state) });

export default connect(mapStateToProps)(CurrentBalance);
