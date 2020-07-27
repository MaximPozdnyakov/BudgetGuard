import React, { useState } from "react";

import { Container, Form, Button, Col, Row } from "react-bootstrap";

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
            props.history.push("/");
        }
    }

    return (
        <Container className="mt-5">
            <Row className="mx-3">
                <Col lg="6" className="bg-white mx-auto p-4 shadow-sm">
                    <h2 className="text-center" style={{ fontWeight: 700 }}>
                        Create Wallet
                    </h2>
                    <Row>
                        <Col xs="12" md="9" className="mx-auto">
                            <Form noValidate onSubmit={handleSubmit}>
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
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, { addWallet })(AddWallet);
