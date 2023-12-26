import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

export default function AlarmlistMachine() {
    return (
        <main className="content bg-light">
            <div className="container-fluid p-3">
                <div className="row mb-3">
                    <div className="col">
                        <h3 className="h3">Alarmlist Machine</h3>
                    </div>
                </div>

                <div className="row mb-3">
                    {/* Select Start date */}
                    <div className="col-2">
                        <label htmlFor="startDate">Start Date</label>
                        <input id="startDate" className="form-control" type="date" />
                    </div>

                    {/* Select End date */}
                    <div className="col-2">
                        <label htmlFor="endDate">End Date</label>
                        <input id="endDate" className="form-control" type="date" />
                    </div>

                    {/* Select Machine */}
                    <div className="col-2">
                        <label htmlFor="machineNo">Machine No.</label>
                        <select
                            className="form-select"
                            aria-label="default select"
                            id="machineNo"
                            name="machineNo"
                            // onChange={}
                            // value={}
                        >
                            <option value="ALL">-- ALL --</option>
                        </select>
                    </div>

                    {/* Button submit */}
                    <div className="col-1 pt-4">
                        <button type="button" class="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>

                <div className="row mb-3">
                    <div className="col-sm-12">
                        <div className="card h-100">
                            <div className="card-body">
                                <div id="chart">
                                    <ReactApexChart
                                        options={{
                                            chart: {
                                                height: 350,
                                                type: "rangeBar",
                                            },
                                            plotOptions: {
                                                bar: {
                                                    horizontal: true,
                                                    barHeight: "80%",
                                                    rangeBarGroupRows: true,
                                                },
                                            },
                                            colors: [
                                                "#00E396",
                                                "#FF4560",
                                                "#008FFB",
                                                "#FEB019",
                                                "#775DD0",
                                                "#3F51B5",
                                                "#546E7A",
                                                "#D4526E",
                                                "#8D5B4C",
                                                "#F86624",
                                                "#D7263D",
                                                "#1B998B",
                                                "#2E294E",
                                                "#F46036",
                                                "#E2C044",
                                            ],
                                            fill: {
                                                type: "solid",
                                            },
                                            xaxis: {
                                                type: "datetime",
                                            },
                                            title: {
                                                text: "AGL04",
                                            },
                                            legend: {
                                                position: "bottom",
                                            },
                                        }}
                                        series={[
                                            {
                                                name: "Run",
                                                data: [
                                                    {
                                                        x: "Machine status",
                                                        y: [new Date(1801, 1, 1).getTime(), new Date(1803, 1, 1).getTime()],
                                                    },
                                                    {
                                                        x: "Machine status",
                                                        y: [new Date(1806, 1, 1).getTime(), new Date(1810, 1, 1).getTime()],
                                                    },
                                                ],
                                            },
                                            {
                                                name: "Stop",
                                                data: [
                                                    {
                                                        x: "Machine status",
                                                        y: [new Date(1807, 3, 30).getTime(), new Date(1809, 2, 4).getTime()],
                                                    },
                                                ],
                                            },
                                            {
                                                name: "Wait part",
                                                data: [
                                                    {
                                                        x: "Machine status",
                                                        y: [new Date(1815, 3, 30).getTime(), new Date(1816, 2, 4).getTime()],
                                                    },
                                                ],
                                            },
                                            {
                                                name: "Plan stop",
                                                data: [
                                                    {
                                                        x: "Machine status",
                                                        y: [new Date(1816, 3, 30).getTime(), new Date(1818, 2, 4).getTime()],
                                                    },
                                                ],
                                            },
                                            {
                                                name: "Setup",
                                                data: [
                                                    {
                                                        x: "Machine status",
                                                        y: [new Date(1818, 3, 30).getTime(), new Date(1820, 2, 4).getTime()],
                                                    },
                                                ],
                                            },
                                            {
                                                name: "Maintenance",
                                                data: [
                                                    {
                                                        x: "Machine status",
                                                        y: [new Date(1820, 3, 30).getTime(), new Date(1822, 2, 4).getTime()],
                                                    },
                                                ],
                                            },
                                            {
                                                name: "Wait QC",
                                                data: [
                                                    {
                                                        x: "Machine status",
                                                        y: [new Date(1822, 3, 30).getTime(), new Date(1825, 2, 4).getTime()],
                                                    },
                                                ],
                                            },

                                            {
                                                name: "C3-HOPPER EMPTY",
                                                data: [
                                                    {
                                                        x: "Alarmlist",
                                                        y: [new Date(1801, 1, 1).getTime(), new Date(1803, 1, 1).getTime()],
                                                    },
                                                ],
                                            },
                                            {
                                                name: "BALL CHECK1 NG",
                                                data: [
                                                    {
                                                        x: "Alarmlist",
                                                        y: [new Date(1807, 3, 30).getTime(), new Date(1809, 2, 4).getTime()],
                                                    },
                                                ],
                                            },
                                            {
                                                name: "NO-WORK",
                                                data: [
                                                    {
                                                        x: "Alarmlist",
                                                        y: [new Date(1815, 3, 30).getTime(), new Date(1816, 2, 4).getTime()],
                                                    },
                                                ],
                                            },
                                            {
                                                name: "REMNANTS NG",
                                                data: [
                                                    {
                                                        x: "Alarmlist",
                                                        y: [new Date(1816, 3, 30).getTime(), new Date(1818, 2, 4).getTime()],
                                                    },
                                                ],
                                            },
                                            {
                                                name: "REMNANTS",
                                                data: [
                                                    {
                                                        x: "Alarmlist",
                                                        y: [new Date(1818, 3, 30).getTime(), new Date(1820, 2, 4).getTime()],
                                                    },
                                                ],
                                            },
                                            {
                                                name: "EMG.STOP",
                                                data: [
                                                    {
                                                        x: "Alarmlist",
                                                        y: [new Date(1820, 3, 30).getTime(), new Date(1822, 2, 4).getTime()],
                                                    },
                                                ],
                                            },
                                            {
                                                name: "BALL CHECK2 NG",
                                                data: [
                                                    {
                                                        x: "Alarmlist",
                                                        y: [new Date(1822, 3, 30).getTime(), new Date(1825, 2, 4).getTime()],
                                                    },
                                                ],
                                            },
                                            {
                                                name: "NO-RETAINER",
                                                data: [
                                                    {
                                                        x: "Alarmlist",
                                                        y: [new Date(1822, 3, 30).getTime(), new Date(1825, 2, 4).getTime()],
                                                    },
                                                ],
                                            },
                                            {
                                                name: "WREMNENTS",
                                                data: [
                                                    {
                                                        x: "Alarmlist",
                                                        y: [new Date(1822, 3, 30).getTime(), new Date(1825, 2, 4).getTime()],
                                                    },
                                                ],
                                            },
                                            {
                                                name: "AIR LOW PRESSURE",
                                                data: [
                                                    {
                                                        x: "Alarmlist",
                                                        y: [new Date(1822, 3, 30).getTime(), new Date(1825, 2, 4).getTime()],
                                                    },
                                                ],
                                            },
                                            {
                                                name: "C2-EMPTY",
                                                data: [
                                                    {
                                                        x: "Alarmlist",
                                                        y: [new Date(1822, 3, 30).getTime(), new Date(1825, 2, 4).getTime()],
                                                    },
                                                ],
                                            },
                                            {
                                                name: "D1 VACUUM MISS",
                                                data: [
                                                    {
                                                        x: "Alarmlist",
                                                        y: [new Date(1822, 3, 30).getTime(), new Date(1825, 2, 4).getTime()],
                                                    },
                                                ],
                                            },
                                            {
                                                name: "WATING FOR SENSOR",
                                                data: [
                                                    {
                                                        x: "Alarmlist",
                                                        y: [new Date(1822, 3, 30).getTime(), new Date(1825, 2, 4).getTime()],
                                                    },
                                                ],
                                            },
                                            {
                                                name: "CABLE SIGNAL NG",
                                                data: [
                                                    {
                                                        x: "Alarmlist",
                                                        y: [new Date(1822, 3, 30).getTime(), new Date(1825, 2, 4).getTime()],
                                                    },
                                                ],
                                            },
                                            {
                                                name: "D1/D2 RTNR WAIT",
                                                data: [
                                                    {
                                                        x: "Alarmlist",
                                                        y: [new Date(1822, 3, 30).getTime(), new Date(1825, 2, 4).getTime()],
                                                    },
                                                ],
                                            },
                                            {
                                                name: "STATION ERROR",
                                                data: [
                                                    {
                                                        x: "Alarmlist",
                                                        y: [new Date(1822, 3, 30).getTime(), new Date(1825, 2, 4).getTime()],
                                                    },
                                                ],
                                            },
                                            {
                                                name: "BALL CHECK NG",
                                                data: [
                                                    {
                                                        x: "Alarmlist",
                                                        y: [new Date(1822, 3, 30).getTime(), new Date(1825, 2, 4).getTime()],
                                                    },
                                                ],
                                            },
                                            {
                                                name: "D2 VACUUM MISS",
                                                data: [
                                                    {
                                                        x: "Alarmlist",
                                                        y: [new Date(1822, 3, 30).getTime(), new Date(1825, 2, 4).getTime()],
                                                    },
                                                ],
                                            },
                                            {
                                                name: "SERVO &INDEX ERROR",
                                                data: [
                                                    {
                                                        x: "Alarmlist",
                                                        y: [new Date(1822, 3, 30).getTime(), new Date(1825, 2, 4).getTime()],
                                                    },
                                                ],
                                            },
                                        ]}
                                        type="rangeBar"
                                        height={200}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
