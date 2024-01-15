import React from "react";
import ReactApexCharts from "react-apexcharts";
import { httpClient } from "../../../../utils/HttpClient";
import { server } from "../../../../constance/contance";
import moment from "moment";
import Swal from "sweetalert2";
import { Hourglass } from "react-loader-spinner";

class Chart_ball_usage_day extends React.Component {
  constructor(props) {
    super(props);
    // this.tick = this.tick.bind(this);
    // this.state = { seconds: props.seconds };

    this.state = {
      // series: [
      //   {
      //     name: "BALL SIZE -5.0",
      //     data: [
      //       0, 0, 0, 0, 0, 1554, 15030, 4980, 22590, 18648, 2430, 6822, 3264,
      //       25956, 2742, 25767, 0, 0, 0, 0, 0, 0,
      //     ],
      //   },
      //   {
      //     name: "BALL SIZE -2.5",
      //     data: [
      //       94572, 307902, 86442, 106524, 139356, 71286, 267414, 97746, 166968,
      //       196320, 53460, 93654, 103272, 217188, 46062, 155904, 31260, 53088,
      //       30828, 23718, 94434, 89640,
      //     ],
      //   },
      //   {
      //     name: "BALL SIZE 0.0",
      //     data: [
      //       556212, 514926, 640260, 551790, 298968, 534144, 438714, 413460,
      //       443034, 495060, 394608, 320466, 392304, 335748, 370428, 520219,
      //       228564, 295134, 182532, 329784, 366774, 379962,
      //     ],
      //   },
      //   {
      //     name: "BALL SIZE +2.5",
      //     data: [
      //       191610, 34020, 143286, 120252, 63996, 213120, 63240, 335274, 232812,
      //       220548, 244230, 351126, 234048, 143694, 323094, 371140, 126150,
      //       169056, 116190, 169860, 76338, 132654,
      //     ],
      //   },
      //   {
      //     name: "BALL SIZE +5.0",
      //     data: [
      //       0, 0, 0, 0, 0, 2046, 1170, 34794, 17292, 13416, 40734, 61830, 11112,
      //       20034, 18924, 54971, 0, 0, 0, 0, 0, 0,
      //     ],
      //   },
      // ],

      mcno: [],
      ballUsage: [],
      count_mc: 0,
      DateBall: [],
      list_process: [],
      process: "",
      list_size_part: [],
      size_part: "",
      list_type_part: [],
      type_part: "",
      seconds: "1200",
      loading: "on",
      datetoday: moment().format("YYYY-MM-DD"),
    };
  }
  loadingScreen() {
    if (this.state.loading === "on") {
      return (
        <div className="overlay">
          {/* <img src="dist/img/dots-loading.gif" style={{maxWidth: "45px"}} /> */}

          <Hourglass
            visible={true}
            height="80"
            width="80"
            ariaLabel="hourglass-loading"
            wrapperStyle={{}}
            wrapperClass=""
            colors={["#306cce", "#72a1ed"]}
          />
        </div>
      );
    }
  }
  tick() {
    if (this.state.seconds > 0) {
      this.setState({ seconds: this.state.seconds - 1 });
    } else {
      clearInterval(this.timer);
      window.location.reload();
    }
  }
  componentDidMount = async () => {
    // console.log("hjh");
    await this.get_master_process();
    await this.get_master_size();
    await this.Click_value_ball_size();
    // this.timer = setInterval(this.tick, 1000);
    // console.log(moment('2019-11-03T05:00:00.000Z').utc().format('HH:mm'))
    // console.log("end");
  };
  Click_value_ball_size = async () => {
    console.log(
      "click  process =>",
      this.state.process,
      this.state.type_part,
      this.state.size_part
    );
    // console.log("click size => ", this.state.size_part, this.state.type_part);
    if (this.state.process === "MA") {
      console.log("click MA");
      const array = await httpClient.post(
        server.realtime_MBRC_Ball_Size_MA +
          "/" +
          moment().format("YYYY-MM-DD") +
          "/" +
          moment().format("YYYY-MM-DD"),
        { size: this.state.size_part, type: this.state.type_part }
      );
      // console.log("=====", array.data.result[1]);
      // console.log(array.data.resultBall[0].data.length);
      // console.log(array.data);
      if (array.data.result === "NO DATA") { //check type
        Swal.fire({
          icon: "warning",
          title: "ไม่พบข้อมูล ", //Type : "+ this.state.type_part +" และ Size : "+this.state.type_part,
          text:
            "Type : " +
            this.state.type_part +
            " และ Size : " +
            this.state.size_part,
          showConfirmButton: false,
          timer: 1800,
        });
        await this.clear_state();
        // window.location.reload();
      } else {
        console.log("click MA");
        if (array.data.result[1] === 0) {
          Swal.fire({
            icon: "warning",
            title: "ไม่พบข้อมูล ", //Type : "+ this.state.type_part +" และ Size : "+this.state.type_part,
            text:
              "Type : " +
              this.state.type_part +
              " และ Size : " +
              this.state.size_part,
            showConfirmButton: false,
            timer: 1800,
          });
          await this.clear_state();
        } else {
        // console.log("array.data.resultBall", array.data.resultBall);
        // await new Promise((accept) =>
        this.setState(
          {
            ballUsage: array.data.resultBall,
            count_mc: array.data.result[1],
            mcno: array.data.result_mcname,
            DateBall: array.data.resultDateBall,
          }
          // ,
          //     accept
        );
      }
    }
    } else {
      console.log(
        "else process MD",
        this.state.process,
        this.state.type_part,
        this.state.size_part
      );

      // console.log("click MD");
      const array = await httpClient.post(
        server.realtime_MBRC_Ball_Size_MD +
          "/" +
          moment().format("YYYY-MM-DD") +
          "/" +
          moment().format("YYYY-MM-DD"),
        { size: this.state.size_part, type: this.state.type_part }
      );
      // console.log(array.data);
      // console.log("=====", array.data.result[1]);
      // console.log(array.data.resultBall[0].data.length);
      if (array.data.result === "NO DATA") {
        Swal.fire({
          icon: "warning",
          title: "ไม่พบข้อมูล ", //Type : "+ this.state.type_part +" และ Size : "+this.state.type_part,
          text:
            "Type : " +
            this.state.type_part +
            " และ Size : " +
            this.state.size_part,
          showConfirmButton: false,
          timer: 1800,
        });
        await this.clear_state();
        // window.location.reload();
      } else {
        // console.log("else MD", array.data.resultBall);
        // let listUsageBall = array.data.resultBall;
        if (array.data.result[1] === 0) {
          Swal.fire({
            icon: "warning",
            title: "ไม่พบข้อมูล ", //Type : "+ this.state.type_part +" และ Size : "+this.state.type_part,
            text:
              "Type : " +
              this.state.type_part +
              " และ Size : " +
              this.state.size_part,
            showConfirmButton: false,
            timer: 1800,
          });
          await this.clear_state();
        } else {
        // console.log("array.data.result[1]", array.data.result[1]);
        // await new Promise((accept) =>
        this.setState(
          {
            ballUsage: array.data.resultBall,
            count_mc: array.data.result[1],
            mcno: array.data.result_mcname,
            DateBall: array.data.resultDateBall,
          }
          // ,
          //     accept
        );
      }
    }
    }

    setTimeout(
      function () {
        //Start the timer
        this.Click_value_ball_size();
      }.bind(this),
      600000 //10 min
    );
  };

