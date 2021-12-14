import React from "react";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import { selectExpenseForPeriod } from "../../../selectors/selectors";

function ExpenseForPeriod({ totalExpense }) {
    return (
        <div className="d-md-block d-flex justify-content-between align-items-center">
            <h6 className="font-weight-bold mb-0 mb-md-2">
                Total expense for the period
            </h6>
            <div
                className={`balance-text font-weight-bold ${
                    totalExpense !== 0 ? "text-danger" : ""
                }`}
            >
                {totalExpense > 0 && "-"}
                <NumberFormat
                    value={totalExpense}
                    displayType={"text"}
                    thousandSeparator={true}
                />{" "}
                USD
            </div>
        </div>
    );
}

ExpenseForPeriod.propTypes = {
    totalExpense: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
    totalExpense: selectExpenseForPeriod(state)
});

export default connect(mapStateToProps)(ExpenseForPeriod);
