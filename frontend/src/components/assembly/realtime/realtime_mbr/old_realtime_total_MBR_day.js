import React from "react";
// import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { httpClient } from "../../../../utils/HttpClient";
import { server } from "../../../../constance/contance";
import moment from "moment";
import { Hourglass } from "react-loader-spinner";
import Swal from "sweetalert2";
import Chart_ball_usage_day from "./chart_ball_usage_day";

class OLD_Realtime_total_MBR_day extends React.Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { seconds: props.seconds };

    this.state = {
      seconds: "1200",
      countitem: 0,
      yesterday: moment().subtract(1, "days").format("YYYY-MM-DD"),
      data_table: [],
      data_date: "",
      mcnoTB: "",
      DateBallTB: "",
      txt:
        "Amount of ball usage By Machine" +
        moment().add(-1, "days").format("YYYY-MM-DD"),
      loading: "on",
    };
  }

  componentDidMount = async () => {
    this.getOutput_ball_table();
  };

  tick() {
    if (this.state.seconds > 0) {
      this.setState({ seconds: this.state.seconds - 1 });
    } else {
      clearInterval(this.timer);
      window.location.reload();
    }
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
  getOutput_ball_table = async () => {
    console.log("cdccd", this.state.yesterday);
    const array = await httpClient.get(
      server.NEW_SERVER_realtime_MBRC_Ball_tb_URL + "/" + this.state.yesterday
    //   server.realtime_MBRC_Ball_tb_URL + "/" + this.state.yesterday
    );

    // console.log(array.data);
    // console.log(array.data.result[0][0].mfg_date);
    // console.log("length = >",array.data.result[1]);
    // console.log(this.state.start_date, this.state.end_date);

    
if (array.data.result[1] === 0) {
  Swal.fire({
    icon: "warning",
    title:
      "ไม่พบข้อมูล Date : " + this.state.yesterday ,
    showConfirmButton: false,
    timer: 1500,
  });
  this.setState({ loading:"off" })
} else {
    this.setState({
      data_table: array.data.result[0],
      countitem: array.data.result[0].length,
      data_date: array.data.result[0][0].mfg_date,
      loading: "off",
    });
    // console.log(array.data.result_mcname);
    // console.log(array.data.resultDateBall);
    let listUsageMC_name = array.data.result_mcname;
    this.setState({ mcnoTB: listUsageMC_name });
    let listDateBall = array.data.resultDateBall;
    this.setState({ DateBallTB: listDateBall });
  }
    setTimeout(
      function () {
        //Start the timer
        this.getOutput_ball_table();
      }.bind(this),
      600000 //10 min
    );
  };
  click_getOutput_ball_table = async () => {
    console.log("cdccd", this.state.yesterday);
    const array = await httpClient.get(
      server.realtime_MBRC_Ball_tb_URL + "/" + this.state.yesterday
    );

    // console.log(array.data);
    // console.log(array.data.result[0][0].mfg_date);
    // console.log("length = >",array.data.result[1]);
    // console.log(this.state.start_date, this.state.end_date);

    
if (array.data.result[1] === 0) {
  Swal.fire({
    icon: "warning",
    title:
      "ไม่พบข้อมูล Date : " + this.state.yesterday ,
    showConfirmButton: false,
    timer: 1500,
  });
  this.setState({ loading:"off" })
} else {
    this.setState({
      data_table: array.data.result[0],
      countitem: array.data.result[0].length,
      data_date: array.data.result[0][0].mfg_date,
      loading: "off",
    });
    // console.log(array.data.result_mcname);
    // console.log(array.data.resultDateBall);
    let listUsageMC_name = array.data.result_mcname;
    this.setState({ mcnoTB: listUsageMC_name });
    let listDateBall = array.data.resultDateBall;
    this.setState({ DateBallTB: listDateBall });
  }
    setTimeout(
      function () {
        //Start the timer
        this.click_getOutput_ball_table();
      }.bind(this),
      600000 //10 min
    );
  };
  clear_state = () => {
    this.setState({
      data_table: [],
      countitem: 0,
      loading: "on",
    }); // clear state
  };
  renderTableByMC = () => {
    try {
      if (this.state.data_table !== null) {
        // console.log(this.state.data_table);
        return this.state.data_table.map((item) => (
          <tr>
            <td>{item.mc_no}</td>
            <td>{item.model}</td>
            <td>{item.totalSize10}</td>
            <td>{item.totalSize20}</td>
            <td>{item.totalSize30}</td>
            <td>{item.totalSize40}</td>
            <td>{item.totalSize50}</td>
          </tr>
        ));
      }
    } catch (error) {}
  };
  render() {
    //Ball
    return (
      <div className="content-wrapper">
        <div className="content">
        <div className="row-12">
          <Chart_ball_usage_day/>
          </div>
          <div className="row-12">
            <div className="card">
              <h3 className="card-header">Amount of ball usage By Machine </h3>

              {/* <h5 className="card-title" style={{ color: "red", textAlign: "end" }}><b>( Total: {this.state.countitem} M/C )</b></h5> */}
              <div className="card-body">
                <div
                  className="row justify-content-center"
                  style={{ textAlign: "center", paddingBottom: "10px" }}
                >
                  <div class="col-auto">
                    <h5 style={{ paddingTop: "6px" }}>Date :</h5>
                  </div>
                  <div class="col-2">
                    <input
                      class="form-control"
                      type="date"
                      value={this.state.yesterday}
                      onChange={async (e) => {
                        await this.setState({
                          yesterday: moment(e.target.value).format(
                            "YYYY-MM-DD"
                          ),
                        });
                      }}
                    />
                  </div>

                  <div className="col-1">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={async (e) => {
                        await this.clear_state();
                        e.preventDefault();
                        await this.click_getOutput_ball_table();
                        // await this.Click_value_ball();
                      }}
                    >
                      submit
                    </button>
                  </div>
                </div>
                <div
                  className="row justify-content-end"
                  style={{ padding: "10px" }}
                >
                  <h6
                    className="col-auto"
                    style={{ color: "red", paddingTop: "8px" }}
                  >
                    <b>( Total: {this.state.countitem} M/C )</b>
                  </h6>
                  {/* <div className="col-auto">
                    <ReactHTMLTableToExcel
                      id="test-table-xls-button"
                      className="btn btn-secondary btn-block"
                      // className="download-table-xls-button"
                      table="tbreport"
                      // table="table-to-xls"
                      filename={this.state.txt} //"data test file ball"
                      sheet={this.state.data_date} //{moment().add(-1, "days").format("YYYY-MM-DD")}
                      buttonText="Export Excel"
                    />
                  </div> */}
                </div>
                <div
                  class="card-body table-responsive p-0"
                  style={{ height: "350px" }}
                >
                  <div className="overlay-wrapper">
                    {this.loadingScreen()}
                    <table
                      className="table table-head-fixed text-nowrap table-bordered table-hover"
                      id="tbreport"
                    >
                      <thead>
                        <tr>
                          <th>MC no</th>
                          <th>Model</th>
                          <th>BALL SIZE -5.0</th>
                          <th>BALL SIZE -2.5</th>
                          <th>BALL SIZE +0.0</th>
                          <th>BALL SIZE +2.5</th>
                          <th>BALL SIZE +5.0</th>
                        </tr>
                      </thead>
                      <tbody>{this.renderTableByMC()}</tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OLD_Realtime_total_MBR_day;
