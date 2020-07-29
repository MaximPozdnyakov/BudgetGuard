import React from "react";

import { Container } from "react-bootstrap";

import MainHeader from "../OperationsAndOverview/MainHeader";
import StatisticContainer from "./StatisticsGraphs/StatisticContainer";

function Overview() {
    return (
        <>
            <MainHeader />
            <StatisticContainer />
        </>
    );
}

export default Overview;
