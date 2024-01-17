import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import moment from "moment";
import Swal from "sweetalert2";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";

export default function UsageBallDaily() {
    const [startDate, setStartDate] = useState(moment().startOf("month").format("YYYY-MM-DD"));
    const [endDate, setEndDate] = useState(moment().endOf("month").format("YYYY-MM-DD"));
    const [selectMaterial, setSelectMaterial] = useState();
    const [selectSize, setSelectSize] = useState();
    const [selectPart, setSelectPart] = useState();
    const [selectMcNo, setSelectMcNo] = useState();

    const [dataForChart, setDataForChart] = useState([]);
    const [dataForTable, setDataForTable] = useState([]);
    const [dataForChartBall, setDataForChartBall] = useState([]);
    const [dataForChartPart, setDataForChartPart] = useState([]);
    const [dataForChartMcNo, setDataForChartMcNo] = useState([]);
    const [material, setMaterial] = useState([]);
    const [size, setSize] = useState([]);
    const [part, setPart] = useState([]);
    const [mcNo, setMcNo] = useState([]);

    // Render state
    const [loading, setLoading] = useState(false);
    const [haveData, setHaveData] = useState(false);

    const handleChangeStartDate = (e) => {
        setStartDate(e.target.value);
    };
    const handleChangeEndDate = (e) => {
        setEndDate(e.target.value);
    };
    const handleChangeMaterial = (e) => {
        setSelectMaterial(e.target.value);
        if (selectSize !== "ALL" || selectPart !== "ALL" || selectMcNo !== "ALL") {
            setSelectSize("ALL");
            setSelectPart("ALL");
            setSelectMcNo("ALL");
        }
    };
    const handleChangeSize = (e) => {
        setSelectSize(e.target.value);
        if (selectPart !== "ALL" || selectMcNo !== "ALL") {
            setSelectPart("ALL");
            setSelectMcNo("ALL");
        }
    };
    const handleChangePart = (e) => {
        setSelectPart(e.target.value);
        if (selectMcNo !== "ALL") {
            setSelectMcNo("ALL");
        }
    };
    const handleChangeMcNo = (e) => {
        setSelectMcNo(e.target.value);
    };
    const onClickSubmit = () => {
        fetchData();
    };

    const getDataForSql = async () => {
        // const resultFromSql = await axios.post("http://192.168.100.20:4000/assy/ball/assyBall", {
        const resultFromSql = await axios.post("http://localhost:4000/assy/ball/assyBall", {
            startDateQuery: startDate,
            endDateQuery: endDate,
            materialQuery: selectMaterial,
            partQuery: selectPart,
            sizeQuery: selectSize,
            machineQuery: selectMcNo,
        });

        // function จัด format วันที่
        const formatDate = (date) => {
            return new Date(date).toLocaleDateString("en-GB", { year: "numeric", month: "short", day: "numeric" }).replace(/ /g, "-");
        };

        if (resultFromSql.data.result === "NO DATA") {
            setLoading(false);
            Swal.fire({
                title: "ไม่มีข้อมูล",
                text: `ไม่มีข้อมูลวันที่ ${formatDate(startDate)} ถึงวันที่ ${formatDate(endDate)}`,
                icon: "warning",
            });
        } else {
            setDataForChart(resultFromSql.data.dataForChartDateShow);
            setDataForTable(resultFromSql.data.dataForTable);
            setDataForChartBall(resultFromSql.data.dataForChartBall);
            setDataForChartPart(resultFromSql.data.dataForChartPart);
            setDataForChartMcNo(resultFromSql.data.dataForChartMcNo);
            setMaterial(resultFromSql.data.materialSelect);
            setSize(resultFromSql.data.ballSelect);
            setPart(resultFromSql.data.partSelect);
            setMcNo(resultFromSql.data.mcNoSelect);

            console.log(resultFromSql.data.dataForChartMcNo);
        }

        if (resultFromSql.data.dataForChartDateShow.date.length > 0) {
            setHaveData(true);
        } else {
            setHaveData(false);
        }
    };

    const fetchData = async () => {
        try {
            setLoading(true);
            await getDataForSql();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (selectMaterial || selectSize || selectPart || selectMcNo) {
            fetchData();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectMaterial, selectSize, selectPart, selectMcNo]);

    return (
        <div className="content-wrapper">
            <main className="content">
                <div className="container-fluid p-2">
                    <div className="row">
                        <div className="card h-100 w-100">
                            {/* Loading screen */}
                            {loading ? (
                                <div className="overlay">
                                    <RotatingLines
                                        visible={true}
                                        height="100"
                                        width="100"
                                        color="green"
                                        strokeWidth="4"
                                        animationDuration="1.0"
                                        ariaLabel="rotating-lines-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                    />
                                </div>
                            ) : (
                                ""
                            )}

                            <div className="card-header">
                                <div className="h5">Ball usage</div>
                            </div>
                            <div className="card-body">
                                {/* Select date */}
                                <div className="row justify-content-center mb-3">
                                    {/* Select start date */}
                                    <div className="col-auto">
                                        <label className="col-form-label" htmlFor="startDate">
                                            Start date :
                                        </label>
                                    </div>
                                    <div class="col-auto">
                                        <input class="form-control" type="date" id="startDate" value={startDate} onChange={handleChangeStartDate} />
                                    </div>

                                    {/* Select end date */}
                                    <div className="col-auto">
                                        <label className="col-form-label" htmlFor="endDate">
                                            End date :
                                        </label>
                                    </div>
                                    <div class="col-auto">
                                        <input class="form-control" type="date" id="endDate" value={endDate} onChange={handleChangeEndDate} />
                                    </div>
                                    {/* Button submit */}
                                    <div className="col-1 mx-4">
                                        <button type="button" class="btn btn-primary" onClick={onClickSubmit}>
                                            Submit
                                        </button>
                                    </div>
                                </div>

                                {/* Select detail */}
                                <div className="row justify-content-center mb-3">
                                    {/* Select material */}
                                    <div className="col-auto">
                                        <label className="col-form-label" htmlFor="material">
                                            Material :
                                        </label>
                                    </div>
                                    <div class="col-2">
                                        <select
                                            className="form-control"
                                            id="material"
                                            value={selectMaterial}
                                            onChange={handleChangeMaterial}
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

                                    {/* Select size */}
                                    <div className="col-auto">
                                        <label className="col-form-label" htmlFor="size">
                                            Size :
                                        </label>
                                    </div>
                                    <div class="col-2">
                                        <select
                                            className="form-control"
                                            id="size"
                                            value={selectSize}
                                            onChange={handleChangeSize}
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

                                    {/* Select part */}
                                    <div className="col-auto">
                                        <label className="col-form-label" htmlFor="part">
                                            Part No :
                                        </label>
                                    </div>
                                    <div class="col-2">
                                        <select
                                            className="form-control"
                                            id="part"
                                            value={selectPart}
                                            onChange={handleChangePart}
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

                                    {/* Select M/C no. */}
                                    <div className="col-auto">
                                        <label className="col-form-label" htmlFor="mcNo">
                                            M/C No :
                                        </label>
                                    </div>
                                    <div class="col-2">
                                        <select
                                            className="form-control"
                                            id="mcNo"
                                            value={selectMcNo}
                                            onChange={handleChangeMcNo}
                                            disabled={!haveData}
                                        >
                                            <option value="ALL">-- ALL --</option>
                                            {mcNo.map((item, index) => {
                                                return (
                                                    <option key={index} value={item}>
                                                        {item}
                                                    </option>
                                                );
                                            })}
                                        </select>
                                    </div>
                                </div>

                                <div className="page-content">
                                    {!haveData ? (
                                        <div class="d-flex justify-content-center m-5">
                                            <div className="h4">NO DATA</div>
                                        </div>
                                    ) : (
                                        <>
                                            {/* Chart usage ball percent */}
                                            <div className="row">
                                                <div className="col">
                                                    <div className="card">
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
                                                                        title: {
                                                                            text: "Usage ball %",
                                                                        },
                                                                        stroke: {
                                                                            width: 1,
                                                                            colors: ["#fff"],
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
                                                                            position: "right",
                                                                        },
                                                                    }}
                                                                    series={dataForChart.result}
                                                                    type="bar"
                                                                    height={250}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Chart usage ball Q'ty */}
                                            <div className="row">
                                                <div className="col">
                                                    <div className="card">
                                                        <div className="card-body">
                                                            <div id="chart">
                                                                <ReactApexChart
                                                                    options={{
                                                                        chart: {
                                                                            type: "bar",
                                                                            height: 350,
                                                                            stacked: true,
                                                                        },
                                                                        title: {
                                                                            text: "Usage ball Q'ty",
                                                                        },
                                                                        stroke: {
                                                                            width: 1,
                                                                            colors: ["#fff"],
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
                                                                            position: "right",
                                                                        },
                                                                    }}
                                                                    series={dataForChart.result}
                                                                    type="bar"
                                                                    height={250}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Chart percent by ball and part */}
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="card">
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
                                                                        title: {
                                                                            text: "Total usage ball by size",
                                                                        },
                                                                        stroke: {
                                                                            width: 1,
                                                                            colors: ["#fff"],
                                                                        },
                                                                        xaxis: {
                                                                            categories: dataForChartBall.ball,
                                                                        },
                                                                        colors: ["#134D9C", "#55BED7", "#F8A757", "#D877CF", "#50105A"],
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
                                                                            position: "right",
                                                                        },
                                                                    }}
                                                                    series={dataForChartBall.result}
                                                                    type="bar"
                                                                    height={250}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="card">
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
                                                                        title: {
                                                                            text: "Total usage ball by part",
                                                                        },
                                                                        stroke: {
                                                                            width: 1,
                                                                            colors: ["#fff"],
                                                                        },
                                                                        xaxis: {
                                                                            categories: dataForChartPart.part,
                                                                        },
                                                                        colors: ["#134D9C", "#55BED7", "#F8A757", "#D877CF", "#50105A"],
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
                                                                            position: "right",
                                                                        },
                                                                    }}
                                                                    series={dataForChartPart.result}
                                                                    type="bar"
                                                                    height={250}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Chart usage ball percent by M/C */}
                                            <div className="row">
                                                <div className="col">
                                                    <div className="card">
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
                                                                        title: {
                                                                            text: "Total usage ball by M/C",
                                                                        },
                                                                        stroke: {
                                                                            width: 1,
                                                                            colors: ["#fff"],
                                                                        },
                                                                        xaxis: {
                                                                            categories: dataForChartMcNo.mcNo,

                                                                        },
                                                                        colors: ["#134D9C", "#55BED7", "#F8A757", "#D877CF", "#50105A"],
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
                                                                            position: "right",
                                                                        },
                                                                    }}
                                                                    series={dataForChartMcNo.result}
                                                                    type="bar"
                                                                    height={250}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* table */}
                                            <div className="row">
                                                <div className="col">
                                                    <div className="card">
                                                        <div className="card-header">
                                                            <h3 className="card-title">
                                                                <strong>Table Usage ball</strong>
                                                            </h3>
                                                        </div>
                                                        <div className="card-body table-responsive p-0" style={{ height: 400 }}>
                                                            <table className="table table-head-fixed text-nowrap table-hover table-bordered">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Date</th>
                                                                        <th>Ball size</th>
                                                                        <th>M/C No.</th>
                                                                        <th>Part No.</th>
                                                                        <th>Ball +5.0 (Q'ty)</th>
                                                                        <th>Ball +2.5 (Q'ty)</th>
                                                                        <th>Ball 0.0 (Q'ty)</th>
                                                                        <th>Ball -2.5 (Q'ty)</th>
                                                                        <th>Ball -5.0 (Q'ty)</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {dataForTable.map((item, index) => {
                                                                        return (
                                                                            <tr
                                                                                key={index}
                                                                                className={
                                                                                    index === dataForTable.length - 1
                                                                                        ? "font-weight-bold table-warning"
                                                                                        : ""
                                                                                }
                                                                            >
                                                                                <td>{item.date}</td>
                                                                                <td>{item.ballSize}</td>
                                                                                <td>{item.machine}</td>
                                                                                <td>{item.partNo}</td>
                                                                                <td>{item.qty50.toLocaleString()}</td>
                                                                                <td>{item.qty25.toLocaleString()}</td>
                                                                                <td>{item.qty00.toLocaleString()}</td>
                                                                                <td>{item.qty_25.toLocaleString()}</td>
                                                                                <td>{item.qty_50.toLocaleString()}</td>
                                                                            </tr>
                                                                        );
                                                                    })}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
