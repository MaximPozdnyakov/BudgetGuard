import React, { useState } from "react";

import moment from "moment";

import { connect } from "react-redux";
import { addTransaction } from "../../actions/transactions";

import DatePicker from "react-date-picker";

import {
    Button,
    OverlayTrigger,
    Popover,
    Row,
    Col,
    Form
} from "react-bootstrap";

import { If, Then } from "react-if";

import Select from "react-select";

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

function AddTransaction(props) {
    const { addTransaction } = props;

    const [isFormOpen, setIsFormOpen] = useState(false);
    const [spentAt, onChangeSpentAt] = useState(new Date());
    const [category, setCategory] = useState(null);
    const [note, setNote] = useState("");
    const [sum, setSum] = useState("");

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
        return expenseOptions.includes(category);
    }
    function isValidTransaction() {
        return spentAt && category && Number(sum);
    }

    function submitTransaction() {
        if (isValidTransaction()) {
            addTransaction({
                moneyAmount: Number(sum).toFixed(1),
                moneySign: !isChosenCategoryExpense(category),
                category: category.value,
                spent_at: moment(spentAt).format("YYYY-MM-D h:mm:ss"),
                description: note
            });
        }
    }

    const addTransactionForm = (
        <Popover id="addTransactionForm" style={{ width: "56.3vw" }}>
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
                        <Col>
                            <Form.Group controlId="pickCategory">
                                <Form.Label className="text-secondary">
                                    Category
                                </Form.Label>
                                <Select
                                    placeholder="Choose a category ..."
                                    options={groupedOptions}
                                    formatGroupLabel={formatGroupLabel}
                                    onChange={onChangeCategory}
                                    value={category}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
                            <Form.Group
                                controlId="pickCategory"
                                className="d-flex flex-column"
                            >
                                <Form.Label className="text-secondary">
                                    Date
                                </Form.Label>
                                <DatePicker
                                    onChange={onChangeSpentAt}
                                    value={spentAt}
                                    clearIcon={null}
                                />
                            </Form.Group>
                        </Col>
                        <Col>
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
                        <Col>
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
                    <div className="d-flex justify-content-end align-items-center">
                        <Button
                            variant={
                                !isValidTransaction() ? "secondary" : "success"
                            }
                            disabled={!isValidTransaction()}
                            onClick={submitTransaction}
                        >
                            Add transaction
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
                overlay={addTransactionForm}
                show={isFormOpen}
            >
                <Button variant="success" onClick={openForm}>
                    <svg
                        viewBox="0 0 24 24"
                        width="22"
                        height="22"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="mr-2"
                    >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="16"></line>
                        <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                    <span className="align-self-start font-weight-bold">
                        Add transaction
                    </span>
                </Button>
            </OverlayTrigger>
        </div>
    );
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { addTransaction })(AddTransaction);
