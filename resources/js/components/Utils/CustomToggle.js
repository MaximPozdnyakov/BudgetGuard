import React from "react";

import ArrowDown from "../Icons/ArrowDown";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div className="h-100 d-flex align-items-center pointer">
        <a
            className="font-weight-bold text-dark"
            ref={ref}
            onClick={e => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {children}
            <ArrowDown />
        </a>
    </div>
));

export default CustomToggle;
