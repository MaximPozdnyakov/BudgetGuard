import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

function MessagesAlert({ messages, type, isError }) {
    const [isAlertOpen, setAlertOpen] = useState(false);

    useEffect(() => {
        setAlertOpen(true);
    }, [messages]);

    const closeAlert = () => setAlertOpen(false);

    if (type !== "alert" || !isAlertOpen) {
        return null;
    }

    const messagesComponents = Array.isArray(messages) ? (
        messages.map(message => <li key={message}>{message}</li>)
    ) : (
        <li>{messages}</li>
    );

    return (
        <Alert
            variant={isError ? "danger" : "success"}
            onClose={closeAlert}
            dismissible
        >
            <ul className="pl-3 mb-0">{messagesComponents}</ul>
        </Alert>
    );
}

MessagesAlert.propTypes = {
    messages: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.string),
        PropTypes.string
    ]).isRequired,
    type: PropTypes.string.isRequired,
    isError: PropTypes.bool.isRequired
};

const mapStateToProps = state => state.messages;

export default connect(mapStateToProps)(MessagesAlert);
