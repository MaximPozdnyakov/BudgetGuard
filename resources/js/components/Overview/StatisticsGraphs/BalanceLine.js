import React, { useContext } from "react";

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

import moment from "moment";

function BalanceLine(props) {
    const { transactions, dateRange, selectedWallet, defaultBalance } = props;

    const filteredTransactions = transactions.filter(transaction => {
        const spent_at = new Date(transaction.spent_at);
        return (
            dateRange[1].getTime() - spent_at.getTime() >= 0 &&
            dateRange[0].getTime() - spent_at.getTime() <= 0 &&
            transaction.wallet === selectedWallet.id
        );
    });

    const beforeTransactions = transactions.filter(transaction => {
        const spent_at = new Date(transaction.spent_at);
        return (
            dateRange[0].getTime() - spent_at.getTime() >= 0 &&
            transaction.wallet === selectedWallet.id
        );
    });

    let currentBalance =
        beforeTransactions.reduce((balance, transaction) => {
            let money;
            if (!transaction.moneySign) {
                money = -1 * Number(transaction.moneyAmount);
            } else {
                money = Number(transaction.moneyAmount);
            }
            return balance + money;
        }, 0) + Number(defaultBalance);

    const dataBalance = _.range(
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
                Balance: currentBalance
            };
        } else {
            currentBalance += _.partition(
                filteredTransactions,
                t => moment(t.spent_at).format("L") === currentDate
            )[0].reduce((balance, transaction) => {
                let money;
                if (!transaction.moneySign) {
                    money = -1 * Number(transaction.moneyAmount);
                } else {
                    money = Number(transaction.moneyAmount);
                }
                return balance + money;
            }, 0);

            return {
                date: moment(currentDate).format("LL"),
                Balance: currentBalance
            };
        }
    });
    return (
        <>
            <div className="d-flex flex-column ">
                <h5 className="font-weight-bold ">Account balance</h5>
                <h6 className="font-weight-bold text-secondary mb-3">
                    {moment(dateRange[0]).format("LL")} {" - "}
                    {moment(dateRange[1]).format("LL")}
                </h6>
                <ResponsiveContainer height={300}>
                    <LineChart data={dataBalance}>
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
        </>
    );
}

const mapStateToProps = state => ({
    transactions: state.transactions.transactions,
    dateRange: state.transactions.transactionsFilters.dateRange,
    categories: state.transactions.transactionsFilters.categories,
    moneyRange: state.transactions.transactionsFilters.moneyRange,
    search: state.transactions.transactionsFilters.search,
    defaultBalance: state.wallets.currentWallet.initialBalance,
    selectedWallet: state.wallets.currentWallet
});

export default connect(mapStateToProps)(BalanceLine);
