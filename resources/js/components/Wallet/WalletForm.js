import React from "react";
import { Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";

import { createWallet } from "../../actions/wallets";

function WalletForm({ createWallet }) {
    const history = useHistory();

    const { values, handleChange, handleSubmit } = useFormik({
        initialValues: { title: "", balance: "0" },
        async onSubmit({ title, balance }) {
            await createWallet({ title, initialBalance: Number(balance) });
            history.push("/operations");
        }
    });
    const { title, balance } = values;

    const getBalanceClassName = balance => {
        if (balance > 0) return "text-success";
        if (balance < 0) return "text-danger";
        return "";
    };

    const checkBtnDisabled = ({ title, balance }) => !title || !balance;

    return (
        <Form noValidate onSubmit={handleSubmit}>
            <Form.Group controlId="title">
                <Form.Label className="text-secondary">Title</Form.Label>
                <Form.Control
                    placeholder="Enter title for your wallet"
                    value={title}
                    onChange={handleChange}
                />
            </Form.Group>

            <Form.Group controlId="balance">
                <Form.Label className="text-secondary">
                    Initial Balance (USD)
                </Form.Label>
                <NumberFormat
                    id="balance"
                    placeholder="Enter initial balance"
                    onChange={handleChange}
                    value={balance}
                    className={`form-control ${getBalanceClassName(balance)}`}
                    decimalScale={2}
                />
            </Form.Group>

            <Button
                type="submit"
                variant="primary"
                block
                disabled={checkBtnDisabled(values)}
            >
                Create Wallet
            </Button>
        </Form>
    );
}

WalletForm.propTypes = {
    createWallet: PropTypes.func.isRequired
};

export default connect(null, { createWallet })(WalletForm);
