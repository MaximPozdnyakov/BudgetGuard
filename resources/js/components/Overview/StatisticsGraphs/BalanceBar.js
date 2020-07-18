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

import moment from "moment";

function BalanceBar(props) {
    const { transactions, dateRange, categories, moneyRange, search } = props;

    const filteredTransactions = transactions.filter(transaction => {
        const spent_at = new Date(transaction.spent_at);

        let money;
        if (!transaction.moneySign) {
            money = -1 * Number(transaction.moneyAmount);
        } else {
            money = Number(transaction.moneyAmount);
        }

        let description;
        if (transaction.description) {
            description = transaction.description;
        } else {
            description = "";
        }
        return (
            dateRange[1].getTime() - spent_at.getTime() >= 0 &&
            dateRange[0].getTime() - spent_at.getTime() <= 0 &&
            categories.includes(transaction.category) &&
            money >= moneyRange[0] &&
            money <= moneyRange[1] &&
            description.includes(search)
        );
    });

    const data = filteredTransactions.map(t => {
        let balance;
        if (!t.moneySign) {
            balance = -1 * Number(t.moneyAmount);
            return {
                date: moment(t.spent_at).format("LL"),
                Expense: balance
            };
        } else {
            balance = Number(t.moneyAmount);
            return {
                date: moment(t.spent_at).format("LL"),
                Income: balance
            };
        }
    });
    return (
        <>
            <div className="d-flex flex-column ">
                <h5 className="font-weight-bold ">Changes</h5>
                <h6 className="font-weight-bold text-secondary mb-3">
                    {moment(dateRange[0]).format("LL")} {" - "}
                    {moment(dateRange[1]).format("LL")}
                </h6>
                <ResponsiveContainer height={300}>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="Income" fill="#12C48B" barSize={400} />
                        <Bar dataKey="Expense" fill="#E3342F" barSize={400} />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>
    );
}

const mapStateToProps = state => ({
    transactions: state.transactions.transactions,
    dateRange: state.transactions.transactionsFilters.dateRange,
    categories: state.transactions.transactionsFilters.categories,
    moneyRange: state.transactions.transactionsFilters.moneyRange,
    search: state.transactions.transactionsFilters.search
});

export default connect(mapStateToProps)(BalanceBar);
