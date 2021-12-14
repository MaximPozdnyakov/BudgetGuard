import React from "react";
import { Form } from "react-bootstrap";
import FieldError from "./FieldError";
import PropTypes from "prop-types";

function FormField({
    value,
    error,
    handleChange,
    label,
    placeholder,
    name,
    type = "text"
}) {
    return (
        <Form.Group controlId={name}>
            <Form.Label className="text-secondary">{label}</Form.Label>
            <Form.Control
                type={type}
                placeholder={placeholder}
                onChange={handleChange}
                value={value}
                isInvalid={!!error}
                isValid={!error && value !== ""}
            />
            <Form.Control.Feedback>Success!</Form.Control.Feedback>
            <FieldError {...{ error }} />
        </Form.Group>
    );
}

FormField.propTypes = {
    value: PropTypes.string.isRequired,
    error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.arrayOf(PropTypes.string)
    ]),
    handleChange: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string
};

export default FormField;
