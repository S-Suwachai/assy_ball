const express = require("express");
const router = express.Router();
const dbms = require("../instance/ms_instance");

router.post("/ballFromMC", async (req, res) => {
    try {
        let { startDateQuery, endDateQuery, materialQuery, sizeQuery, partQuery, rpQuery, machineQuery } = req.body;

        let resultUsageBall = await dbms.query(
            `
                WITH
                [t1] AS (
                SELECT
                    FORMAT(IIF(DATEPART(HOUR, [DATA_PRODUCTION_ASSY].[registered_at])<7,DATEADD(day,-1,[DATA_PRODUCTION_ASSY].[registered_at]),[DATA_PRODUCTION_ASSY].[registered_at]),'yyyy-MM-dd') AS mfg_date
                    ,FORMAT([DATA_PRODUCTION_ASSY].[registered_at], 'HH:mm') AS 'time'
                    ,[DATA_PRODUCTION_ASSY].[mc_no]
                    ,[DATA_PRODUCTION_ASSY].[ball_ok_c1]
                    ,[DATA_PRODUCTION_ASSY].[ball_ok_c2]
                    ,[DATA_PRODUCTION_ASSY].[ball_ok_c3]
                    ,[DATA_PRODUCTION_ASSY].[ball_gauge_c1]
                    ,[DATA_PRODUCTION_ASSY].[ball_gauge_c2]
                    ,[DATA_PRODUCTION_ASSY].[ball_gauge_c3]
                
                    ,DATEPART(dy, FORMAT(IIF(DATEPART(HOUR, [DATA_PRODUCTION_ASSY].[registered_at])<7,DATEADD(day,-1,[DATA_PRODUCTION_ASSY].[registered_at]),[DATA_PRODUCTION_ASSY].[registered_at]),'yyyy-MM-dd')) * 10000 + (IIF(DATEPART(HOUR, FORMAT([DATA_PRODUCTION_ASSY].[registered_at], 'HH:mm')) >= 7,DATEPART(HOUR, FORMAT([DATA_PRODUCTION_ASSY].[registered_at], 'HH:mm')) - 6,DATEPART(HOUR, FORMAT([DATA_PRODUCTION_ASSY].[registered_at], 'HH:mm')) + 18)) * 100 + DATEPART(MINUTE, FORMAT([DATA_PRODUCTION_ASSY].[registered_at], 'HH:mm')) AS 'covertDateTime'
                    ,MAX(DATEPART(dy, [ASSY_RECORD_DOWNTIME].[Input_Data]) * 10000 + (IIF(DATEPART(HOUR, FORMAT(CONVERT(DATETIME, [ASSY_RECORD_DOWNTIME].[Input_Time]), 'HH:mm')) >= 7,DATEPART(HOUR, FORMAT(CONVERT(DATETIME, [ASSY_RECORD_DOWNTIME].[Input_Time]), 'HH:mm')) - 6,DATEPART(HOUR, FORMAT(CONVERT(DATETIME, [ASSY_RECORD_DOWNTIME].[Input_Time]), 'HH:mm')) + 18)*100) + DATEPART(mi, FORMAT(CONVERT(DATETIME, [ASSY_RECORD_DOWNTIME].[Input_Time]), 'HH:mm'))) AS 'covertDateTime_downtime'
                FROM [DATA_PRODUCTION_ASSY]
                
                LEFT JOIN
                    [ASSY_RECORD_DOWNTIME]
                ON
                    [DATA_PRODUCTION_ASSY].[mc_no] = [ASSY_RECORD_DOWNTIME].[Machine]
                    AND
                    DATEPART(dy, FORMAT(IIF(DATEPART(HOUR, [DATA_PRODUCTION_ASSY].[registered_at])<7,DATEADD(day,-1,[DATA_PRODUCTION_ASSY].[registered_at]),[DATA_PRODUCTION_ASSY].[registered_at]),'yyyy-MM-dd')) * 10000 + (IIF(DATEPART(HOUR, FORMAT([DATA_PRODUCTION_ASSY].[registered_at], 'HH:mm')) >= 7,DATEPART(HOUR, FORMAT([DATA_PRODUCTION_ASSY].[registered_at], 'HH:mm')) - 6,DATEPART(HOUR, FORMAT([DATA_PRODUCTION_ASSY].[registered_at], 'HH:mm')) + 18)) * 100 + DATEPART(MINUTE, FORMAT([DATA_PRODUCTION_ASSY].[registered_at], 'HH:mm'))
                    >=
                    DATEPART(dy, [ASSY_RECORD_DOWNTIME].[Input_Data]) * 10000 + (IIF(DATEPART(HOUR, FORMAT(CONVERT(DATETIME, [ASSY_RECORD_DOWNTIME].[Input_Time]), 'HH:mm')) >= 7,DATEPART(HOUR, FORMAT(CONVERT(DATETIME, [ASSY_RECORD_DOWNTIME].[Input_Time]), 'HH:mm')) - 6,DATEPART(HOUR, FORMAT(CONVERT(DATETIME, [ASSY_RECORD_DOWNTIME].[Input_Time]), 'HH:mm')) + 18)*100) + DATEPART(mi, FORMAT(CONVERT(DATETIME, [ASSY_RECORD_DOWNTIME].[Input_Time]), 'HH:mm'))
                
                    
                WHERE
                    FORMAT(IIF(DATEPART(HOUR, [DATA_PRODUCTION_ASSY].[registered_at])<7,DATEADD(day,-1,[DATA_PRODUCTION_ASSY].[registered_at]),[DATA_PRODUCTION_ASSY].[registered_at]),'yyyy-MM-dd') BETWEEN '${startDateQuery}' AND '${endDateQuery}'
                
                GROUP BY
                    [DATA_PRODUCTION_ASSY].[registered_at]
                    ,[DATA_PRODUCTION_ASSY].[mc_no]
                    ,[DATA_PRODUCTION_ASSY].[ball_ok_c1]
                    ,[DATA_PRODUCTION_ASSY].[ball_ok_c2]
                    ,[DATA_PRODUCTION_ASSY].[ball_ok_c3]
                    ,[DATA_PRODUCTION_ASSY].[ball_gauge_c1]
                    ,[DATA_PRODUCTION_ASSY].[ball_gauge_c2]
                    ,[DATA_PRODUCTION_ASSY].[ball_gauge_c3]
                ),
                [t2] AS (
                SELECT
                    DATEPART(dy, [ASSY_RECORD_DOWNTIME].[Input_Data]) * 10000 + (IIF(DATEPART(HOUR, FORMAT(CONVERT(DATETIME, [ASSY_RECORD_DOWNTIME].[Input_Time]), 'HH:mm')) >= 7,DATEPART(HOUR, FORMAT(CONVERT(DATETIME, [ASSY_RECORD_DOWNTIME].[Input_Time]), 'HH:mm')) - 6,DATEPART(HOUR, FORMAT(CONVERT(DATETIME, [ASSY_RECORD_DOWNTIME].[Input_Time]), 'HH:mm')) + 18)*100) + DATEPART(mi, FORMAT(CONVERT(DATETIME, [ASSY_RECORD_DOWNTIME].[Input_Time]), 'HH:mm')) AS 'covertDateTime_downtime'
                    ,[WOS]
                    ,[Spec]
                FROM [ASSY_RECORD_DOWNTIME]
                
                GROUP BY
                    [Input_Data]
                    ,[Input_Time]
                    ,[WOS]
                    ,[Spec]
                )
                
                SELECT
                    [t1].[mfg_date]
                    ,[t1].[mc_no]
                    ,MAX([t1].[ball_ok_c1]) * [MASTER_BOM_ALL].[ball_qty] AS 'total_ball_usage_c1'
                    ,MAX([t1].[ball_ok_c2]) * [MASTER_BOM_ALL].[ball_qty] AS 'total_ball_usage_c2'
                    ,MAX([t1].[ball_ok_c3]) * [MASTER_BOM_ALL].[ball_qty] AS 'total_ball_usage_c3'
                    ,[t1].[ball_gauge_c1]
                    ,[t1].[ball_gauge_c2]
                    ,[t1].[ball_gauge_c3]
                    ,[t2].[WOS]
                    ,[t2].[Spec]
                    ,[MASTER_BOM_ALL].[part_no]
                    ,[MASTER_BOM_ALL].[ball]
                    ,[MASTER_BOM_ALL].[ball_material]
                    ,[MASTER_BOM_ALL].[ball_qty]
                FROM [t1]
                
                LEFT JOIN
                    [t2]
                ON
                    [t1].[covertDateTime_downtime] = [t2].[covertDateTime_downtime]
                
                LEFT JOIN
                    [MASTER_BOM_ALL]
                ON
                    [t2].[WOS] = [MASTER_BOM_ALL].wos_no
                
                GROUP BY
                    [t1].[mfg_date]
                    ,[t1].[mc_no]
                    ,[t2].[WOS]
                    ,[t2].[Spec]
                    ,[MASTER_BOM_ALL].[part_no]
                    ,[MASTER_BOM_ALL].[ball]
                    ,[MASTER_BOM_ALL].[ball_material]
                    ,[MASTER_BOM_ALL].[ball_qty]
                    ,[t1].[ball_gauge_c1]
                    ,[t1].[ball_gauge_c2]
                    ,[t1].[ball_gauge_c3]
            `
        );

        resultUsageBall = resultUsageBall[0];

        // remove GXX in ballsize
        resultUsageBall = resultUsageBall.map((item) => {
            let indexG = item.ball.indexOf("G");
            let newBall;
            if (indexG > 0) {
                newBall = item.ball.slice(0, indexG).trim();
            }
            return {...item, ball: newBall}
        });


        // for select material
        let materialForSelect = [...new Set(resultUsageBall.map((item) => item.ball_material))];
        materialForSelect = materialForSelect.filter((item) => item !== null);
        let resultAfFilterMaterial;
        if (!materialQuery || materialQuery === "ALL") {
            resultAfFilterMaterial = resultUsageBall;
        } else {
            resultAfFilterMaterial = resultUsageBall.filter((item) => {
                return item.ball_material === materialQuery;
            });
        }

        // for select ball size
        let ballSizeForSelect = [...new Set(resultAfFilterMaterial.map((item) => item.ball))];
        ballSizeForSelect = ballSizeForSelect.filter((item) => item !== null);
        let resultAfFilterSize;
        if (!sizeQuery || sizeQuery === "ALL") {
            resultAfFilterSize = resultAfFilterMaterial;
        } else {
            resultAfFilterSize = resultAfFilterMaterial.filter((item) => {
                return item.ball === sizeQuery;
            });
            materialForSelect = [...new Set(resultAfFilterSize.map((item) => item.ball_material))];
            materialForSelect = materialForSelect.filter((item) => item !== null);
        }

        // for select part
        let partForSelect = [...new Set(resultAfFilterSize.map((item) => item.part_no))];
        partForSelect = partForSelect.filter((item) => item !== null);
        let resultAfFilterPart;
        if (!partQuery || partQuery === "ALL") {
            resultAfFilterPart = resultAfFilterSize;
        } else {
            resultAfFilterPart = resultAfFilterSize.filter((item) => {
                return item.part_no === partQuery;
            });
            materialForSelect = [...new Set(resultAfFilterPart.map((item) => item.ball_material))];
            materialForSelect = materialForSelect.filter((item) => item !== null);
            ballSizeForSelect = [...new Set(resultAfFilterPart.map((item) => item.ball))];
            ballSizeForSelect = ballSizeForSelect.filter((item) => item !== null);
        }

        // for select RP
        let rpForSelect = [...new Set(resultAfFilterPart.map((item) => item.Spec.slice(2, 5)))];
        rpForSelect = rpForSelect.filter((item) => item !== null);
        let resultAfFilterRp;
        if (!rpQuery || rpQuery === "ALL") {
            resultAfFilterRp = resultAfFilterPart;
        } else {
            resultAfFilterRp = resultAfFilterPart.filter((item) => {
                return item.Spec.includes(rpQuery);
            });
            materialForSelect = [...new Set(resultAfFilterRp.map((item) => item.ball_material))];
            materialForSelect = materialForSelect.filter((item) => item !== null);
            ballSizeForSelect = [...new Set(resultAfFilterRp.map((item) => item.ball))];
            ballSizeForSelect = ballSizeForSelect.filter((item) => item !== null);
            partForSelect = [...new Set(resultAfFilterRp.map((item) => item.part_no))];
            partForSelect = partForSelect.filter((item) => item !== null);
        }

        let machineForSelect = [...new Set(resultAfFilterRp.map((item) => item.mc_no.toUpperCase()))];
        let resultAfFilterMachine;
        if (!machineQuery || machineQuery === "ALL") {
            resultAfFilterMachine = resultAfFilterRp;
        } else {
            resultAfFilterMachine = resultAfFilterRp.filter((item) => {
                return item.mc_no === machineQuery.toLowerCase();
            });
            materialForSelect = [...new Set(resultAfFilterMachine.map((item) => item.ball_material))];
            materialForSelect = materialForSelect.filter((item) => item !== null);
            ballSizeForSelect = [...new Set(resultAfFilterMachine.map((item) => item.ball))];
            ballSizeForSelect = ballSizeForSelect.filter((item) => item !== null);
            partForSelect = [...new Set(resultAfFilterMachine.map((item) => item.part_no))];
            partForSelect = partForSelect.filter((item) => item !== null);
            rpForSelect = [...new Set(resultAfFilterMachine.map((item) => item.Spec.slice(2, 5)))];
            rpForSelect = rpForSelect.filter((item) => item !== null);
        }

        // ---------- DataChart ----------
        const dataDateForChart = [...new Set(resultAfFilterMachine.map((item) => item.mfg_date))];
        let totalBall50 = 0;
        let totalBall25 = 0;
        let totalBall00 = 0;
        let totalBall_25 = 0;
        let totalBall_50 = 0;
        let arrBall50 = [];
        let arrBall25 = [];
        let arrBall00 = [];
        let arrBall_25 = [];
        let arrBall_50 = [];

        dataDateForChart.map((date) => {
            resultAfFilterMachine.map((value) => {
                if (value.mfg_date === date) {
                    switch (value.ball_gauge_c1) {
                        case 5.0:
                            totalBall50 += value.total_ball_usage_c1;
                            break;
                        case 2.5:
                            totalBall25 += value.total_ball_usage_c1;
                            break;
                        case 0.0:
                            totalBall00 += value.total_ball_usage_c1;
                            break;
                        case -2.5:
                            totalBall_25 += value.total_ball_usage_c1;
                            break;
                        case -5.0:
                            totalBall_50 += value.total_ball_usage_c1;
                    }
                    switch (value.ball_gauge_c2) {
                        case 5.0:
                            totalBall50 += value.total_ball_usage_c2;
                            break;
                        case 2.5:
                            totalBall25 += value.total_ball_usage_c2;
                            break;
                        case 0.0:
                            totalBall00 += value.total_ball_usage_c2;
                            break;
                        case -2.5:
                            totalBall_25 += value.total_ball_usage_c2;
                            break;
                        case -5.0:
                            totalBall_50 += value.total_ball_usage_c2;
                    }
                    switch (value.ball_gauge_c3) {
                        case 5.0:
                            totalBall50 += value.total_ball_usage_c3;
                            break;
                        case 2.5:
                            totalBall25 += value.total_ball_usage_c3;
                            break;
                        case 0.0:
                            totalBall00 += value.total_ball_usage_c3;
                            break;
                        case -2.5:
                            totalBall_25 += value.total_ball_usage_c3;
                            break;
                        case -5.0:
                            totalBall_50 += value.total_ball_usage_c3;
                    }
                }
            });
            arrBall50.push(totalBall50);
            arrBall25.push(totalBall25);
            arrBall00.push(totalBall00);
            arrBall_25.push(totalBall_25);
            arrBall_50.push(totalBall_50);

            totalBall50 = 0;
            totalBall25 = 0;
            totalBall00 = 0;
            totalBall_25 = 0;
            totalBall_50 = 0;
        });

        // DataChart arrage format for show
        const dataForChart = {
            date: dataDateForChart,
            result: [
                {
                    name: "+5.0",
                    data: arrBall50,
                },
                {
                    name: "+2.5",
                    data: arrBall25,
                },
                {
                    name: "0.0",
                    data: arrBall00,
                },
                {
                    name: "-2.5",
                    data: arrBall_25,
                },
                {
                    name: "-5.0",
                    data: arrBall_50,
                },
            ],
        };
        // -------------------------------

        // ------- Data Chart ball -------
        let totalBallChart50 = 0;
        let totalBallChart25 = 0;
        let totalBallChart00 = 0;
        let totalBallChart_25 = 0;
        let totalBallChart_50 = 0;
        let arrBallChart50 = [];
        let arrBallChart25 = [];
        let arrBallChart00 = [];
        let arrBallChart_25 = [];
        let arrBallChart_50 = [];
        ballSizeForSelect.map((ball) => {
            resultAfFilterMachine.map((value) => {
                if (value.ball === ball) {
                    switch (value.ball_gauge_c1) {
                        case 5.0:
                            totalBallChart50 += value.total_ball_usage_c1;
                            break;
                        case 2.5:
                            totalBallChart25 += value.total_ball_usage_c1;
                            break;
                        case 0.0:
                            totalBallChart00 += value.total_ball_usage_c1;
                            break;
                        case -2.5:
                            totalBallChart_25 += value.total_ball_usage_c1;
                            break;
                        case -5.0:
                            totalBallChart_50 += value.total_ball_usage_c1;
                    }
                    switch (value.ball_gauge_c2) {
                        case 5.0:
                            totalBallChart50 += value.total_ball_usage_c2;
                            break;
                        case 2.5:
                            totalBallChart25 += value.total_ball_usage_c2;
                            break;
                        case 0.0:
                            totalBallChart00 += value.total_ball_usage_c2;
                            break;
                        case -2.5:
                            totalBallChart_25 += value.total_ball_usage_c2;
                            break;
                        case -5.0:
                            totalBallChart_50 += value.total_ball_usage_c1;
                    }
                    switch (value.ball_gauge_c3) {
                        case 5.0:
                            totalBallChart50 += value.total_ball_usage_c3;
                            break;
                        case 2.5:
                            totalBallChart25 += value.total_ball_usage_c3;
                            break;
                        case 0.0:
                            totalBallChart00 += value.total_ball_usage_c3;
                            break;
                        case -2.5:
                            totalBallChart_25 += value.total_ball_usage_c3;
                            break;
                        case -5.0:
                            totalBallChart_50 += value.total_ball_usage_c3;
                    }
                }
            });
            arrBallChart50.push(totalBallChart50);
            arrBallChart25.push(totalBallChart25);
            arrBallChart00.push(totalBallChart00);
            arrBallChart_25.push(totalBallChart_25);
            arrBallChart_50.push(totalBallChart_50);

            totalBallChart50 = 0;
            totalBallChart25 = 0;
            totalBallChart00 = 0;
            totalBallChart_25 = 0;
            totalBallChart_50 = 0;
        });

        // DataChartBall arrage format for show
        const dataForChartBall = {
            ball: ballSizeForSelect,
            result: [
                {
                    name: "+5.0",
                    data: arrBallChart50,
                },
                {
                    name: "+2.5",
                    data: arrBallChart25,
                },
                {
                    name: "0.0",
                    data: arrBallChart00,
                },
                {
                    name: "-2.5",
                    data: arrBallChart_25,
                },
                {
                    name: "-5.0",
                    data: arrBallChart_50,
                },
            ],
        }
        // -------------------------------


        // ---------- DataTable ----------
        let dataForTable = [];
        resultAfFilterMachine.map((item, index) => {
            let usageBall50 = 0;
            let usageBall25 = 0;
            let usageBall00 = 0;
            let usageBall_25 = 0;
            let usageBall_50 = 0;

            switch (item.ball_gauge_c1) {
                case 5.0:
                    usageBall50 = item.total_ball_usage_c1;
                    break;
                case 2.5:
                    usageBall25 = item.total_ball_usage_c1;
                    break;
                case 0.0:
                    usageBall00 = item.total_ball_usage_c1;
                    break;
                case -2.5:
                    usageBall_25 = item.total_ball_usage_c1;
                    break;
                case -5.0:
                    usageBall_50 = item.total_ball_usage_c1;
                    break;
            }
            switch (item.ball_gauge_c2) {
                case 5.0:
                    usageBall50 = item.total_ball_usage_c2;
                    break;
                case 2.5:
                    usageBall25 = item.total_ball_usage_c2;
                    break;
                case 0.0:
                    usageBall00 = item.total_ball_usage_c2;
                    break;
                case -2.5:
                    usageBall_25 = item.total_ball_usage_c2;
                    break;
                case -5.0:
                    usageBall_50 = item.total_ball_usage_c2;
                    break;
            }
            switch (item.ball_gauge_c3) {
                case 5.0:
                    usageBall50 = item.total_ball_usage_c3;
                    break;
                case 2.5:
                    usageBall25 = item.total_ball_usage_c3;
                    break;
                case 0.0:
                    usageBall00 = item.total_ball_usage_c3;
                    break;
                case -2.5:
                    usageBall_25 = item.total_ball_usage_c3;
                    break;
                case -5.0:
                    usageBall_50 = item.total_ball_usage_c3;
                    break;
            }
            dataForTable.push({
                id: index + 1,
                date: item.mfg_date,
                machine: item.mc_no.toUpperCase(),
                partNo: item.part_no,
                ballSize: item.ball,
                spec: item.Spec,
                qty50: usageBall50,
                qty25: usageBall25,
                qty00: usageBall00,
                qty_25: usageBall_25,
                qty_50: usageBall_50,
            });
        });

        // DataTable summary data
        const sumBall50 = dataForTable.reduce((acc, value) => {
            return acc + value.qty50;
        }, 0);
        const sumBall25 = dataForTable.reduce((acc, value) => {
            return acc + value.qty25;
        }, 0);
        const sumBall00 = dataForTable.reduce((acc, value) => {
            return acc + value.qty00;
        }, 0);
        const sumBall_25 = dataForTable.reduce((acc, value) => {
            return acc + value.qty_25;
        }, 0);
        const sumBall_50 = dataForTable.reduce((acc, value) => {
            return acc + value.qty_50;
        }, 0);

        dataForTable.push({
            id: dataForTable.length,
            date: "Total",
            qty50: sumBall50,
            qty25: sumBall25,
            qty00: sumBall00,
            qty_25: sumBall_25,
            qty_50: sumBall_50,
        });

        // DataTable arrage format for show
        dataForTable = dataForTable.map((item) => ({
            ...item,
            qty50: item.qty50.toLocaleString(),
            qty25: item.qty25.toLocaleString(),
            qty00: item.qty00.toLocaleString(),
            qty_25: item.qty_25.toLocaleString(),
            qty_50: item.qty_50.toLocaleString(),
        }));
        // -------------------------------

        res.json({
            materialForSelect,
            ballSizeForSelect,
            partForSelect,
            rpForSelect,
            machineForSelect,
            resultAfFilterMachine,
            dataForChart,
            dataForChartBall,
            dataForTable,
        });
    } catch (error) {
        console.log(error);
        res.json({
            error: error,
        });
    }
});

module.exports = router;
