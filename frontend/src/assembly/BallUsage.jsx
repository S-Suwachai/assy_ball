import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import axios from "axios";
import DataTable from "react-data-table-component";

export default function BallUsage() {
    // Data state
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [dataForChart, setDataForChart] = useState([]);
    const [dataForChartBall, setDataForChartBall] = useState([]);
    const [dataForTable, setDataForTable] = useState([]);
    const [material, setMaterial] = useState([]);
    const [size, setSize] = useState([]);
    const [part, setPart] = useState([]);
    const [rp, setRp] = useState([]);
    const [machine, setMachine] = useState([]);

    // Render state
    const [loading, setLoading] = useState(false);
    const [haveData, setHaveData] = useState(false);

    // Select state
    const [selectMaterial, setSelectMaterial] = useState("");
    const [selectSize, setSelectSize] = useState("");
    const [selectPart, setSelectPart] = useState("");
    const [selectRp, setSelectRp] = useState("");
    const [selectMachine, setSelectMachine] = useState("");
    const [selectedOption, setSelectedOption] = useState("graphPrecent");

    const columns = [
        {
            name: "Date",
            selector: (row) => row.date,
        },
        {
            name: "Machine No.",
            selector: (row) => row.machine,
        },
        {
            name: "Part No.",
            selector: (row) => row.partNo,
        },
        {
            name: "Ball size",
            selector: (row) => row.ballSize,
        },
        {
            name: "Spec",
            selector: (row) => row.spec,
        },
        {
            name: "Qty(+5.0)",
            selector: (row) => row.qty50,
        },
        {
            name: "Qty(+2.5)",
            selector: (row) => row.qty25,
        },
        {
            name: "Qty(0.0)",
            selector: (row) => row.qty00,
        },
        {
            name: "Qty(-2.5)",
            selector: (row) => row.qty_25,
        },
        {
            name: "Qty(-5.0)",
            selector: (row) => row.qty_50,
        },
    ];

    const conditionalRowStyles = [
        {
            when: (row) => row.date === "Total",
            style: {
                fontWeight: 650,
                backgroundColor: "lightskyblue",
            },
        },
    ];

    const getDataUsageBall = async () => {
        const result = await axios.post("http://localhost:4000/assy/ball/usageBall", {
            startDateQuery: startDate,
            endDateQuery: endDate,
            materialQuery: selectMaterial,
            partQuery: selectPart,
            sizeQuery: selectSize,
            rpQuery: selectRp,
            machineQuery: selectMachine,
        });

        setDataForChart(result.data.dataForChart);
        setDataForChartBall(result.data.dataForChartBall);
        setDataForTable(result.data.dataForTable);
        setMaterial(result.data.materialForSelect);
        setSize(result.data.ballSizeForSelect);
        setPart(result.data.partForSelect);
        setRp(result.data.rpForSelect);
        setMachine(result.data.machineForSelect);

        if (result.data.dataForChart.date.length > 0) {
            setHaveData(true);
        } else {
            setHaveData(false);
        }
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            await getDataUsageBall();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChangeStartDate = (e) => {
        setStartDate(e.target.value);
    };

    const handleChangeEndDate = (e) => {
        setEndDate(e.target.value);
    };

    const handleChangeMaterial = (e) => {
        setSelectMaterial(e.target.value);
    };

    const handleChangeSize = (e) => {
        setSelectSize(e.target.value);
    };

    const handlechangePart = (e) => {
        setSelectPart(e.target.value);
    };

    const handleChangeRp = (e) => {
        setSelectRp(e.target.value);
    };

    const handleChangeMachine = (e) => {
        setSelectMachine(e.target.value);
    };

    const handleOptionChange = (e) => {
        setSelectedOption(e);
    };

    const onSubmit = () => {
        fetchData();
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectMaterial, selectSize, selectPart, selectRp, selectMachine]);

    return (
        <main className="content bg-light">
            <div className="container-fluid p-3">
                <div className="row mb-3">
                    <div className="col">
                        <h3 className="h3">Usage ball</h3>
                    </div>

                    {/* Select Start date */}
                    <div className="col-2">
                        <label htmlFor="startDate">Start Date</label>
                        <input id="startDate" className="form-control" type="date" value={startDate} onChange={handleChangeStartDate} />
                    </div>

                    {/* Select End date */}
                    <div className="col-2">
                        <label htmlFor="EndDate">End Date</label>
                        <input id="EndDate" className="form-control" type="date" value={endDate} onChange={handleChangeEndDate} />
                    </div>

                    {/* Button submit */}
                    <div className="col-1 pt-4">
                        <button type="button" class="btn btn-primary" onClick={onSubmit}>
                            Submit
                        </button>
                    </div>
                </div>

                <div className="row mb-3 d-flex justify-content-center">
                    <div className="col-1 text-center">
                        <div className="h2 pt-3">Filter</div>
                    </div>
                    {/* Select Material */}
                    <div className="col-2">
                        <label htmlFor="material">Material</label>
                        <select
                            className="form-select"
                            aria-label="default select"
                            id="material"
                            name="material"
                            onChange={handleChangeMaterial}
                            value={selectMaterial}
                            disabled={!haveData}
                        >
                            <option value="ALL">-- ALL --</option>
                            {material.map((item, index) => {
                                return (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    {/* Select Size */}
                    <div className="col-2">
                        <label htmlFor="size">Size</label>
                        <select
                            className="form-select"
                            aria-label="default select"
                            id="size"
                            name="size"
                            onChange={handleChangeSize}
                            value={selectSize}
                            disabled={!haveData}
                        >
                            <option value="ALL">-- ALL --</option>
                            {size.map((item, index) => {
                                return (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    {/* Select Part */}
                    <div className="col-2">
                        <label htmlFor="part">Part</label>
                        <select
                            className="form-select"
                            aria-label="default select"
                            id="part"
                            name="part"
                            onChange={handlechangePart}
                            value={selectPart}
                            disabled={!haveData}
                        >
                            <option value="ALL">-- ALL --</option>
                            {part.map((item, index) => {
                                return (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    {/* Select RP */}
                    <div className="col-2">
                        <label htmlFor="rp">RP</label>
                        <select
                            className="form-select"
                            aria-label="default select"
                            id="rp"
                            name="rp"
                            onChange={handleChangeRp}
                            value={selectRp}
                            disabled={!haveData}
                        >
                            <option value="ALL">-- ALL --</option>
                            {rp.map((item, index) => {
                                return (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    {/* Select Machine */}
                    <div className="col-2">
                        <label htmlFor="machine">Machine No.</label>
                        <select
                            className="form-select"
                            aria-label="default select"
                            id="machine"
                            name="machine"
                            onChange={handleChangeMachine}
                            value={selectMachine}
                            disabled={!haveData}
                        >
                            <option value="ALL">-- ALL --</option>
                            {machine.map((item, index) => {
                                return (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                );
                            })}
                        </select>
                    </div>

                    {/* Select graph% or graphQty or table */}
                    <div className="col-12 text-center">
                        <div className="btn-group pt-4" role="group" aria-label="Basic radio toggle button group">
                            <input
                                type="radio"
                                className="btn-check"
                                name="btnradio1"
                                id="btnradio1"
                                autoComplete="off"
                                checked={selectedOption === "graphPrecent"}
                                onChange={() => handleOptionChange("graphPrecent")}
                                disabled={!haveData}
                            />
                            <label className="btn btn-outline-primary" htmlFor="btnradio1">
                                Graph %
                            </label>
                            <input
                                type="radio"
                                className="btn-check"
                                name="btnradio2"
                                id="btnradio2"
                                autoComplete="off"
                                checked={selectedOption === "graphQty"}
                                onChange={() => handleOptionChange("graphQty")}
                                disabled={!haveData}
                            />
                            <label className="btn btn-outline-primary" htmlFor="btnradio2">
                                Graph Qty
                            </label>
                            <input
                                type="radio"
                                className="btn-check"
                                name="btnradio3"
                                id="btnradio3"
                                autoComplete="off"
                                checked={selectedOption === "graphBall"}
                                onChange={() => handleOptionChange("graphBall")}
                                disabled={!haveData}
                            />
                            <label className="btn btn-outline-primary" htmlFor="btnradio3">
                                Graph ball
                            </label>
                            <input
                                type="radio"
                                className="btn-check"
                                name="btnradio4"
                                id="btnradio4"
                                autoComplete="off"
                                checked={selectedOption === "dataTable"}
                                onChange={() => handleOptionChange("dataTable")}
                                disabled={!haveData}
                            />
                            <label className="btn btn-outline-primary" htmlFor="btnradio4">
                                Data Table
                            </label>
                        </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-sm-12">
                        <div className="card h-100">
                            {loading ? (
                                <div class="d-flex justify-content-center m-5">
                                    <div class="spinner-border" role="status">
                                        <span class="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    {!haveData ? (
                                        <div class="d-flex justify-content-center m-5">
                                            <div className="h4">NO DATA</div>
                                        </div>
                                    ) : (
                                        <>
                                            {selectedOption === "graphPrecent" ? (
                                                <div className="card-body">
                                                    <div id="chart">
                                                        <ReactApexChart
                                                            options={{
                                                                chart: {
                                                                    type: "bar",
                                                                    height: 350,
                                                                    stacked: true,
                                                                    stackType: "100%",
                                                                },
                                                                stroke: {
                                                                    width: 1,
                                                                    colors: ["#fff"],
                                                                },
                                                                title: {
                                                                    text: "Usage ball",
                                                                },
                                                                xaxis: {
                                                                    categories: dataForChart.date,
                                                                    labels: {
                                                                        formatter: (val) => {
                                                                            return new Date(val).toLocaleDateString("en-US", {
                                                                                day: "numeric",
                                                                                month: "short",
                                                                            });
                                                                        },
                                                                    },
                                                                },
                                                                yaxis: {
                                                                    labels: {
                                                                        formatter: (val) => {
                                                                            return val + "%";
                                                                        },
                                                                    },
                                                                },
                                                                tooltip: {
                                                                    y: {
                                                                        formatter: (value) => {
                                                                            return value.toLocaleString() + "pcs";
                                                                        },
                                                                    },
                                                                },
                                                                fill: {
                                                                    opacity: 1,
                                                                },
                                                                legend: {
                                                                    position: "top",
                                                                    horizontalAlign: "left",
                                                                    offsetX: 40,
                                                                },
                                                            }}
                                                            series={dataForChart.result}
                                                            type="bar"
                                                            height={550}
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                            {selectedOption === "graphQty" ? (
                                                <div className="card-body">
                                                    <div id="chart">
                                                        <ReactApexChart
                                                            options={{
                                                                chart: {
                                                                    type: "bar",
                                                                    height: 350,
                                                                    stacked: true,
                                                                },
                                                                stroke: {
                                                                    width: 1,
                                                                    colors: ["#fff"],
                                                                },
                                                                title: {
                                                                    text: "Usage ball",
                                                                },
                                                                dataLabels: {
                                                                    formatter: (val) => {
                                                                        return (val / 1000).toFixed(1) + "k";
                                                                    },
                                                                },
                                                                plotOptions: {
                                                                    bar: {
                                                                        horizontal: false,
                                                                        dataLabels: {
                                                                            total: {
                                                                                enabled: true,
                                                                                style: {
                                                                                    fontSize: "13px",
                                                                                },
                                                                            },
                                                                        },
                                                                    },
                                                                },
                                                                xaxis: {
                                                                    categories: dataForChart.date,
                                                                    labels: {
                                                                        formatter: (val) => {
                                                                            return new Date(val).toLocaleDateString("en-US", {
                                                                                day: "numeric",
                                                                                month: "short",
                                                                            });
                                                                        },
                                                                    },
                                                                },
                                                                yaxis: {
                                                                    labels: {
                                                                        formatter: (val) => {
                                                                            return (val / 1000).toLocaleString() + "k";
                                                                        },
                                                                    },
                                                                },
                                                                tooltip: {
                                                                    y: {
                                                                        formatter: (value) => {
                                                                            return value.toLocaleString() + "pcs";
                                                                        },
                                                                    },
                                                                },
                                                                fill: {
                                                                    opacity: 1,
                                                                },
                                                                legend: {
                                                                    position: "top",
                                                                    horizontalAlign: "left",
                                                                    offsetX: 40,
                                                                },
                                                            }}
                                                            series={dataForChart.result}
                                                            type="bar"
                                                            height={550}
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                            {selectedOption === "graphBall" ? (
                                                <div className="card-body">
                                                    <div id="chart">
                                                        <ReactApexChart
                                                            options={{
                                                                chart: {
                                                                    type: "bar",
                                                                    height: 350,
                                                                    stacked: true,
                                                                },
                                                                stroke: {
                                                                    width: 1,
                                                                    colors: ["#fff"],
                                                                },
                                                                title: {
                                                                    text: "Usage ball",
                                                                },
                                                                dataLabels: {
                                                                    formatter: (val) => {
                                                                        return (val / 1000).toFixed(1) + "k";
                                                                    },
                                                                },
                                                                plotOptions: {
                                                                    bar: {
                                                                        horizontal: false,
                                                                        dataLabels: {
                                                                            total: {
                                                                                enabled: true,
                                                                                style: {
                                                                                    fontSize: "13px",
                                                                                },
                                                                            },
                                                                        },
                                                                    },
                                                                },
                                                                xaxis: {
                                                                    categories: dataForChartBall.ball,
                                                                },
                                                                yaxis: {
                                                                    labels: {
                                                                        formatter: (val) => {
                                                                            return (val / 1000).toLocaleString() + "k";
                                                                        },
                                                                    },
                                                                },
                                                                tooltip: {
                                                                    y: {
                                                                        formatter: (value) => {
                                                                            return value.toLocaleString() + "pcs";
                                                                        },
                                                                    },
                                                                },
                                                                fill: {
                                                                    opacity: 1,
                                                                },
                                                                legend: {
                                                                    position: "top",
                                                                    horizontalAlign: "left",
                                                                    offsetX: 40,
                                                                },
                                                            }}
                                                            series={dataForChartBall.result}
                                                            type="bar"
                                                            height={550}
                                                        />
                                                    </div>
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                            {selectedOption === "dataTable" ? (
                                                <div className="card-body">
                                                    <DataTable
                                                        columns={columns}
                                                        data={dataForTable}
                                                        conditionalRowStyles={conditionalRowStyles}
                                                        highlightOnHover
                                                        striped
                                                        pagination
                                                    />
                                                </div>
                                            ) : (
                                                ""
                                            )}
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
