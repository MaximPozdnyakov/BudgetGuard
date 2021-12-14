import React, { useState } from "react";
import { format, startOfDay, isSameDay } from "date-fns";
import { connect } from "react-redux";
import DatePicker from "react-date-picker";
import { Button, Row, Col, Form } from "react-bootstrap";
import Select from "react-select";
import { useFormik } from "formik";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";

import {
    updateTransaction,
    deleteTransaction
} from "../../../actions/transactions";

import {
    expenseOptions,
    groupedOptions,
    transactionShape
} from "../../../constants/transactions";

function TransactionForm({
    updateTransaction,
    deleteTransaction,
    toggleForm,
    transaction
}) {
    const [category, setCategory] = useState({
        value: transaction.category,
        label: transaction.category
    });
    const [spentAt, setSpentAt] = useState(
        startOfDay(new Date(transaction.spent_at))
    );

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: {
            note: transaction.description || "",
            sum: Number(transaction.moneyAmount)
        },
        async onSubmit({ note, sum }) {
            toggleForm();
            await updateTransaction({
                updatedTransaction: {
                    ...transaction,
                    moneyAmount: sum,
                    moneySign: !checkCategoryExpense({ category }),
                    category: category.value,
                    spent_at: format(startOfDay(spentAt), "yyyy-MM-dd"),
                    description: note
                },
                id: transaction.id
            });
        }
    });

    const handleCategoryChange = option => setCategory(option);

    const handleTransactionDelete = async () => {
        toggleForm();
        await deleteTransaction(transaction.id);
    };

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
        return !!expenseOptions.find(option => option.value === category.value);
    }
    const checkBtnDisabled = () =>
        !spentAt ||
        !category ||
        sum <= 0 ||
        (isSameDay(new Date(transaction.spent_at), spentAt) &&
            transaction.moneyAmount == sum &&
            transaction.description == note &&
            transaction.category == category.value);

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
                    Save changes
                </Button>
                <Button
                    variant="danger mx-lg-4"
                    onClick={handleTransactionDelete}
                >
                    Delete operation
                </Button>
                <Button variant="secondary" onClick={toggleForm}>
                    Cancel
                </Button>
            </div>
        </Form>
    );
}

TransactionForm.propTypes = {
    transaction: transactionShape.isRequired,
    updateTransaction: PropTypes.func.isRequired,
    deleteTransaction: PropTypes.func.isRequired,
    toggleForm: PropTypes.func.isRequired
};

export default connect(null, {
    updateTransaction,
    deleteTransaction
})(TransactionForm);
