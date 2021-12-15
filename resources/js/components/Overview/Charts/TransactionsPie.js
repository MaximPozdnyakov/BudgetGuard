import React from "react";
import { VictoryPie } from "victory";
import { format } from "date-fns";
import _ from "lodash";
import NumberFormat from "react-number-format";
import { connect } from "react-redux";
import { ListGroup, Row, Col } from "react-bootstrap";
import { If, Then, Else, When } from "react-if";
import PropTypes from "prop-types";

import { colors } from "../../../constants/transactions";
import {
    selectIncomePieData,
    selectExpensePieData
} from "../../../selectors/selectors";

function TransactionsPie({ dateRange, pieData, isIncome }) {
    const dateStart = new Date(dateRange[0]);
    const dateEnd = new Date(dateRange[1]);

    const listItems = pieData.map(({ x: category, y: total, count }) => (
        <ListGroup.Item
            key={category}
            className="gray-on-hover border-0 px-0 px-sm-3 px-lg-0 px-xl-3"
        >
            <Row className="w-100 d-flex align-items-center">
                <Col xs={5} className="pr-0 pl-3  px-sm-2">
                    <div className="h-100 d-flex align-items-center">
                        <div
                            className="rounded-circle mr-2 size-15"
                            style={{ background: colors[category] }}
                        ></div>
                        <span>{category}</span>
                    </div>
                </Col>
                <Col xs={4} className="px-0 px-sm-2">
                    <h6 className="mb-0 ">{count} operations</h6>
                </Col>
                <Col xs={3} className="px-0 px-sm-2">
                    <h6
                        className={`mb-0 font-weight-bold text-right ${
                            isIncome ? "text-success" : "text-danger"
                        }`}
                    >
                        {isIncome ? "+" : "-"}
                        <NumberFormat
                            value={total}
                            displayType={"text"}
                            thousandSeparator={true}
                        />{" "}
                        USD
                    </h6>
                </Col>
            </Row>
        </ListGroup.Item>
    ));
    return (
        <>
            <div className="d-flex flex-column px-3 pt-3 pb-0 flex-grow-1">
                <h5 className="font-weight-bold ">
                    {isIncome ? "Income" : "Expense"} for Period
                </h5>
                <h6 className="font-weight-bold text-secondary">
                    {format(dateStart, "MMMM dd, Y")}
                    {" - "}
                    {format(dateEnd, "MMMM dd, Y")}
                </h6>
                <If condition={!!pieData.length}>
                    <Then>
                        <VictoryPie
                            data={pieData}
                            colorScale={pieData.map(
                                ({ x: category }) => colors[category]
                            )}
                            height={300}
                            innerRadius={50}
                            className="label-font-size"
                            style={{
                                labels: {
                                    fontWeight: 700,
                                    lineHeight: "36px",
                                    fill: isIncome ? "#12C48B" : "#E3342F"
                                }
                            }}
                        />
                    </Then>
                    <Else>
                        <h5 className="d-flex w-100 justify-content-center align-items-center weight-700 h-100 my-2">
                            {isIncome ? "Income" : "Expense"} for the period not
                            found
                        </h5>
                    </Else>
                </If>
            </div>
            <When condition={!!pieData.length}>
                <ListGroup className="px-0 p-md-3 flex-grow-1">
                    {listItems}
                </ListGroup>
            </When>
        </>
    );
}

TransactionsPie.propTypes = {
    dateRange: PropTypes.arrayOf(PropTypes.instanceOf(Date)).isRequired,
    isIncome: PropTypes.bool.isRequired,
    pieData: PropTypes.arrayOf(
        PropTypes.exact({
            x: PropTypes.string,
            y: PropTypes.number,
            label: PropTypes.string,
            count: PropTypes.number
        })
    ).isRequired
};

const mapStateToProps = (state, { isIncome }) => ({
    dateRange: state.transactions.filters.dateRange,
    pieData: isIncome ? selectIncomePieData(state) : selectExpensePieData(state)
});

export default connect(mapStateToProps)(TransactionsPie);
