import React from "react";

import CategoryFilter from "./CategoryFilter";

function Filters() {
    return (
        <div className="mt-5 bg-white p-3">
            <h6 className="font-weight-bold">Filters</h6>
            <CategoryFilter />
        </div>
    );
}

export default Filters;
