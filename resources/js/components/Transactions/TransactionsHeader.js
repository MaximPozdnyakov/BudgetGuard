import React from "react";
import { connect } from "react-redux";
import { setDateRange } from "../../actions/transactions";
import DateRangePicker from "@wojtekmaj/react-daterange-picker";
import PropTypes from "prop-types";

import Filters from "./Filters/Filters";
import TransactionForm from "./TransactionForm/TransactionFormOverlay";

function TransactionsHeader({ dateRange, setDateRange }) {
    return (
        <>
            <div className="d-flex justify-content-around justify-content-sm-between align-items-center my-4">
                <TransactionForm />
                <DateRangePicker
                    clearIcon={null}
                    rangeDivider=""
                    onChange={setDateRange}
                    value={dateRange}
                />
            </div>
            <Filters />
        </>
    );
}

TransactionsHeader.propTypes = {
    dateRange: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
    setDateRange: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    dateRange: state.transactions.filters.dateRange
});

export default connect(mapStateToProps, { setDateRange })(TransactionsHeader);
