const express = require("express");
const router = express.Router();
const dbms = require("../instance/ms_instance");

router.post("/realtime_prod", async (req, res) => {
    try {
        let { datequery, machinequery } = req.body;
        machinequery = machinequery.toLowerCase();

        let resultTotalProd = await dbms.query(
            `
                SELECT
                    MAX([ball_ok_c1]) AS total_ball_c1
                    ,MAX([ball_ok_c2]) AS total_ball_c2
                    ,MAX([ball_ok_c3]) AS total_ball_c3
                    ,[DATA_PRODUCTION_ASSY].[mc_no]
                    ,[MODEL_RUNNING].[part]
                    ,[MASTER_BOM].[ball]
                    ,[DATA_PRODUCTION_ASSY].[ball_gauge_c1]
                    ,[DATA_PRODUCTION_ASSY].[ball_gauge_c2]
                    ,[DATA_PRODUCTION_ASSY].[ball_gauge_c3]
                    ,[MASTER_BOM].material_ball
                    ,[MASTER_BOM].qty_ball
                    ,MAX([production_daily_ok]) as total_production_ok
                    ,MAX([production_daily_ng]) as total_production_ng
                    ,AVG([average_cycle_time]) as average_cycle_time
                    ,86400/AVG([average_cycle_time]) AS capacity
                FROM [demo].[dbo].[DATA_PRODUCTION_ASSY]
        
                LEFT JOIN [MODEL_RUNNING]
                ON
                    [DATA_PRODUCTION_ASSY].mc_no = [MODEL_RUNNING].mc_no
        
                LEFT JOIN [MASTER_BOM]
                ON
                    [MODEL_RUNNING].part = [MASTER_BOM].part
                WHERE
                    FORMAT(IIF(DATEPART(HOUR, [DATA_PRODUCTION_ASSY].[registered_at])<7,DATEADD(day,-1,[DATA_PRODUCTION_ASSY].[registered_at]),[DATA_PRODUCTION_ASSY].[registered_at]),'yyyy-MM-dd') = '${datequery}'
                GROUP BY
                    [DATA_PRODUCTION_ASSY].[mc_no]
                    ,[MODEL_RUNNING].[part]
                    ,[MASTER_BOM].[ball]
                    ,[MASTER_BOM].[qty_ball]
                    ,[MASTER_BOM].[material_ball]
                    ,[DATA_PRODUCTION_ASSY].[ball_gauge_c1]
                    ,[DATA_PRODUCTION_ASSY].[ball_gauge_c2]
                    ,[DATA_PRODUCTION_ASSY].[ball_gauge_c3]
            `
        );

        resultTotalProd = resultTotalProd[0];

        let machineNumberForSelect = [];
        resultTotalProd.map((item) => {
            machineNumberForSelect.push(item.mc_no.toUpperCase());
        });

        let resultAFFilter;
        if (!machinequery || machinequery === "all") {
            resultAFFilter = resultTotalProd;
        } else {
            resultAFFilter = resultTotalProd.filter((item) => {
                return item.mc_no === machinequery;
            });
        }

        console.log(resultAFFilter);

        let dataForChart = [];
        for (const key in resultAFFilter[0]) {
            if (key.includes("total_ball")) {
                dataForChart.push({
                    name: key,
                    data: resultAFFilter.map((item) => (item[key] * item.qty_ball))
                });
            }
        }

        res.json({
            resultAFFilter,
            machineNumberForSelect,
            dataForChart
        });
    } catch (error) {
        console.log(error);
        res.json({
            error: error,
        });
    }
});

module.exports = router;
