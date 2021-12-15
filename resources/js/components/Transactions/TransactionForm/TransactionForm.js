import React, { useState } from "react";
import { format, startOfToday, startOfDay } from "date-fns";
import { connect } from "react-redux";
import DatePicker from "react-date-picker";
import { Button, Row, Col, Form } from "react-bootstrap";
import Select from "react-select";
import { useFormik } from "formik";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";

import { addTransaction } from "../../../actions/transactions";

import {
    expenseOptions,
    groupedOptions
} from "../../../constants/transactions";

function TransactionForm({ addTransaction, currentWalletId, toggleForm }) {
    const [category, setCategory] = useState(null);
    const [spentAt, setSpentAt] = useState(startOfToday());

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: { note: "", sum: "" },
        async onSubmit({ note, sum }) {
            toggleForm();
            await addTransaction({
                moneyAmount: sum,
                moneySign: !checkCategoryExpense({ category }),
                category: category.value,
                spent_at: format(startOfDay(spentAt), "yyyy-MM-dd"),
                description: note,
                wallet: currentWalletId,
                temporaryId: Math.floor(Math.random() * 10000)
            });
        }
    });

    const handleCategoryChange = option => setCategory(option);

    const formatGroupLabel = ({ label }) => (
        <div
            className={`py-2 text-center text-white font-weight-bold ${
                label === "Expense" ? "bg-danger" : "bg-success"
            }`}
        >
            <span>{label}</span>
        </div>
    );
    const getNumberInputClass = ({ category }) => {
        let className = "form-control text-weight-bold ";
        if (!category) return className;
        if (checkCategoryExpense({ category })) {
            return `${className} text-danger`;
        }
        return `${className} text-success`;
    };

    function checkCategoryExpense({ category }) {
        return expenseOptions.includes(category);
    }
    const checkBtnDisabled = () => !spentAt || !category || sum <= 0;

    const { note, sum } = values;
    return (
        <Form>
            <Row>
                <Col lg md="6">
                    <Form.Group controlId="pickCategory">
                        <Form.Label className="text-secondary">
                            Category
                        </Form.Label>
                        <Select
                            placeholder="Choose a category ..."
                            options={groupedOptions}
                            formatGroupLabel={formatGroupLabel}
                            onChange={handleCategoryChange}
                            value={category}
                        />
                    </Form.Group>
                </Col>
                <Col lg md="6">
                    <Form.Group
                        controlId="pickCategory"
                        className="d-flex flex-column"
                    >
                        <Form.Label className="text-secondary">Date</Form.Label>
                        <DatePicker
                            onChange={setSpentAt}
                            value={spentAt}
                            clearIcon={null}
                            format="dd.MM.y"
                        />
                    </Form.Group>
                </Col>
                <Col lg md="6">
                    <Form.Group controlId="note">
                        <Form.Label className="text-secondary">
                            Note (optionally)
                        </Form.Label>
                        <Form.Control
                            placeholder="Write a note"
                            value={note}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Col>
                <Col lg md="6">
                    <Form.Group controlId="sum">
                        <Form.Label className="text-secondary">
                            Sum (USD)
                        </Form.Label>
                        <NumberFormat
                            id="sum"
                            placeholder="Enter sum"
                            className={getNumberInputClass({ category })}
                            value={sum}
                            onChange={handleChange}
                            decimalScale={2}
                            allowNegative={false}
                        />
                    </Form.Group>
                </Col>
            </Row>
            <div className="d-flex justify-content-between justify-content-lg-end align-items-center">
                <Button
                    variant={checkBtnDisabled() ? "secondary" : "success"}
                    disabled={checkBtnDisabled()}
                    onClick={handleSubmit}
                >
                    Add transaction
                </Button>
                <Button variant="secondary ml-lg-4" onClick={toggleForm}>
                    Cancel
                </Button>
            </div>
        </Form>
    );
}

TransactionForm.propTypes = {
    addTransaction: PropTypes.func.isRequired,
    currentWalletId: PropTypes.number.isRequired,
    toggleForm: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    currentWalletId: state.wallets.currentWallet.id
});

export default connect(mapStateToProps, { addTransaction })(TransactionForm);
