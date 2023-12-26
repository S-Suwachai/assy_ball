import moment from "moment/moment";
import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import { httpClient } from "../utils/httpClients";
import { BsClock } from "react-icons/bs";
import { BsBarChartLine } from "react-icons/bs";
import { BsBox2 } from "react-icons/bs";
import { FaUserClock } from "react-icons/fa6";
import axios from "axios";

function Realtime_total() {
    const [dateToday, setDateToday] = useState(moment().format("YYYY-MM-DD"));
    const [listMCNo, setListMCNo] = useState([]);
    const [dataChart, setDataChart] = useState([]);
    const [totalprod, setTotalProd] = useState(0);
    const [totalYield, setTotalYield] = useState(0);
    const [avgCycleTime, setAvgCycleTime] = useState(0);
    const [timeGroup, setTimeGroup] = useState([]);
    const [timeGroupValue, setTimeGroupValue] = useState([]);
    const [selectMachine, setSelectMachine] = useState("ALL");
    const [capacity, setCapacity] = useState(0);

    const fetchData = async (dateToday, selectMachine) => {
        if (!selectMachine) {
            selectMachine = "ALL";
        }

        try {
            const dataFromRealTimeProd = await httpClient.post(
                `api_nmb_assy_prod/realtime_prod`, { datequery: dateToday, machinequery: selectMachine }
            );

            const dataFromRealTimeProdTime = await httpClient.post(
                `api_nmb_assy_prod/realtime_prod_time`, { datequery: dateToday, machinequery: selectMachine }
            );

            setDataChart(dataFromRealTimeProd.data.dataForChart);
            setListMCNo(dataFromRealTimeProd.data.machineNumberForSelect);
            

            let prodOk = dataFromRealTimeProd.data.totalProdOk.reduce(
                (accum, value) => {
                    return accum + value;
                }
            );
            let prodNg = dataFromRealTimeProd.data.totalProdNg.reduce(
                (accum, value) => {
                    return accum + value;
                }
            );

            setTotalProd(prodOk + prodNg);
            setTotalYield(
                (prodOk / (prodOk + prodNg)).toLocaleString(undefined, {
                    style: "percent",
                    maximumFractionDigits: 2,
                })
            );

            let calSumCycleTime = dataFromRealTimeProd.data.cycleTime.reduce(
                (accum, value) => {
                    return accum + value;
                }
            );
            let CalCycleTimeLength = dataFromRealTimeProd.data.cycleTime.length;

            setAvgCycleTime(
                (calSumCycleTime / CalCycleTimeLength).toLocaleString(
                    undefined,
                    { maximumFractionDigits: 2 }
                )
            );

            setCapacity(dataFromRealTimeProd.data.capacity.reduce((accum, value) => {
                return accum + value;
            }));

            setTimeGroup(
                dataFromRealTimeProdTime.data.dataDiffTime.map(
                    (item) => item.time
                )
            );

            setTimeGroupValue(
                dataFromRealTimeProdTime.data.dataDiffTime.map(
                    (item) => item.totalProdDiff
                )
            );


        } catch (error) {
            console.log("Error fetching data : ", error);
        }
    };

    useEffect(() => {
        fetchData(dateToday);

        const fetchDataInerval = setInterval(() => {
            fetchData(dateToday);
        }, 30000);

        return () => {
            clearInterval(fetchDataInerval);
        };
    }, [dateToday]);

    const handleChangeDate = (e) => {
        setDateToday(e.target.value);
        fetchData(e.target.value, selectMachine);
    };

    const handleSelectMachine = (e) => {
        setSelectMachine(e.target.value);
        fetchData(dateToday, e.target.value);
    };

    return (
        <main className="content bg-light">
            <div className="container-fluid p-3">
                <div className="row">
                    {/* Head title */}
                    <div className="col">
                        <h1 className="h3">
                            <strong>AGL</strong> Dashboard Real time
                        </h1>
                    </div>

                    {/* Select date */}
                    <div className="col-2">
                        <input
                            className="form-control"
                            type="date"
                            value={dateToday}
                            onChange={handleChangeDate}
                        />
                    </div>

                    {/* Select machine */}
                    <div className="col-2">
                        <select
                            className="form-select"
                            aria-label="default select"
                            id="label-machine"
                            onChange={handleSelectMachine}
                            value={selectMachine}
                        >
                            <option value="ALL">ALL</option>
                            {listMCNo.map((item, index) => {
                                return (
                                    <option key={index} value={item}>
                                        {item}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                </div>

                <div className="w-100">
                    <div className="row mt-1">
                        {/* Total Production */}
                        <div className="col-sm-3">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col mt-0">
                                            <h5 className="card-title">
                                                Production
                                            </h5>
                                        </div>

                                        <div className="col-auto">
                                            <div className="stat text-primary">
                                                <i
                                                    className="align-middle"
                                                    data-feater="truck"
                                                >
                                                    <BsBox2 size={40} />
                                                </i>
                                            </div>
                                        </div>
                                    </div>
                                    <h1 className="mt-1 mb-3">
                                        {totalprod.toLocaleString()}
                                    </h1>
                                    <div className="progress">
                                        <div
                                            className="progress-bar"
                                            style={{ width: `${totalprod/capacity*100}%` }}
                                        >
                                            {totalprod.toLocaleString()}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Cycletime average */}
                        <div className="col-sm-3">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col mt-0">
                                            <h5 className="card-title">
                                                Cycle time average
                                            </h5>
                                        </div>

                                        <div className="col-auto">
                                            <div className="stat text-primary">
                                                <i
                                                    className="align-middle"
                                                    data-feater="truck"
                                                >
                                                    <BsClock size={40} />
                                                </i>
                                            </div>
                                        </div>
                                    </div>
                                    <h1 className="mt-1">{avgCycleTime}s</h1>
                                </div>
                            </div>
                        </div>

                        {/* Total Yield */}
                        <div className="col-sm-3">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col mt-0">
                                            <h5 className="card-title">
                                                Yield
                                            </h5>
                                        </div>

                                        <div className="col-auto">
                                            <div className="stat text-primary">
                                                <i
                                                    className="align-middle"
                                                    data-feater="truck"
                                                >
                                                    <BsBarChartLine size={40} />
                                                </i>
                                            </div>
                                        </div>
                                    </div>
                                    <h1 className="mt-1 mb-3">{totalYield}</h1>
                                    <div className="progress">
                                        <div
                                            className="progress-bar bg-success"
                                            style={{ width: totalYield }}
                                        >
                                            {totalYield}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Total lost time */}
                        <div className="col-sm-3">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col mt-0">
                                            <h5 className="card-title">
                                                Lost time
                                            </h5>
                                        </div>

                                        <div className="col-auto">
                                            <div className="stat text-primary">
                                                <i
                                                    className="align-middle"
                                                    data-feater="truck"
                                                >
                                                    <FaUserClock size={40} />
                                                </i>
                                            </div>
                                        </div>
                                    </div>
                                    <h1 className="mt-1 mb-3">10.0hr</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                        {/* Graph Utilization */}
                        <div className="col-sm-3">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">Utilization</h5>
                                    <div id="chart">
                                        <ReactApexChart
                                            options={{
                                                chart: {
                                                    type: "donut",
                                                },
                                                responsive: [
                                                    {
                                                        breakpoint: 480,
                                                        options: {
                                                            chart: {
                                                                width: 200,
                                                            },
                                                            legend: {
                                                                position:
                                                                    "bottom",
                                                            },
                                                        },
                                                    },
                                                ],
                                            }}
                                            series={[44, 55, 41, 17, 15]}
                                            type="donut"
                                            height={200}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Graph Production by machine */}
                        <div className="col-sm-9">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Production by machine
                                    </h5>
                                    <div id="chart">
                                        <ReactApexChart
                                            options={{
                                                chart: {
                                                    type: "bar",
                                                    height: 350,
                                                    stacked: true,
                                                    toolbar: {
                                                        show: true,
                                                    },
                                                    zoom: {
                                                        enabled: true,
                                                    },
                                                },
                                                responsive: [
                                                    {
                                                        breakpoint: 480,
                                                        options: {
                                                            legend: {
                                                                position:
                                                                    "bottom",
                                                                offsetX: -10,
                                                                offsetY: 0,
                                                            },
                                                        },
                                                    },
                                                ],
                                                plotOptions: {
                                                    bar: {
                                                        horizontal: false,
                                                        borderRadius: 0,
                                                        dataLabels: {
                                                            total: {
                                                                enabled: true,
                                                                style: {
                                                                    fontSize:
                                                                        "13px",
                                                                    fontWeight: 900,
                                                                },
                                                            },
                                                        },
                                                    },
                                                },
                                                xaxis: {
                                                    type: "category",
                                                    categories: listMCNo,
                                                },
                                                legend: {
                                                    position: "right",
                                                    offsetY: 40,
                                                    fontSize: "12px",
                                                },
                                                fill: {
                                                    opacity: 1,
                                                },
                                            }}
                                            series={dataChart}
                                            type="bar"
                                            height={200}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-3">
                        {/* Graph Production by time */}
                        <div className="col-sm-12">
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        Production by time (pcs)
                                    </h5>
                                    <div id="chart">
                                        <ReactApexChart
                                            options={{
                                                chart: {
                                                    height: 350,
                                                    type: "line",
                                                    zoom: {
                                                        enabled: false,
                                                    },
                                                },
                                                dataLabels: {
                                                    enabled: false,
                                                },
                                                stroke: {
                                                    curve: "straight",
                                                },
                                                grid: {
                                                    row: {
                                                        colors: [
                                                            "#f3f3f3",
                                                            "transparent",
                                                        ],
                                                        opacity: 0.5,
                                                    },
                                                },
                                                xaxis: {
                                                    categories: timeGroup,
                                                },
                                            }}
                                            series={[
                                                {
                                                    name: "Production",
                                                    data: timeGroupValue,
                                                },
                                            ]}
                                            height={250}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Realtime_total;
