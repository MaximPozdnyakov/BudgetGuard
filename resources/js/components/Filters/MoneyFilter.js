import React, { useState } from "react";

import NumberFormat from "react-number-format";

import { Range, getTrackBackground } from "react-range";

import _ from "lodash";

import { If, Then } from "react-if";

import { connect } from "react-redux";
import { setMoneyRange } from "../../actions/transactions";

import { Form } from "react-bootstrap";

function MoneyFilter(props) {
    const { moneyRange, setMoneyRange, transactions, selectedWallet } = props;
    const allMoney = transactions
        .filter(t => t.wallet === selectedWallet.id)
        .map(transaction => {
            if (!transaction.moneySign) {
                return -1 * transaction.moneyAmount;
            }
            return transaction.moneyAmount;
        });

    const minMoney = Math.min(...allMoney);
    const maxMoney = Math.max(...allMoney);
    return (
        <If condition={_.uniq(allMoney).length >= 2}>
            <Then>
                <div>
                    <Form.Group controlId="moneyRange">
                        <Form.Label className="text-secondary">
                            By money
                        </Form.Label>
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
                                                colors: [
                                                    "#ccc",
                                                    "#12C48B",
                                                    "#ccc"
                                                ],
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
                            <div>
                                <NumberFormat
                                    value={moneyRange[0].toFixed(1)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                />
                            </div>
                            <div>
                                <NumberFormat
                                    value={moneyRange[1].toFixed(1)}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                />
                            </div>
                        </output>
                    </Form.Group>
                </div>
            </Then>
        </If>
    );
}

const mapStateToProps = state => ({
    transactions: state.transactions.transactions,
    moneyRange: state.transactions.transactionsFilters.moneyRange,
    selectedWallet: state.wallets.currentWallet
});

export default connect(mapStateToProps, { setMoneyRange })(MoneyFilter);
