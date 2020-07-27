import React, { useState } from "react";

import moment from "moment";

import _ from "lodash";

import { connect } from "react-redux";
import {
    updateTransaction,
    deleteTransaction
} from "../../actions/transactions";

import DatePicker from "react-date-picker";

import NumberFormat from "react-number-format";

import {
    Button,
    Popover,
    Row,
    Col,
    Form,
    OverlayTrigger,
    ListGroup
} from "react-bootstrap";

import Select from "react-select";

import { If, Then } from "react-if";

const expenseOptions = [
    { value: "Car", label: "Car" },
    { value: "Travel", label: "Travel" },
    { value: "Food & Drink", label: "Food & Drink" },
    { value: "Family & Personal", label: "Family & Personal" },
    { value: "Bills & Fees", label: "Bills & Fees" },
    { value: "Entertainment", label: "Entertainment" },
    { value: "Home", label: "Home" },
    { value: "Shopping", label: "Shopping" },
    { value: "Healthcare", label: "Healthcare" }
];

const incomeOptions = [
    { value: "Gift", label: "Gift" },
    { value: "Business", label: "Business" },
    { value: "Salary", label: "Salary" },
    { value: "Extra Income", label: "Extra Income" }
];

const groupedOptions = [
    {
        label: "Expense",
        options: expenseOptions
    },
    {
        label: "Income",
        options: incomeOptions
    }
];

const formatGroupLabel = data => (
    <div
        className={`py-2 text-center text-white font-weight-bold ${
            data.label === "Expense" ? "bg-danger" : "bg-success"
        }`}
    >
        <span>{data.label}</span>
    </div>
);

function Transaction(props) {
    const { updateTransaction, deleteTransaction } = props;

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [spentAt, onChangeSpentAt] = useState(props.spent_at);
    const [category, setCategory] = useState({
        value: props.category,
        label: props.category
    });
    const [note, setNote] = useState(props.note);
    const [sum, setSum] = useState(props.moneyAmount);

    function onChangeCategory(option) {
        setCategory(option);
    }
    function onChangeNote(e) {
        setNote(e.target.value);
    }
    function onChangeSum(e) {
        setSum(e.target.value);
    }

    function openForm() {
        setIsFormOpen(!isFormOpen);
    }

    function isChosenCategoryExpense(category) {
        return expenseOptions
            .map(option => option.value)
            .includes(category.value);
    }
    function isValidTransaction() {
        return (
            spentAt &&
            category &&
            Number(sum) &&
            !(
                spentAt === props.spent_at &&
                category.value === props.category &&
                note === props.note &&
                Number(sum) === Number(props.moneyAmount)
            )
        );
    }

    function updateTransactionOnClick() {
        if (isValidTransaction()) {
            updateTransaction(
                {
                    moneyAmount: Number(sum).toFixed(1),
                    moneySign: !isChosenCategoryExpense(category),
                    category: category.value,
                    spent_at: moment(spentAt).format("YYYY-MM-D h:mm:ss"),
                    description: note
                },
                props.id
            );
        }
    }
    function deleteTransactionOnClick() {
        deleteTransaction(props.id);
    }
    const UpdateDeleteTransactionForm = (
        <Popover id="updateTransactionForm" className="popover-container">
            <Popover.Content className="p-3">
                <Button
                    variant="secondary rounded-circle"
                    className="position-absolute p-1"
                    style={{ top: "-1em", right: "-1em" }}
                    onClick={openForm}
                >
                    <svg
                        viewBox="0 0 24 24"
                        width="20"
                        height="20"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="m-1"
                    >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </Button>
                <Form>
                    <Row>
                        <Col lg md="6">
                            <Form.Group controlId="pickCategory">
                                <Form.Label className="text-secondary">
                                    Category
                                </Form.Label>
                                <Select
                                    options={groupedOptions}
                                    formatGroupLabel={formatGroupLabel}
                                    onChange={onChangeCategory}
                                    defaultValue={category}
                                    value={category}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg md="6">
                            <Form.Group
                                controlId="pickCategory"
                                className="d-flex flex-column"
                            >
                                <Form.Label className="mb-0 text-secondary">
                                    Date
                                </Form.Label>
                                <DatePicker
                                    onChange={onChangeSpentAt}
                                    value={spentAt}
                                    clearIcon={null}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg md="6">
                            <Form.Group controlId="writeNote">
                                <Form.Label className="text-secondary">
                                    Note (optionally)
                                </Form.Label>
                                <Form.Control
                                    placeholder="Write a note"
                                    value={note}
                                    onChange={onChangeNote}
                                />
                            </Form.Group>
                        </Col>
                        <Col lg md="6">
                            <Form.Group controlId="pickSum">
                                <Form.Label className="text-secondary">
                                    Sum (USD)
                                </Form.Label>
                                <Form.Control
                                    placeholder="0.00 USD"
                                    className={`text-weight-bold text-right ${
                                        isChosenCategoryExpense(category)
                                            ? "text-danger"
                                            : "text-success"
                                    }`}
                                    value={sum}
                                    onChange={onChangeSum}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <div className="d-flex justify-content-between justify-content-lg-end align-items-center">
                        <Button
                            variant={
                                !isValidTransaction() ? "secondary" : "success"
                            }
                            disabled={!isValidTransaction()}
                            onClick={updateTransactionOnClick}
                        >
                            Save changes
                        </Button>
                        <Button
                            variant="danger mx-3"
                            onClick={deleteTransactionOnClick}
                        >
                            Delete operation
                        </Button>
                        <Button
                            variant="secondary"
                            className="d-none-440"
                            onClick={openForm}
                        >
                            Cancel
                        </Button>
                    </div>
                </Form>
            </Popover.Content>
        </Popover>
    );

    return (
        <div>
            <If condition={isFormOpen}>
                <Then>
                    <div className="dark-overlay" onClick={openForm}></div>
                </Then>
            </If>
            <OverlayTrigger
                placement="bottom-start"
                overlay={UpdateDeleteTransactionForm}
                show={isFormOpen}
            >
                <ListGroup.Item
                    className="gray-on-hover border-0"
                    onClick={openForm}
                >
                    <Row>
                        <Col xs={4}>{props.category}</Col>
                        <Col xs={4}>
                            <div className="d-none d-md-block">
                                {props.description ? props.description : ""}
                            </div>
                        </Col>
                        <Col
                            xs={4}
                            className={`font-weight-bold text-right ${
                                props.moneySign ? "text-success" : "text-danger"
                            }`}
                        >
                            {props.moneySign ? "+" : "-"}
                            <NumberFormat
                                value={props.moneyAmount}
                                displayType={"text"}
                                thousandSeparator={true}
                            />
                            {" USD"}
                        </Col>
                    </Row>
                </ListGroup.Item>
            </OverlayTrigger>
        </div>
    );
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, {
    updateTransaction,
    deleteTransaction
})(Transaction);
