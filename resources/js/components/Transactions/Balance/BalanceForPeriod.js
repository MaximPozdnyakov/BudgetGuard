import React from "react";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { selectBalanceForPeriod } from "../../../selectors/selectors";

function BalanceForPeriod({ balance }) {
    return (
        <div className="d-md-block d-flex justify-content-between align-items-center">
            <h6 className="font-weight-bold mb-0 mb-md-2">
                Total change over the period
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

BalanceForPeriod.propTypes = {
    balance: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
    balance: selectBalanceForPeriod(state)
});

export default connect(mapStateToProps)(BalanceForPeriod);
