import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Sidemenu from "./components/sidemenu";
import Footer from "./components/footer";

// import MMS_GD from "./components/mms_alarmlist/grinding/mms_gd.js";
// import Icb from "./components/mms_grinding/icb/icb.js";
// import Realtime_total_MBR_MC from "./components/assembly/realtime/realtime_mbr/realtime_total_MBR_MC.js";
// import MMS_MCstatus from "./components/mms_mcstatus/MMS_MCstatus.js";
// import Mms_turnover from "./components/assembly/mms_turnover/mms_turnover.js";
// import Mms_onhand from "./components/assembly/mms_turnover/mms_onhand.js";
// import MMS_MBRMD_full from "./components/mms_mbr/MMS_MBRMD/MMS_MBRMD_full.js";
// import Display_tb_mbr from "./components/assembly/realtime/realtime_mbr/display_tb_mbr.js";
// import MMS_GD_HOUR from "./components/mms_alarmlist/grinding/mms_gd_hour.js";
// import Compare_alarmlist_topic from "./components/mms_mcstatus/chart/compare_alarmlist_topic.js";
// import MMS_GD_BY_MC from "./components/mms_alarmlist/grinding/mms_gd_by_mc.js";
// import MMS_status_mc_UTL from "./components/mms_mcstatus/MMS_status_mc_utl.js";
import UsageBallDaily from "./pages/assembly/UsageBallDaily";
// import Chart_ball_usage_day from "./components/assembly/realtime/realtime_mbr/chart_ball_usage_day.js";
// import Realtime_total_MBR_day from "./components/assembly/realtime/realtime_mbr/realtime_total_MBR_day.js";
// import Realtime_sizeball_MBR_Monthly from "./components/assembly/realtime/realtime_mbr/realtime_sizeball_MBR_Monthly.js";
// import OLD_Realtime_total_MBR_day from "./components/assembly/realtime/realtime_mbr/old_realtime_total_MBR_day.js";
// import Mms_brh_allmc from "./components/mms_grinding/mms_brh_allmc/mms_brh_allmc.js";
// import MMS_MBRMD_PROD_TOTAL from "./components/mms_mbr/MMS_MBRMD/MMS_MBRMD_prod_total.js";
// import MMS_MBRMD_ACCUM_PROD_TOTAL from "./components/mms_mbr/MMS_MBRMD/MMS_MBRMD_accum_prod_total.js";

export default function App() {
    return (
        <BrowserRouter>
            <div>
                <Header />
                <Sidemenu />
                    <Routes>
                    {/* <Route path="/mms_gd" element={<MMS_GD />} />
                        <Route path="/mms_gd_hour" element={<MMS_GD_HOUR />} />
                        <Route path="/mms_gd_mc" element={<MMS_GD_BY_MC />} />
                        <Route path="/mms_icb" element={<Icb />} />
                        <Route path="/Realtime_total_MBR_MC" element={<Realtime_total_MBR_MC />} />
                        <Route path="/OLD_Realtime_total_MBR_MC" element={<OLD_Realtime_total_MBR_day />} />
                        <Route path="/mms_turnover" element={<Mms_turnover />} />
                        <Route path="/mms_onhand" element={<Mms_onhand />} />
                        <Route path="/mms_mbrmd_full" element={<MMS_MBRMD_full />} />
                        <Route path="/mms_table_mbr" element={<Display_tb_mbr />} />
                        <Route path="/mms_mc_status" element={<MMS_MCstatus />} />
                        <Route path="/Compare_alarmlist_topic" element={<Compare_alarmlist_topic />} />
                        <Route path="/mms_status_mc_UTL" element={<MMS_status_mc_UTL />} /> */}
                    <Route path="/UsageBallDaily" element={<UsageBallDaily />} />
                    {/* <Route path="/ballusage_monthly" element={<Realtime_sizeball_MBR_Monthly />} />
                        <Route path="/Realtime_total_MBR_day" element={<Realtime_total_MBR_day />} />
                        <Route path="/Chart_ball_usage_day" element={<Chart_ball_usage_day />} />
                        <Route path="/Mms_brh_allmc" element={<Mms_brh_allmc />} />
                        <Route path="/mms_mbrmd_total" element={<MMS_MBRMD_PROD_TOTAL />} />
                        <Route path="/mms_mbrmd_accum" element={<MMS_MBRMD_ACCUM_PROD_TOTAL />} /> */}

                    <Route exact={true} path="*" element={<UsageBallDaily />} />
                    </Routes>
                {<Footer />}
            </div>
        </BrowserRouter>
    );
}
