import React from "react";
import {
    LineChart,
    Line,
    Tooltip,
    YAxis,
    XAxis,
    CartesianGrid,
    ResponsiveContainer
} from "recharts";
import { connect } from "react-redux";
import { format } from "date-fns";
import PropTypes from "prop-types";

import { selectBalanceByDays } from "../../../selectors/selectors";

function BalanceLine({ dateRange, balanceData }) {
    const dateStart = new Date(dateRange[0]);
    const dateEnd = new Date(dateRange[1]);
    return (
        <div className="d-flex flex-column ">
            <h5 className="font-weight-bold ">Account balance</h5>
            <h6 className="font-weight-bold text-secondary mb-3">
                {format(dateStart, "MMMM dd, Y")}
                {" - "}
                {format(dateEnd, "MMMM dd, Y")}
            </h6>
            <ResponsiveContainer height={300}>
                <LineChart data={balanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                        type="monotone"
                        dataKey="Balance"
                        stroke="#12C48B"
                        strokeWidth={2}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}

BalanceLine.propTypes = {
    dateRange: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
    balanceData: PropTypes.arrayOf(
        PropTypes.exact({
            date: PropTypes.string,
            Balance: PropTypes.number
        })
    ).isRequired
};

const mapStateToProps = state => ({
    dateRange: state.transactions.filters.dateRange,
    balanceData: selectBalanceByDays(state)
});

export default connect(mapStateToProps)(BalanceLine);
