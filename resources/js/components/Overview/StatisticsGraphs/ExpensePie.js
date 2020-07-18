import React from "react";

import { VictoryPie } from "victory";

import moment from "moment";

import _ from "lodash";

import NumberFormat from "react-number-format";

import { connect } from "react-redux";

import { ListGroup, Row, Col } from "react-bootstrap";

const colors = {
    Car: "#45A7E6",
    Travel: "#F964A0",
    "Food & Drink": "#FFA801",
    "Family & Personal": "#5EC4AC",
    "Bills & Fees": "#B6985C",
    Entertainment: "#E36AEF",
    Home: "#E1697A",
    Shopping: "#1BB374",
    Healthcare: "#7944D0"
};

function ExpensePie(props) {
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
            description.includes(search) &&
            !transaction.moneySign
        );
    });

    const sum = _.sum(filteredTransactions.map(t => t.moneyAmount));

    const transactionsGroupsByCategory = _.groupBy(
        filteredTransactions,
        "category"
    );

    let data = [];
    let listGroupTransactions = [];

    for (let category in transactionsGroupsByCategory) {
        const transactions = transactionsGroupsByCategory[category];
        data.push({
            x: transactions[0].category,
            y: _.sum(
                transactions.map(transaction => Number(transaction.moneyAmount))
            ),
            label: `${transactions[0].category} \n ${(
                (_.sum(
                    transactions.map(transaction =>
                        Number(transaction.moneyAmount)
                    )
                ) /
                    sum) *
                100
            ).toFixed(1)}%`
        });
        listGroupTransactions.push(
            <ListGroup.Item
                key={transactions[0].category}
                className="gray-on-hover border-0"
            >
                <Row className="w-100 d-flex align-items-center">
                    <Col xs={5}>
                        <div className="h-100 d-flex align-items-center">
                            <div
                                className="rounded-circle mr-2"
                                style={{
                                    background:
                                        colors[transactions[0].category],
                                    width: "1.5em",
                                    height: "1.5em"
                                }}
                            ></div>
                            <span>{transactions[0].category}</span>
                        </div>
                    </Col>
                    <Col xs={3}>
                        <h6>{`${transactions.length} operations`}</h6>
                    </Col>
                    <Col xs={4}>
                        <h6
                            className={`font-weight-bold text-right text-danger`}
                        >
                            {"-"}
                            <NumberFormat
                                value={_.sum(
                                    transactions.map(transaction =>
                                        Number(transaction.moneyAmount)
                                    )
                                )}
                                displayType={"text"}
                                thousandSeparator={true}
                            />
                            {" USD"}
                        </h6>
                    </Col>
                </Row>
            </ListGroup.Item>
        );
    }

    return (
        <>
            <div className="d-flex flex-column p-3">
                <h5 className="font-weight-bold ">Expense for Period</h5>
                <h6 className="font-weight-bold text-secondary">
                    {moment(dateRange[0]).format("LL")} {" - "}
                    {moment(dateRange[1]).format("LL")}
                </h6>
                <VictoryPie
                    data={data}
                    colorScale={Object.keys(transactionsGroupsByCategory).map(
                        category => colors[category]
                    )}
                    height={300}
                    innerRadius={({ datum }) => 50}
                    style={{
                        labels: {
                            fontSize: "12px",
                            fontWeight: 700,
                            lineHeight: "36px",
                            fill: "#E3342F"
                        }
                    }}
                />
            </div>
            <ListGroup className="p-3">{listGroupTransactions}</ListGroup>
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

export default connect(mapStateToProps)(ExpensePie);