  clear_state = () => {
    this.setState({
      mcno: [],
      ballUsage: [],
      count_mc: 0,
      // type_part: "",
    }); // clear state
  };
  get_master_process = async () => {
    const array = await httpClient.get(server.master_process);
    // console.log(array.data.result[0].process);
    await this.setState({
      list_process: array.data.result,
      process: array.data.result[0].process,
    });
    await this.get_master_type(array.data.result[0].process);
    await this.get_master_size(array.data.result[0].process);
    // console.log(this.state.process);
  };

  get_master_size = async (aa) => {
    console.log("get_master_size", aa, this.state.process);
    const array = await httpClient.post(server.master_size, {
      process: this.state.process,
    });
    // console.log("---- llllll ----");
    // console.log(array.data);

    await new Promise((accept) =>
      this.setState(
        {
          list_size_part: array.data.result_size,
          size_part: array.data.result_size[0].size,
        },
        accept
      )
    );
    // console.log("end size");
    // return this.state.first_size
  };

  get_master_type = async (aa) => {
    console.log("m type", aa, this.state.process);
    const array = await httpClient.post(server.master_type, {
      process: aa, //this.state.process,
    });
    // console.log("--------------");
    // console.log(array.data.result_type);
    await new Promise((accept) =>
      this.setState(
        {
          list_type_part: array.data.result_type,
          type_part: array.data.result_type[0].type,
        },
        accept
      )
    );
  };
  renderOption_process = () => {
    try {
      if (this.state.list_process !== null) {
        const myResult = this.state.list_process;
        return myResult.map((item) => <option>{item.process}</option>);
      }
    } catch (error) {}
  };
  renderOption_size_part = () => {
    try {
      if (this.state.list_size_part !== null) {
        const myResult = this.state.list_size_part;
        return myResult.map((item) => <option>{item.size}</option>);
      }
    } catch (error) {}
  };
  renderOption_type_part = () => {
    try {
      if (this.state.list_type_part !== null) {
        const myResult = this.state.list_type_part;
        return myResult.map((item) => <option>{item.type}</option>);
      }
    } catch (error) {}
  };

