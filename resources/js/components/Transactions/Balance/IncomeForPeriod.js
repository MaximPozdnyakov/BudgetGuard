import React from "react";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { selectIncomeForPeriod } from "../../../selectors/selectors";

function IncomeForPeriod({ totalIncome }) {
    return (
        <div className="d-md-block d-flex justify-content-between align-items-center">
            <h6 className="font-weight-bold mb-0 mb-md-2">
                Total income for the period
            </h6>
            <div
                className={`balance-text font-weight-bold ${
                    totalIncome > 0 ? "text-success" : ""
                }`}
            >
                {totalIncome > 0 && "+"}
                <NumberFormat
                    value={totalIncome}
                    displayType={"text"}
                    thousandSeparator={true}
                />{" "}
                USD
            </div>
        </div>
    );
}

IncomeForPeriod.propTypes = {
    totalIncome: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
    totalIncome: selectIncomeForPeriod(state)
});

export default connect(mapStateToProps)(IncomeForPeriod);
