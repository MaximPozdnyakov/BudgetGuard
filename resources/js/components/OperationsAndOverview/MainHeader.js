import React from "react";

import { connect } from "react-redux";
import { setDateRange } from "../../actions/transactions";

import DateRangePicker from "@wojtekmaj/react-daterange-picker";

import Filters from "../Filters/Filters";
import Balance from "../Balance/Balance";
import AddTransaction from "../Operations/AddTransaction";

function MainHeader(props) {
    const { dateRange, setDateRange } = props;
    return (
        <>
            <div className="d-flex justify-content-around justify-content-sm-between align-items-center my-4">
                <AddTransaction />
                <DateRangePicker
                    clearIcon={null}
                    rangeDivider=""
                    onChange={setDateRange}
                    value={dateRange}
                />
            </div>
            <Filters />
            <Balance />
        </>
    );
}

const mapStateToProps = state => ({
    dateRange: state.transactions.transactionsFilters.dateRange
});

export default connect(mapStateToProps, { setDateRange })(MainHeader);
