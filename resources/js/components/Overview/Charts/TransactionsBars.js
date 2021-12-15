import React from "react";
import {
    BarChart,
    Bar,
    Tooltip,
    YAxis,
    XAxis,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";
import { connect } from "react-redux";
import { format } from "date-fns";
import PropTypes from "prop-types";

import { selectBarsData } from "../../../selectors/selectors";

function TransactionsBars({ dateRange, barsData }) {
    const dateStart = new Date(dateRange[0]);
    const dateEnd = new Date(dateRange[1]);
    return (
        <div className="d-flex flex-column ">
            <h5 className="font-weight-bold ">Changes</h5>
            <h6 className="font-weight-bold text-secondary mb-3">
                {format(dateStart, "MMMM dd, Y")}
                {" - "}
                {format(dateEnd, "MMMM dd, Y")}
            </h6>
            <ResponsiveContainer height={300}>
                <BarChart data={barsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="Income" fill="#12C48B" />
                    <Bar dataKey="Expense" fill="#E3342F" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

TransactionsBars.propTypes = {
    dateRange: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
    barsData: PropTypes.arrayOf(
        PropTypes.exact({
            date: PropTypes.string,
            Income: PropTypes.number,
            Expense: PropTypes.number
        })
    ).isRequired
};

const mapStateToProps = state => ({
    dateRange: state.transactions.filters.dateRange,
    barsData: selectBarsData(state)
});

export default connect(mapStateToProps)(TransactionsBars);
