import React, { Component } from "react";
import Mms_status_mc from "../mms_alarmlist/grinding/mms_status_mc";
// import Table_status_mc_UTL from "../mms_alarmlist/grinding/table_status_mc_utl";

class MMS_status_mc_UTL extends Component {
  constructor(props) {
    super(props);
    this.tick = this.tick.bind(this);
    this.state = { seconds: props.seconds };

    this.state = {
      time: this.props.time,
      seconds: "1200",
    };
  }
  componentDidMount = async () => {
    this.timer = setInterval(this.tick, 1000);
  };
  tick() {
    if (this.state.seconds > 0) {
      this.setState({ seconds: this.state.seconds - 1 });
    } else {
      clearInterval(this.timer);
      window.location.reload();
    }
  }

  render() {
    return (
      <div className="content-wrapper">
        <div className="content">
          <div className="row">
            <div class="col-12">
              {/* <div class="card card-info"> */}
              <div class="card card-primary card-outline card-outline-tabs">
                <div class="card-header p-0 border-bottom-0">
                  {/* <div class="card-header p-0 border-bottom-0" style={{background:"#CDCDCD"}}> */}
                  <ul
                    class="nav nav-tabs"
                    id="custom-tabs-four-tab"
                    role="tablist"
                  >
                    <li class="nav-item">
                      <a
                        class="nav-link active"
                        id="custom-tabs-four-home-tab"
                        data-toggle="pill"
                        href="#custom-tabs-four-home"
                        role="tab"
                        aria-controls="custom-tabs-four-home"
                        aria-selected="true"
                      >
                        Machine Status
                      </a>
                    </li>
                    {/* <li class="nav-item">
                      <a
                        class="nav-link"
                        id="custom-tabs-four-tb_status_utl-tab"
                        data-toggle="pill"
                        href="#custom-tabs-four-tb_status_utl"
                        role="tab"
                        aria-controls="custom-tabs-four-tb_status_utl"
                        aria-selected="false"
                      >
                        Table Machine Status
                      </a>
                      </li> */}
                  </ul>
                </div>
                <div class="card-body">
                  <div class="tab-content" id="custom-tabs-four-tabContent">
                    <div
                      class="tab-pane fade show active"
                      id="custom-tabs-four-home"
                      role="tabpanel"
                      aria-labelledby="custom-tabs-four-home-tab"
                    >
                      <Mms_status_mc />
                    </div>
                    {/* <div
                      class="tab-pane fade"
                      id="custom-tabs-four-tb_status_utl"
                      role="tabpanel"
                      aria-labelledby="custom-tabs-four-tb_status_utl-tab"
                    >
<Table_status_mc_UTL/>
                    </div> */}
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

export default MMS_status_mc_UTL;
