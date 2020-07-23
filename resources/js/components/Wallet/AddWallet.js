import React, { useState } from "react";

import { Container, Form, Button } from "react-bootstrap";

import { connect } from "react-redux";
import MessagesAlert from "../Utils/MessagesAlert";
import { addWallet } from "../../actions/wallets";

function AddWallet(props) {
    const { addWallet } = props;
    const [title, setTitle] = useState("");
    const onChangeTitle = e => setTitle(e.target.value);

    const [initialBalance, setInitialBalance] = useState("");
    const onChangeInitialBalance = e => setInitialBalance(e.target.value);

    const isValidForm = () => title && Number(initialBalance);

    const colorOfInitialBalance = () => {
        const initialBalanceNum = Number(initialBalance);

        if (!initialBalanceNum) {
            return "";
        } else if (initialBalanceNum > 0) {
            return "text-success";
        } else {
            return "text-danger";
        }
    };

    function handleSubmit(e) {
        e.preventDefault();
        if (isValidForm()) {
            addWallet({
                title,
                initialBalance: Number(initialBalance).toFixed(2)
            });
        }
    }

    return (
        <Container className="mt-3">
            <div className="bg-white mx-auto w-50 p-4 shadow-sm">
                <h2 className="text-center" style={{ fontWeight: 700 }}>
                    Create Wallet
                </h2>
                <Form
                    noValidate
                    onSubmit={handleSubmit}
                    className="w-75 mx-auto"
                >
                    <MessagesAlert />
                    <Form.Group controlId="title">
                        <Form.Label className="text-secondary">
                            Title
                        </Form.Label>
                        <Form.Control
                            placeholder="Enter title for your wallet"
                            value={title}
                            onChange={onChangeTitle}
                        />
                    </Form.Group>
                    <Form.Group controlId="password">
                        <Form.Label className="text-secondary">
                            Initial Balance (USD)
                        </Form.Label>
                        <Form.Control
                            style={{ fontWeight: 700 }}
                            placeholder="Enter initial balance"
                            onChange={onChangeInitialBalance}
                            value={initialBalance}
                            className={colorOfInitialBalance()}
                        />
                    </Form.Group>
                    <Button
                        type="submit"
                        variant="primary"
                        block
                        disabled={!isValidForm()}
                    >
                        Create Wallet
                    </Button>
                </Form>
            </div>
        </Container>
    );
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { addWallet })(AddWallet);
