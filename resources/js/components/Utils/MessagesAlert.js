import React, { useState, useEffect } from "react";

import { If, Then } from "react-if";

import { Alert } from "react-bootstrap";

import { connect } from "react-redux";

function MessagesAlert(props) {
    const { messages } = props;

    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
        setShowAlert(true);
    }, [messages]);

    let messagesLi = [];
    if (messages.type === "alert") {
        for (let typeOfMessage in messages.messages) {
            messages.messages[typeOfMessage].forEach(message =>
                messagesLi.push(<li key={message}>{message}</li>)
            );
        }
    }
    return (
        <If condition={messages.type === "alert" && showAlert}>
            <Then>
                <Alert
                    variant={"danger"}
                    onClose={() => setShowAlert(false)}
                    dismissible
                >
                    <ul className="pl-3 mb-0">{messagesLi}</ul>
                </Alert>
            </Then>
        </If>
    );
}

const mapStateToProps = state => ({
    messages: state.messages
});

export default connect(mapStateToProps)(MessagesAlert);
