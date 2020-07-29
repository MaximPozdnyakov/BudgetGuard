import React from "react";

import { VictoryPie } from "victory";

import moment from "moment";

import _ from "lodash";

import NumberFormat from "react-number-format";

import { connect } from "react-redux";

import { ListGroup, Row, Col } from "react-bootstrap";
import { If, Then, Else } from "react-if";

const colors = {
    Gift: "#18b272",
    Business: "#ffa200",
    Salary: "#60b3b8",
    "Extra Income": "#f964a0"
};

function IncomePie(props) {
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
            transaction.moneySign
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
        const transactionsByCategory = transactionsGroupsByCategory[category];
        data.push({
            x: transactionsByCategory[0].category,
            y: _.sum(
                transactionsByCategory.map(transaction =>
                    Number(transaction.moneyAmount)
                )
            ),
            label: `${transactionsByCategory[0].category} \n ${(
                (_.sum(
                    transactionsByCategory.map(transaction =>
                        Number(transaction.moneyAmount)
                    )
                ) /
                    sum) *
                100
            ).toFixed(1)}%`
        });
        listGroupTransactions.push(
            <ListGroup.Item
                key={transactionsByCategory[0].category}
                className="gray-on-hover border-0 px-0 px-sm-3 px-lg-0 px-xl-3"
            >
                <Row className="w-100 d-flex align-items-center">
                    <Col xs={5} className="pr-0 pl-3  px-sm-2">
                        <div className="h-100 d-flex align-items-center">
                            <div
                                className="rounded-circle mr-2"
                                style={{
                                    background:
                                        colors[
                                            transactionsByCategory[0].category
                                        ],
                                    width: "1.5em",
                                    height: "1.5em"
                                }}
                            ></div>
                            <span>{transactionsByCategory[0].category}</span>
                        </div>
                    </Col>
                    <Col xs={4} className="px-0 px-sm-2">
                        <h6 className="mb-0 ">{`${transactionsByCategory.length} operations`}</h6>
                    </Col>
                    <Col xs={3} className="px-0 px-sm-2">
                        <h6
                            className={`  mb-0 font-weight-bold text-right text-success`}
                        >
                            {"+"}
                            <NumberFormat
                                value={_.sum(
                                    transactionsByCategory.map(transaction =>
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
            <div className="d-flex flex-column px-3 pt-3 pb-0">
                <h5 className="font-weight-bold ">Income for Period</h5>
                <h6 className="font-weight-bold text-secondary">
                    {moment(dateRange[0]).format("LL")} {" - "}
                    {moment(dateRange[1]).format("LL")}
                </h6>
                <If condition={data.length !== 0}>
                    <Then>
                        <VictoryPie
                            data={data}
                            colorScale={Object.keys(
                                transactionsGroupsByCategory
                            ).map(category => colors[category])}
                            height={300}
                            innerRadius={({ datum }) => 50}
                            className="label-font-size"
                            style={{
                                labels: {
                                    fontWeight: 700,
                                    lineHeight: "36px",
                                    fill: "#12C48B"
                                }
                            }}
                        />
                    </Then>
                </If>
            </div>
            <If condition={data.length !== 0}>
                <Then>
                    <ListGroup className="px-0 p-md-3">
                        {listGroupTransactions}
                    </ListGroup>
                </Then>
                <Else>
                    <h5
                        style={{ fontWeight: 700 }}
                        className="d-flex h-75 w-100 justify-content-center align-items-center"
                    >
                        Income for the period not found
                    </h5>
                </Else>
            </If>
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

export default connect(mapStateToProps)(IncomePie);
