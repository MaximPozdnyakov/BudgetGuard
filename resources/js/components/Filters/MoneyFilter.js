import React from "react";

import { Range, getTrackBackground } from "react-range";

import { connect } from "react-redux";
import { setMoneyRange } from "../../actions/transactions";

import { Form } from "react-bootstrap";

function MoneyFilter(props) {
    const { moneyRange, setMoneyRange, transactions } = props;

    const allMoney = transactions.map(transaction => {
        if (!transaction.moneySign) {
            return -1 * transaction.moneyAmount;
        }
        return transaction.moneyAmount;
    });
    const minMoney = Math.min(...allMoney);
    const maxMoney = Math.max(...allMoney);
    return (
        <div>
            <Form.Group controlId="moneyRange">
                <Form.Label className="text-secondary">By money</Form.Label>
                <Range
                    values={moneyRange}
                    step={0.1}
                    min={minMoney}
                    max={maxMoney}
                    onChange={values => {
                        setMoneyRange(values);
                    }}
                    renderTrack={({ props, children }) => (
                        <div
                            onMouseDown={props.onMouseDown}
                            onTouchStart={props.onTouchStart}
                            className="mt-2"
                        >
                            <div
                                ref={props.ref}
                                className="w-100 rounded"
                                style={{
                                    height: "5px",
                                    background: getTrackBackground({
                                        values: moneyRange,
                                        colors: ["#ccc", "#12C48B", "#ccc"],
                                        min: minMoney,
                                        max: maxMoney
                                    })
                                }}
                            >
                                {children}
                            </div>
                        </div>
                    )}
                    renderThumb={({ props, isDragged }) => (
                        <div
                            {...props}
                            className="bg-white rounded-circle"
                            style={{
                                ...props.style,
                                height: "20px",
                                width: "20px",
                                boxShadow: "0px 2px 6px #AAA"
                            }}
                        ></div>
                    )}
                />
                <output
                    className="mt-2 d-flex justify-content-between w-100"
                    id="output"
                >
                    <div>{moneyRange[0].toFixed(1)}</div>
                    <div>{moneyRange[1].toFixed(1)}</div>
                </output>
            </Form.Group>
        </div>
    );
}

const mapStateToProps = state => ({
    transactions: state.transactions.transactions,
    moneyRange: state.transactions.transactionsFilters.moneyRange
});

export default connect(mapStateToProps, { setMoneyRange })(MoneyFilter);
