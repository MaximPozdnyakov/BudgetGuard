import React, { useEffect } from "react";

import { connect } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const toastOptions = {
    position: "bottom-left",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined
};

function MessagesToast({ messages, type, isError }) {
    useEffect(() => {
        if (type === "toast") {
            if (isError) toast.error(messages);
            else toast.success(messages);
        }
    }, [messages]);

    return <ToastContainer {...toastOptions} />;
}

const mapStateToProps = state => state.messages;

export default connect(mapStateToProps)(MessagesToast);
