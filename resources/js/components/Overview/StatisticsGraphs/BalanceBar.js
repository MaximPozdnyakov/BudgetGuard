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
    const {
        transactions,
        dateRange,
        categories,
        moneyRange,
        search,
        selectedWallet
    } = props;

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
            description.includes(search) &&
            transaction.wallet === selectedWallet.id
        );
    });

    const data = _.range(
        Math.floor(
            (dateRange[1].getTime() - dateRange[0].getTime()) /
                (60 * 60 * 24 * 1000)
        ) + 1
    ).map(day => {
        const currentDate = moment(
            new Date(
                dateRange[0].getFullYear(),
                dateRange[0].getMonth(),
                dateRange[0].getDate() + day
            )
        ).format("L");

        const currentTransaction = filteredTransactions.find(
            t => moment(t.spent_at).format("L") == currentDate
        );

        if (!currentTransaction) {
            return {
                date: moment(currentDate).format("LL"),
                Income: 0,
                Expense: 0
            };
        } else {
            const [currentIncome, currentExpense] = _.partition(
                _.partition(
                    filteredTransactions,
                    t => moment(t.spent_at).format("L") === currentDate
                )[0],
                "moneySign"
            );

            return {
                date: moment(currentDate).format("LL"),
                Income: currentIncome.reduce(
                    (s, t) => s + Number(t.moneyAmount),
                    0
                ),
                Expense: currentExpense.reduce(
                    (s, t) => s + Number(t.moneyAmount),
                    0
                )
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
                        <Bar dataKey="Income" fill="#12C48B" />
                        <Bar dataKey="Expense" fill="#E3342F" />
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
    search: state.transactions.transactionsFilters.search,
    selectedWallet: state.wallets.currentWallet
});

export default connect(mapStateToProps)(BalanceBar);