  render() {
    //Ball
    return (
            <div className="row-12">
            <div className="card">
                <div
                  className="card-header"
                  style={{
                    marginBottom: "0",
                    fontWeight: 600,
                    fontSize: "2rem",
                  }}
                >
                  {/* Total: Ball usage (%) */}
                  {this.state.datetoday} : Realtime Ball usage (%) by Machine
                </div>
                <div className="card-body">
                <div
                  className="row justify-content-center"
                  style={{ textAlign: "center", paddingBottom: "10px" }}
                >
                  <div class="col-auto">
                    <h5 style={{ paddingTop: "6px" }}>Process :</h5>
                  </div>
                  <div class="col-2">
                    <select
                      value={this.state.process}
                      className="form-control"
                      onChange={async (e) => {
                        await this.setState({ process: e.target.value });
                        await this.get_master_type(this.state.process);
                        await this.get_master_size(this.state.process);
                      }}
                    >
                      {this.renderOption_process()}
                    </select>
                  </div>
                  <div class="col-1">
                    <h5>Type :</h5>
                  </div>
                  <div class="col-1">
                    <select
                      value={this.state.type_part}
                      className="form-control"
                      onChange={(e) => {
                        this.setState({ type_part: e.target.value });
                      }}
                    >
                      {this.renderOption_type_part()}
                    </select>
                  </div>
                  <div class="col-1">
                    <h5>Size :</h5>
                  </div>
                  <div class="col-2">
                    <select
                      value={this.state.size_part}
                      className="form-control"
                      onChange={(e) => {
                        this.setState({ size_part: e.target.value });
                      }}
                    >
                      {this.renderOption_size_part()}
                    </select>
                  </div>

                  <div className="col-1">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={async (e) => {
                        // await this.clear_state();
                        e.preventDefault();
                        await this.Click_value_ball_size();
                        // console.log(this.state.process,this.state.type_part,this.state.size_part)
                      }}
                    >
                      submit
                    </button>
                  </div>
                  <b
                    className="col-auto"
                    style={{ color: "red", paddingTop: "0px" }}
                  >
                    ( Online: {this.state.count_mc} M/C ) 
                    {/* <br/> Data at time :                    */}
                    </b>
                </div>

                <div id="chart">
                  {/* <div className="overlay-wrapper"> */}
                    {/* {this.loadingScreen()} */}
                    <ReactApexCharts
                      options={{
                        chart: {
                          type: "bar",
                          height: 400,
                          stacked: true,
                          stackType: "100%",
                        },
                        plotOptions: {
                          bar: {
                            horizontal: true,
                            // horizontal: false,
                          },
                        },
                        stroke: {
                          width: 1,
                          colors: ["#fff"],
                        },
                        // title: {
                        //   text: "Data for date : " + this.state.datetoday,
                        //   style: {
                        //     fontSize: '30px',
                        //     // fontWeight: 900
                        //   }
                        // },
                        xaxis: {
                          categories: this.state.mcno,
                        },
                        yaxis: [
                          {
                            labels: {
                              style: {
                                colors: "black",
                                fontSize: "20px",
                                fontWeight: "bold",
                              },
                            },
                          },
                        ],
                        dataLabels: {
                          enabled: true,
                          position: "center",
                          style: {
                            fontSize: "20px",
                            fontWeight: "bold",
                          },
                        },
                        tooltip: {
                          y: {
                            formatter: function (val) {
                              return val + "pcs";
                            },
                          },
                        },
                        fill: {
                          opacity: 1,
                        },
                        colors: [
                          "#A5978B",
                          "#F9C80E",
                          "#546E7A",
                          "#EA3546",
                          "#13d8aa",
                        ],
                        legend: {
                          horizontalAlign: "center",
                          floating: false,
                          fontSize: "20px",
                          fontFamily: "Helvetica, Arial",
                          position: "right",
                          offsetX: -20,
                          offsetY: 10,
                          formatter: function (seriesName) {
                            return seriesName;
                          },
                        },
                      }}
                      series={this.state.ballUsage}
                      type="bar"
                      height={500}
                    />
                  {/* </div> */}
                </div>
              </div>
              </div>
            </div>
    );
  }
}

export default Chart_ball_usage_day;
