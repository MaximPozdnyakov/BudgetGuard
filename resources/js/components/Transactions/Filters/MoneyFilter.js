import React from "react";
import NumberFormat from "react-number-format";
import { Range, getTrackBackground } from "react-range";
import _ from "lodash";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";
import PropTypes from "prop-types";

import { setMoneyRange } from "../../../actions/transactions";
import { selectMoneyRange } from "../../../selectors/selectors";

function MoneyFilter({ minSum, maxSum, rangeStart, rangeEnd, setMoneyRange }) {
    const getMax = () => (minSum === maxSum ? maxSum + 1 : maxSum);
    const getRangeEnd = () => (minSum === maxSum ? maxSum + 1 : rangeEnd);

    const getTrackBg = () =>
        getTrackBackground({
            values: [rangeStart, getRangeEnd()],
            colors: ["#ccc", "#12C48B", "#ccc"],
            min: minSum,
            max: getMax()
        });

    const renderTrack = ({ props, children }) => (
        <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            className="mt-2"
        >
            <div
                ref={props.ref}
                className="w-100 rounded h-5px"
                style={{ background: getTrackBg() }}
            >
                {children}
            </div>
        </div>
    );

    const renderThumb = ({ props }) => (
        <div {...props} className="bg-white rounded-circle thumb"></div>
    );

    return (
        <Form.Group controlId="moneyRange" className="desc-filter ml-3 w-95">
            <Form.Label className="text-secondary">By money</Form.Label>
            <Range
                values={[rangeStart, getRangeEnd()]}
                step={0.1}
                min={minSum}
                max={getMax()}
                disabled={minSum === maxSum}
                onChange={values => setMoneyRange(values)}
                renderTrack={renderTrack}
                renderThumb={renderThumb}
            />
            <output
                className="mt-2 d-flex justify-content-between w-100"
                id="output"
            >
                <div>
                    <NumberFormat
                        value={rangeStart}
                        displayType={"text"}
                        thousandSeparator={true}
                    />
                </div>
                <div>
                    <NumberFormat
                        value={rangeEnd}
                        displayType={"text"}
                        thousandSeparator={true}
                    />
                </div>
            </output>
        </Form.Group>
    );
}

MoneyFilter.propTypes = {
    minSum: PropTypes.number.isRequired,
    maxSum: PropTypes.number.isRequired,
    rangeStart: PropTypes.number.isRequired,
    rangeEnd: PropTypes.number.isRequired,
    setMoneyRange: PropTypes.func.isRequired
};

const mapStateToProps = state => {
    const [minSum, maxSum] = selectMoneyRange(state);
    const [rangeStart, rangeEnd] = state.transactions.filters.moneyRange;
    return { minSum, maxSum, rangeStart, rangeEnd };
};

export default connect(mapStateToProps, { setMoneyRange })(MoneyFilter);
