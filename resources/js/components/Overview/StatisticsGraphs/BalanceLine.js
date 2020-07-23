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

import moment from "moment";

function BalanceLine(props) {
    const {
        transactions,
        dateRange,
        categories,
        moneyRange,
        search,
        initialBalance
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
            description.includes(search)
        );
    });

    // let currentBalance =
    //     transactions
    //         .filter(transaction => {
    //             const spent_at = new Date(transaction.spent_at);
    //             spent_at.getTime() <= dateRange[0].getTime();
    //         })
    //         .reduce((sum, t) => {
    //             let money;
    //             if (!t.moneySign) {
    //                 money = -1 * Number(t.moneyAmount);
    //             } else {
    //                 money = Number(t.moneyAmount);
    //             }
    //             return sum + money;
    //         }, 0) + Number(initialBalance);
    // console.log(
    //     "currentBalance",
    //     transactions.filter(transaction => {
    //         const spent_at = new Date(transaction.spent_at);
    //         console.log("spent_at.getTime()", spent_at);
    //         console.log("dateRange[0].getTime()", dateRange[0]);

    //         spent_at.getTime() <= dateRange[0].getTime() - 60 * 60 * 24;
    //     })
    // );

    let data = filteredTransactions.map(t => {
        let balance;
        if (!t.moneySign) {
            balance = -1 * Number(t.moneyAmount);
        } else {
            balance = Number(t.moneyAmount);
        }
        return {
            date: moment(t.spent_at).format("LL"),
            Balance: balance
        };
    });

    const dataByDate = _.groupBy(data, "date");

    let dataBalance = [];
    for (let date in dataByDate) {
        dataBalance.push({
            date,
            Balance: dataByDate[date].reduce((sum, b) => b.Balance + sum, 0)
        });
    }
    dataBalance = dataBalance.map((transaction, i) => ({
        ...transaction,
        Balance:
            transaction.Balance +
            Number(
                dataBalance.slice(0, i).reduce((sum, b) => b.Balance + sum, 0)
            ) +
            Number(initialBalance)
    }));
    // _.range(dateRange[0].getDay(), dateRange[1].getDay() + 1).map();
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
    initialBalance: state.wallets.currentWallet.initialBalance
});

export default connect(mapStateToProps)(BalanceLine);
