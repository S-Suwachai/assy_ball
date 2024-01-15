import React, { Component } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import { httpClient } from "../../../utils/HttpClient";
import { server } from "../../../constance/contance";
import ReactApexChart from "react-apexcharts";
import "./MMS_MBRMD.css";

const MMS_MBRMD_ACCUM_PROD_TOTAL = () => {
  const [datas, setDatas] = useState({});
  const [dataProd, setDataProd] = useState("");
  const [dataMC, setMC] = useState("MBRMD");
  const [dataDate, setDate] = useState(moment().format("YYYY-MM-DD"));
  const [dataPD, setdataPD] = useState([]);
  const [dataMCNO, setdataMCNO] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [ScalMax, setScalMax] = useState([]);

  const getOutput_MBR_MD = async () => {
    // console.log("========= PD =========");
    // console.log("dataMC chart PD : ", dataMC);

    const array = await httpClient.post(
      server.realtime_chartPD_ACCUM_TOTAL_MBR_URL +
        "/" +
        dataDate +
        "/" +
        dataMC +
        "/" +
        moment().format("HH")
    );

    // console.log("ChartPD ==>", array.data.resultOutput_MBR);
    const listOutput_MBR_MD = array.data.result_data;
    const list_mc = array.data.result_mc;
    const list_data = array.data.result[0];
    const data_table = array.data.result_table;
    const prod_total = array.data.ProdTotal;
    const scal_max = array.data.scal_max;
    // console.log(data_table);
    setdataPD(listOutput_MBR_MD);
    setdataMCNO(list_mc);
    setDatas(list_data);
    setDataProd(prod_total);
    setScalMax(scal_max);

    try {
      if (Array.isArray(data_table) && data_table.length > 0) {
        const mappedData = data_table.map((item, index) => (
          <tr key={index}>
            <td>{item.mc_no}</td>
            <td>{item.model}</td>
            <td
              style={{
                color: item.dairy_ok > item.target ? "black" : "red",
              }}
            >
              {item.dairy_ok}
            </td>
            <td>{item.target}</td>
          </tr>
        ));

        // Set the mapped data to the state
        setTableData(mappedData);
      } else {
        // Return some message or null when data_table is not an array or is empty
        setTableData([
          <tr key="no-data">
            <td colSpan="3">No data available</td>
          </tr>,
        ]);
      }
    } catch (error) {
      // Handle the error or log it
      console.error("Error mapping over data_table:", error);
    }

    return array;
  };

  const MINUTE_MS = 5000;
  // const HOUR_MS = 300000; //5 min
  // const HOUR_MS = 3300000; //55 min
  const HOUR_MS = 900000; //15 min
  // const HOUR_MS = 1800000; //30 min

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Logs every 15 minute");
      getOutput_MBR_MD();
    }, [HOUR_MS]);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, [dataMC, dataDate]);

  useEffect(() => {
    getOutput_MBR_MD();
  }, [dataMC, dataDate]);

  ////////////////////////////////
  return (
    <div className="content-wrapper">
      <div className="content">
        {/* <div className="row" style={{ paddingTop: "15px" }}> */}
        {/* <div className="col-lg-12"> */}
        <h4 className="row justify-content-end">
          Date: {moment().format("YYYY-MM-DD")} {moment().format("HH:mm:ss")}
        </h4>

        <div
          className="row justify-content-center"
          style={{
            // paddingTop: "10px",
            textAlign: "center",
            paddingBottom: "10px",
          }}
        >
          <h5 className="col-auto">Date :</h5>
          <div className="col-2">
            <input
              class="form-control"
              type="date"
              value={dataDate}
              onChange={async (e) => {
                await setDate(moment(e.target.value).format("YYYY-MM-DD"));
              }}
            />
          </div>
          <h5 class="col-auto">Select M/C No. :</h5>
          <div class="col-2">
            <select
              className="custom-select"
              value={dataMC}
              onChange={async (e) => {
                await setMC(e.target.value);
              }}
            >
              <option disabled selected value="">
                select mc_no
              </option>
              <option value="MBRMA">MBR_MA</option>
              <option value="MBRMD">MBR_MD</option>
              <option value="MINIFFL">MINI_FFL</option>
            </select>
          </div>
          {/* <div className="col-1">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={submitValue}
            >
              submit
            </button>
          </div> */}
        </div>
        <div className="row justify-content-center">
          <h2>
            {dataMC} : <b>{dataProd}</b> (pcs)
          </h2>
        </div>
        <div
          className="row justify-content-center"
          style={{ paddingTop: "15px" }}
        >
          <div className="col-lg-12">
            <div class="card">
              <h3
                className="card-header"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr auto",
                  alignItems: "center",
                }}
              >
                Chart Production/ Yield / Target
                <span style={{ textAlign: "end", fontSize: "18px" }}>
                  Data at time : {datas.time}
                </span>
              </h3>

              <div class="card-body">
                <div id="chart">
                  <ReactApexChart
                    options={{
                      chart: {
                        height: 350,
                        type: "line",
                        stacked: false,
                      },
                      colors: [
                        "rgb(0, 143, 251)",
                        "#FF3B3B",
                        "#14D91A",
                        "#FF8ED6",
                        "#936BDE",
                        "#A73970",
                      ],

                      dataLabels: {
                        enabled: true,
                      },
                      stroke: {
                        width: [1, 4, 4],
                      },
                      xaxis: {
                        labels: {
                          rotate: -45,
                        },
                        categories: dataMCNO,
                      },
                      yaxis: [
                        {
                          axisTicks: {
                            show: true,
                          },
                          axisBorder: {
                            show: true,
                            color: "#008FFB",
                          },
                          labels: {
                            style: {
                              colors: "#008FFB",
                            },
                          },
                          title: {
                            text: "Production (pcs)",
                            style: {
                              color: "#008FFB",
                              fontSize: "18px",
                              fontWeight: 500,
                            },
                          },
                          tooltip: {
                            enabled: true,
                          },
                          // min: dataBox.scal_min,
                          max: ScalMax, //dataBox.scal_max,
                        },
                        {
                          axisTicks: {
                            show: false,
                          },
                          axisBorder: {
                            show: false,
                            color: "#FF3B3B",
                          },
                          labels: {
                            show: false,
                            style: {
                              colors: "#FF3B3B",
                            },
                          },
                          title: {
                            show: true,
                            text: "",
                            style: {
                              color: "#FF3B3B",
                              fontSize: "18px",
                              fontWeight: 500,
                            },
                          },
                          tooltip: {
                            enabled: true,
                          },
                          // min: dataBox.scal_min,
                          max: ScalMax, //dataBox.scal_max,
                        },
                        {
                          seriesName: "Yield rate",
                          opposite: true,
                          // min: dataBox.scal_min_YR,
                          // max: dataBox.scal_max_YR,
                          axisTicks: {
                            show: true,
                          },
                          axisBorder: {
                            show: true,
                            color: "#14D91A",
                          },
                          labels: {
                            style: {
                              colors: "#14D91A",
                            },
                          },
                          // title: {
                          //   text: "Yield Rate (%)",
                          //   style: {
                          //     show: true,
                          //     color: "#14D91A",
                          //     fontSize: "18px",
                          //     fontWeight: 500,
                          //   },
                          // },
                        },
                      ],
                      tooltip: {
                        fixed: {
                          enabled: false,
                          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
                          offsetY: 30,
                          offsetX: 60,
                        },
                      },
                      legend: {
                        horizontalAlign: "center",
                        offsetX: 40,
                      },
                    }}
                    series={dataPD}
                    type="line"
                    height={350}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row-12">
          <div className="card">
            <h3
              className="card-header"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr auto",
                alignItems: "center",
              }}
            >
              Total Production
              <span style={{ textAlign: "end", fontSize: "18px" }}>
                Data at time : {datas.time}
              </span>
            </h3>
            <div className="row justify-content-center">
              <div
                className="col-lg-7"
                style={{ paddingTop: "15px", paddingBottom: "15px" }}
              >
                <div
                  class="card-body table-responsive p-0"
                  style={{ height: "450px" }}
                >
                  <table
                    className="table table-head-fixed text-nowrap table-bordered table-hover"
                    id="tbreport"
                  >
                    <thead>
                      <tr>
                        <th style={{ backgroundColor: "#D2D2D2" }}>MC no</th>
                        <th style={{ backgroundColor: "#D2D2D2" }}>Model</th>
                        <th style={{ backgroundColor: "#D2D2D2" }}>
                          Production (pcs) time : {datas.time}
                        </th>
                        <th style={{ backgroundColor: "#D2D2D2" }}>
                          Target Production (pcs) time : {datas.time}
                        </th>
                      </tr>
                    </thead>
                    <tbody>{tableData}</tbody>
                  </table>
                </div>
                <small>
                  * If production less, then target production show message red.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MMS_MBRMD_ACCUM_PROD_TOTAL;
