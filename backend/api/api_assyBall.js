const express = require("express");
const router = express.Router();
const dbms = require("../instance/ms_instance");
const tenBitToAscii = require("../util/tenBitToAscii");

// http://localhost:4000/assy/ball/assyBall
router.post("/assyBall", async (req, res) => {
    try {
        let { startDateQuery, endDateQuery, materialQuery, sizeQuery, partQuery, machineQuery } = req.body;
        // แปลง endDateQuery + ไปอีก 1 วัน (เพื่อเอาข้อมูลหลังเที่ยงคืน)
        let originalDate = new Date(endDateQuery);
        originalDate.setDate(originalDate.getDate() + 1);
        endDateQuery = originalDate.toISOString().split("T")[0];

        let resultUsageBall = await dbms.query(
            `
                SELECT
                    [registered_at]
                    ,[mc_no]
                    ,[ball_ok_c1]
                    ,[ball_ok_c2]
                    ,[ball_ok_c3]
                    ,[ball_ok_c4]
                    ,[ball_ok_c5]
                    ,[wos_no_1]
                    ,[wos_no_2]
                    ,[wos_no_3]
                    ,[ball_gauge_c1_1]
                    ,[ball_gauge_c1_2]
                    ,[ball_gauge_c2_1]
                    ,[ball_gauge_c2_2]
                    ,[ball_gauge_c3_1]
                    ,[ball_gauge_c3_2]
                    ,[ball_gauge_c4_1]
                    ,[ball_gauge_c4_2]
                    ,[ball_gauge_c5_1]
                    ,[ball_gauge_c5_2]
                FROM [DATA_PRODUCTION_ASSY]
                
                WHERE
                    registered_at BETWEEN '${startDateQuery} 06:55' AND '${endDateQuery} 07:05'
                
                ORDER BY
                    mc_no, registered_at
            `
        );
        resultUsageBall = resultUsageBall[0];
        resultUsageBall = resultUsageBall.map((item) => {
            let hours = item.registered_at.getUTCHours();
            let mfg_date = new Date(item.registered_at);
            if (hours <= 7) {
                mfg_date.setDate(mfg_date.getDate() - 1);
            }

            // change ball_gauge 10bit to String
            let ball_gauge_c1;
            if (item.ball_gauge_c1_1 !== 0 || item.ball_gauge_c1_2 !== 0) {
                ball_gauge_c1 = tenBitToAscii(item.ball_gauge_c1_1, item.ball_gauge_c1_2);
            } else {
                ball_gauge_c1 = undefined;
            }

            let ball_gauge_c2;
            if (item.ball_gauge_c2_1 !== 0 || item.ball_gauge_c2_2 !== 0) {
                ball_gauge_c2 = tenBitToAscii(item.ball_gauge_c2_1, item.ball_gauge_c2_2);
            } else {
                ball_gauge_c2 = undefined;
            }

            let ball_gauge_c3;
            if (item.ball_gauge_c3_1 !== 0 || item.ball_gauge_c3_2 !== 0) {
                ball_gauge_c3 = tenBitToAscii(item.ball_gauge_c3_1, item.ball_gauge_c3_2);
            } else {
                ball_gauge_c3 = undefined;
            }

            let ball_gauge_c4;
            if (item.ball_gauge_c4_1 !== 0 || item.ball_gauge_c4_2 !== 0) {
                ball_gauge_c4 = tenBitToAscii(item.ball_gauge_c4_1, item.ball_gauge_c4_2);
            } else {
                ball_gauge_c4 = undefined;
            }

            let ball_gauge_c5;
            if (item.ball_gauge_c5_1 !== 0 || item.ball_gauge_c5_2 !== 0) {
                ball_gauge_c5 = tenBitToAscii(item.ball_gauge_c5_1, item.ball_gauge_c5_2);
            } else {
                ball_gauge_c5 = undefined;
            }

            let ball_ok50;
            let ball_ok25;
            let ball_ok00;
            let ball_ok_25;
            let ball_ok_50;

            // Check tolerance c1
            if (ball_gauge_c1 >= 4.7 && ball_gauge_c1 <= 5.3) {
                ball_ok50 = item.ball_ok_c1;
            }
            if (ball_gauge_c1 >= 2.3 && ball_gauge_c1 <= 2.8) {
                ball_ok25 = item.ball_ok_c1;
            }
            if (ball_gauge_c1 >= -0.3 && ball_gauge_c1 <= 0.3) {
                ball_ok00 = item.ball_ok_c1;
            }
            if (ball_gauge_c1 >= -2.8 && ball_gauge_c1 <= -2.3) {
                ball_ok_25 = item.ball_ok_c1;
            }
            if (ball_gauge_c1 >= -5.3 && ball_gauge_c1 <= -4.7) {
                ball_ok_50 = item.ball_ok_c1;
            }

            // Check tolerance c2
            if (ball_gauge_c2 >= 4.7 && ball_gauge_c2 <= 5.3) {
                ball_ok50 = item.ball_ok_c2;
            }
            if (ball_gauge_c2 >= 2.3 && ball_gauge_c2 <= 2.8) {
                ball_ok25 = item.ball_ok_c2;
            }
            if (ball_gauge_c2 >= -0.3 && ball_gauge_c2 <= 0.3) {
                ball_ok00 = item.ball_ok_c2;
            }
            if (ball_gauge_c2 >= -2.8 && ball_gauge_c2 <= -2.3) {
                ball_ok_25 = item.ball_ok_c2;
            }
            if (ball_gauge_c2 >= -5.3 && ball_gauge_c2 <= -4.7) {
                ball_ok_50 = item.ball_ok_c2;
            }

            // Check tolerance c3
            if (ball_gauge_c3 >= 4.7 && ball_gauge_c3 <= 5.3) {
                ball_ok50 = item.ball_ok_c3;
            }
            if (ball_gauge_c3 >= 2.3 && ball_gauge_c3 <= 2.8) {
                ball_ok25 = item.ball_ok_c3;
            }
            if (ball_gauge_c3 >= -0.3 && ball_gauge_c3 <= 0.3) {
                ball_ok00 = item.ball_ok_c3;
            }
            if (ball_gauge_c3 >= -2.8 && ball_gauge_c3 <= -2.3) {
                ball_ok_25 = item.ball_ok_c3;
            }
            if (ball_gauge_c3 >= -5.3 && ball_gauge_c3 <= -4.7) {
                ball_ok_50 = item.ball_ok_c3;
            }

            // Check tolerance c4
            if (ball_gauge_c4 >= 4.7 && ball_gauge_c4 <= 5.3) {
                ball_ok50 = item.ball_ok_c4;
            }
            if (ball_gauge_c4 >= 2.3 && ball_gauge_c4 <= 2.8) {
                ball_ok25 = item.ball_ok_c4;
            }
            if (ball_gauge_c4 >= -0.3 && ball_gauge_c4 <= 0.3) {
                ball_ok00 = item.ball_ok_c4;
            }
            if (ball_gauge_c4 >= -2.8 && ball_gauge_c4 <= -2.3) {
                ball_ok_25 = item.ball_ok_c4;
            }
            if (ball_gauge_c4 >= -5.3 && ball_gauge_c4 <= -4.7) {
                ball_ok_50 = item.ball_ok_c4;
            }

            // Check tolerance c5
            if (ball_gauge_c5 >= 4.7 && ball_gauge_c5 <= 5.3) {
                ball_ok50 = item.ball_ok_c5;
            }
            if (ball_gauge_c5 >= 2.3 && ball_gauge_c5 <= 2.8) {
                ball_ok25 = item.ball_ok_c5;
            }
            if (ball_gauge_c5 >= -0.3 && ball_gauge_c5 <= 0.3) {
                ball_ok00 = item.ball_ok_c5;
            }
            if (ball_gauge_c5 >= -2.8 && ball_gauge_c5 <= -2.3) {
                ball_ok_25 = item.ball_ok_c5;
            }
            if (ball_gauge_c5 >= -5.3 && ball_gauge_c5 <= -4.7) {
                ball_ok_50 = item.ball_ok_c5;
            }

            return {
                registered_at: item.registered_at,
                mfg_date: mfg_date.toISOString().split("T")[0],
                mc_no: item.mc_no.toUpperCase(),
                wos_no: tenBitToAscii(item.wos_no_1, item.wos_no_2, item.wos_no_3),
                ball_ok_c1: item.ball_ok_c1,
                ball_ok_c2: item.ball_ok_c2,
                ball_ok_c3: item.ball_ok_c3,
                ball_ok_c4: item.ball_ok_c4,
                ball_ok_c5: item.ball_ok_c5,
                ball_gauge_c1: ball_gauge_c1,
                ball_gauge_c2: ball_gauge_c2,
                ball_gauge_c3: ball_gauge_c3,
                ball_gauge_c4: ball_gauge_c4,
                ball_gauge_c5: ball_gauge_c5,
                ball_ok50: ball_ok50,
                ball_ok25: ball_ok25,
                ball_ok00: ball_ok00,
                ball_ok_25: ball_ok_25,
                ball_ok_50: ball_ok_50,
            };
        });

        // date for select
        let mfgDateData = [...new Set(resultUsageBall.map((item) => item.mfg_date))];
        mfgDateData = mfgDateData.filter((item) => item !== null);
        mfgDateData = mfgDateData.slice(1);

        // M/C No for select
        let mcNoData = [...new Set(resultUsageBall.map((item) => item.mc_no))];
        mcNoData = mcNoData.filter((item) => item !== null);

        // WOS for select
        let wosData = [...new Set(resultUsageBall.map((item) => item.wos_no))];
        wosData = wosData.filter((item) => item !== null);

        let sumDataBall = [];
        mfgDateData.map((itemMfgDate) => {
            mcNoData.map((itemMcNo) => {
                wosData.map((itemWos) => {
                    let sumBall_ok50 = 0;
                    let sumBall_ok25 = 0;
                    let sumBall_ok00 = 0;
                    let sumBall_ok_25 = 0;
                    let sumBall_ok_50 = 0;
                    resultUsageBall.map((item, index, array) => {
                        if (item.mfg_date === itemMfgDate && item.mc_no === itemMcNo && item.wos_no === itemWos) {
                            let previousValue;
                            if (index > 0 && itemMfgDate && item.mc_no && item.wos_no === itemWos) {
                                previousValue = array[index - 1];
                            } else {
                                previousValue = array[index];
                            }

                            let checkPreviousDate = new Date(previousValue.registered_at);
                            checkPreviousDate.setDate(checkPreviousDate.getDate() - 1);
                            if (
                                checkPreviousDate.toISOString().split("T")[0] === previousValue.mfg_date &&
                                previousValue.registered_at.getUTCHours() === 7
                            ) {
                                sumBall_ok50 -= previousValue.ball_ok50;
                                sumBall_ok25 -= previousValue.ball_ok25;
                                sumBall_ok00 -= previousValue.ball_ok00;
                                sumBall_ok_25 -= previousValue.ball_ok_25;
                                sumBall_ok_50 -= previousValue.ball_ok_50;
                            }

                            if (item.ball_ok50 < previousValue.ball_ok50) {
                                sumBall_ok50 += previousValue.ball_ok50;
                                if (sumBall_ok50 === 0) {
                                    if (item.ball_ok50 < previousValue.ball_ok50) {
                                        sumBall_ok50 = 0;
                                    } else {
                                        sumBall_ok50 -= previousValue.ball_ok50;
                                    }
                                }
                            }
                            if (item.ball_ok25 < previousValue.ball_ok25) {
                                sumBall_ok25 += previousValue.ball_ok25;
                                if (sumBall_ok25 === 0) {
                                    if (item.ball_ok25 < previousValue.ball_ok25) {
                                        sumBall_ok25 = 0;
                                    } else {
                                        sumBall_ok25 -= previousValue.ball_ok25;
                                    }
                                }
                            }
                            if (item.ball_ok00 < previousValue.ball_ok00) {
                                sumBall_ok00 += previousValue.ball_ok00;
                                if (sumBall_ok00 === 0) {
                                    if (item.ball_ok00 < previousValue.ball_ok00) {
                                        sumBall_ok00 = 0;
                                    } else {
                                        sumBall_ok00 -= previousValue.ball_ok00;
                                    }
                                }
                            }
                            if (item.ball_ok_25 < previousValue.ball_ok_25) {
                                sumBall_ok_25 += previousValue.ball_ok_25;
                                if (sumBall_ok_25 === 0) {
                                    if (item.ball_ok_25 < previousValue.ball_ok_25) {
                                        sumBall_ok_25 = 0;
                                    } else {
                                        sumBall_ok_25 -= previousValue.ball_ok_25;
                                    }
                                }
                            }
                            if (item.ball_ok_50 < previousValue.ball_ok_50) {
                                sumBall_ok_50 += previousValue.ball_ok_50;
                                if (sumBall_ok_50 === 0) {
                                    if (item.ball_ok_50 < previousValue.ball_ok_50) {
                                        sumBall_ok_50 = 0;
                                    } else {
                                        sumBall_ok_50 -= previousValue.ball_ok_50;
                                    }
                                }
                            }

                            if (item.mfg_date === itemMfgDate && item.registered_at.getUTCHours() === 7) {
                                sumBall_ok50 += item.ball_ok50;
                                sumBall_ok25 += item.ball_ok25;
                                sumBall_ok00 += item.ball_ok00;
                                sumBall_ok_25 += item.ball_ok_25;
                                sumBall_ok_50 += item.ball_ok_50;
                            }
                            if (isNaN(sumBall_ok50)) {
                                sumBall_ok50 = 0;
                            }
                            if (isNaN(sumBall_ok25)) {
                                sumBall_ok25 = 0;
                            }
                            if (isNaN(sumBall_ok00)) {
                                sumBall_ok00 = 0;
                            }
                            if (isNaN(sumBall_ok_25)) {
                                sumBall_ok_25 = 0;
                            }
                            if (isNaN(sumBall_ok_50)) {
                                sumBall_ok_50 = 0;
                            }
                        }
                    });
                    if (sumBall_ok50 > 0 || sumBall_ok25 > 0 || sumBall_ok00 > 0 || sumBall_ok_25 > 0 || sumBall_ok_50 > 0) {
                        sumDataBall.push({
                            mfg_date: itemMfgDate,
                            mc_no: itemMcNo,
                            wos_no: itemWos,
                            sumBall_ok50,
                            sumBall_ok25,
                            sumBall_ok00,
                            sumBall_ok_25,
                            sumBall_ok_50,
                        });
                        sumBall_ok50 = 0;
                        sumBall_ok25 = 0;
                        sumBall_ok00 = 0;
                        sumBall_ok_25 = 0;
                        sumBall_ok_50 = 0;
                    }
                });
            });
        });

        // Query ball from WOS
        let formattedWos = wosData.map((item) => `'${item}'`).join(", ");
        let resultWos = await dbms.query(
            `
                SELECT
                    [wos_no]
                    ,[part_no]
                    ,[ball]
                    ,[ball_material]
                    ,[ball_qty]
                FROM [MASTER_BOM_ALL]
                WHERE
                    wos_no IN (${formattedWos})
            `
        );
        resultWos = resultWos[0];

        // remove GXX
        resultWos = resultWos.map((item) => {
            let indexG = item.ball.indexOf("G");
            let newBall;
            if (indexG > 0) {
                newBall = item.ball.slice(0, indexG).trim();
            }
            return { ...item, ball: newBall };
        });

        sumDataBall = sumDataBall.map((itemSum) => {
            const matchingWos = resultWos.find((itemWos) => itemWos.wos_no === itemSum.wos_no);
            if (matchingWos) {
                return {
                    ...itemSum,
                    ...matchingWos,
                    totalResultBall50: itemSum.sumBall_ok50 * matchingWos.ball_qty,
                    totalResultBall25: itemSum.sumBall_ok25 * matchingWos.ball_qty,
                    totalResultBall00: itemSum.sumBall_ok00 * matchingWos.ball_qty,
                    totalResultBall_25: itemSum.sumBall_ok_25 * matchingWos.ball_qty,
                    totalResultBall_50: itemSum.sumBall_ok_50 * matchingWos.ball_qty,
                };
            }
        });

        // Material for select
        let materialSelect = [...new Set(sumDataBall.map((item) => item.ball_material))];
        materialSelect = materialSelect.filter((item) => item !== null);
        let afFilterMaterial;
        if (!materialQuery || materialQuery === "ALL") {
            afFilterMaterial = sumDataBall;
        } else {
            afFilterMaterial = sumDataBall.filter((item) => {
                return item.ball_material === materialQuery;
            });
        }

        // Ball for select
        let ballSelect = [...new Set(afFilterMaterial.map((item) => item.ball))];
        ballSelect = ballSelect.filter((item) => item !== null);
        let afFilterSize;
        if (!sizeQuery || sizeQuery === "ALL") {
            afFilterSize = afFilterMaterial;
        } else {
            afFilterSize = afFilterMaterial.filter((item) => {
                return item.ball === sizeQuery;
            });
        }

        // Part for select
        let partSelect = [...new Set(afFilterSize.map((item) => item.part_no))];
        partSelect = partSelect.filter((item) => item !== null);
        let afFilterPart;
        if (!partQuery || partQuery === "ALL") {
            afFilterPart = afFilterSize;
        } else {
            afFilterPart = afFilterSize.filter((item) => {
                return item.part_no === partQuery;
            });
        }

        // M/C No for select
        let mcNoSelect = [...new Set(afFilterPart.map((item) => item.mc_no))];
        mcNoSelect = mcNoSelect.filter((item) => item !== null);
        let afFilterMcNo;
        if (!machineQuery || machineQuery === "ALL") {
            afFilterMcNo = afFilterPart;
        } else {
            afFilterMcNo = afFilterPart.filter((item) => {
                return item.mc_no === machineQuery;
            });
        }

        // ---------- DataChart ----------
        let dataForChartDate50 = [];
        let dataForChartDate25 = [];
        let dataForChartDate00 = [];
        let dataForChartDate_25 = [];
        let dataForChartDate_50 = [];
        mfgDateData.map((itemMfg) => {
            let totalBall50 = 0;
            let totalBall25 = 0;
            let totalBall00 = 0;
            let totalBall_25 = 0;
            let totalBall_50 = 0;
            afFilterMcNo.map((itemSum) => {
                if (itemSum.mfg_date === itemMfg) {
                    totalBall50 += itemSum.totalResultBall50;
                    totalBall25 += itemSum.totalResultBall25;
                    totalBall00 += itemSum.totalResultBall00;
                    totalBall_25 += itemSum.totalResultBall_25;
                    totalBall_50 += itemSum.totalResultBall_50;
                }
            });
            dataForChartDate50.push(totalBall50);
            dataForChartDate25.push(totalBall25);
            dataForChartDate00.push(totalBall00);
            dataForChartDate_25.push(totalBall_25);
            dataForChartDate_50.push(totalBall_50);
        });

        const dataForChartDateShow = {
            date: mfgDateData,
            result: [
                {
                    name: "Ball +5.0",
                    data: dataForChartDate50,
                },
                {
                    name: "Ball +2.5",
                    data: dataForChartDate25,
                },
                {
                    name: "Ball 0.0",
                    data: dataForChartDate00,
                },
                {
                    name: "Ball -2.5",
                    data: dataForChartDate_25,
                },
                {
                    name: "Ball -5.0",
                    data: dataForChartDate_50,
                },
            ],
        };

        // ------- Data Chart ball -------
        let dataForChartBall50 = [];
        let dataForChartBall25 = [];
        let dataForChartBall00 = [];
        let dataForChartBall_25 = [];
        let dataForChartBall_50 = [];
        ballSelect.map((itemBall) => {
            let totalBall50 = 0;
            let totalBall25 = 0;
            let totalBall00 = 0;
            let totalBall_25 = 0;
            let totalBall_50 = 0;
            afFilterMcNo.map((itemSum) => {
                if (itemSum.ball === itemBall) {
                    totalBall50 += itemSum.totalResultBall50;
                    totalBall25 += itemSum.totalResultBall25;
                    totalBall00 += itemSum.totalResultBall00;
                    totalBall_25 += itemSum.totalResultBall_25;
                    totalBall_50 += itemSum.totalResultBall_50;
                }
            });
            dataForChartBall50.push(totalBall50);
            dataForChartBall25.push(totalBall25);
            dataForChartBall00.push(totalBall00);
            dataForChartBall_25.push(totalBall_25);
            dataForChartBall_50.push(totalBall_50);
        });

        const dataForChartBall = {
            ball: ballSelect,
            result: [
                {
                    name: "Ball +5.0",
                    data: dataForChartBall50,
                },
                {
                    name: "Ball +2.5",
                    data: dataForChartBall25,
                },
                {
                    name: "Ball 0.0",
                    data: dataForChartBall00,
                },
                {
                    name: "Ball -2.5",
                    data: dataForChartBall_25,
                },
                {
                    name: "Ball -5.0",
                    data: dataForChartBall_50,
                },
            ],
        };

        // ------- Data Chart part -------
        let dataForChartPart50 = [];
        let dataForChartPart25 = [];
        let dataForChartPart00 = [];
        let dataForChartPart_25 = [];
        let dataForChartPart_50 = [];
        let partSelectForChart = [];
        partSelect.map((itemPart) => {
            let totalBall50 = 0;
            let totalBall25 = 0;
            let totalBall00 = 0;
            let totalBall_25 = 0;
            let totalBall_50 = 0;
            afFilterMcNo.map((itemSum) => {
                if (itemSum.part_no === itemPart) {
                    totalBall50 += itemSum.totalResultBall50;
                    totalBall25 += itemSum.totalResultBall25;
                    totalBall00 += itemSum.totalResultBall00;
                    totalBall_25 += itemSum.totalResultBall_25;
                    totalBall_50 += itemSum.totalResultBall_50;
                }
            });
            dataForChartPart50.push(totalBall50);
            dataForChartPart25.push(totalBall25);
            dataForChartPart00.push(totalBall00);
            dataForChartPart_25.push(totalBall_25);
            dataForChartPart_50.push(totalBall_50);
        });
        

        const dataForChartPart = {
            part: partSelect,
            result: [
                {
                    name: "Ball +5.0",
                    data: dataForChartPart50,
                },
                {
                    name: "Ball +2.5",
                    data: dataForChartPart25,
                },
                {
                    name: "Ball 0.0",
                    data: dataForChartPart00,
                },
                {
                    name: "Ball -2.5",
                    data: dataForChartPart_25,
                },
                {
                    name: "Ball -5.0",
                    data: dataForChartPart_50,
                },
            ],
        };

        // ------- Data Chart M/C -------
        let dataForChartMcNo50 = [];
        let dataForChartMcNo25 = [];
        let dataForChartMcNo00 = [];
        let dataForChartMcNo_25 = [];
        let dataForChartMcNo_50 = [];
        mcNoSelect.map((itemMcNo) => {
            let totalBall50 = 0;
            let totalBall25 = 0;
            let totalBall00 = 0;
            let totalBall_25 = 0;
            let totalBall_50 = 0;
            afFilterMcNo.map((itemSum) => {
                if (itemSum.mc_no === itemMcNo) {
                    totalBall50 += itemSum.totalResultBall50;
                    totalBall25 += itemSum.totalResultBall25;
                    totalBall00 += itemSum.totalResultBall00;
                    totalBall_25 += itemSum.totalResultBall_25;
                    totalBall_50 += itemSum.totalResultBall_50;
                }
            });
            dataForChartMcNo50.push(totalBall50);
            dataForChartMcNo25.push(totalBall25);
            dataForChartMcNo00.push(totalBall00);
            dataForChartMcNo_25.push(totalBall_25);
            dataForChartMcNo_50.push(totalBall_50);
        });

        const dataForChartMcNo = {
            mcNo: mcNoSelect,
            result: [
                {
                    name: "Ball +5.0",
                    data: dataForChartMcNo50,
                },
                {
                    name: "Ball +2.5",
                    data: dataForChartMcNo25,
                },
                {
                    name: "Ball 0.0",
                    data: dataForChartMcNo00,
                },
                {
                    name: "Ball -2.5",
                    data: dataForChartMcNo_25,
                },
                {
                    name: "Ball -5.0",
                    data: dataForChartMcNo_50,
                },
            ],
        };

        // ---------- DataTable ----------
        const dataForTable = afFilterMcNo.map((item, index) => {
            return {
                id: index + 1,
                date: item.mfg_date,
                machine: item.mc_no.toUpperCase(),
                partNo: item.part_no,
                ballSize: item.ball,
                qty50: item.totalResultBall50,
                qty25: item.totalResultBall25,
                qty00: item.totalResultBall00,
                qty_25: item.totalResultBall_25,
                qty_50: item.totalResultBall_50,
            };
        });

        // DataTable summary data
        const sumDataTotalBall50 = dataForTable.reduce((acc, value) => {
            return acc + value.qty50;
        }, 0);
        const sumDataTotalBall25 = dataForTable.reduce((acc, value) => {
            return acc + value.qty25;
        }, 0);
        const sumDataTotalBall00 = dataForTable.reduce((acc, value) => {
            return acc + value.qty00;
        }, 0);
        const sumDataTotalBall_25 = dataForTable.reduce((acc, value) => {
            return acc + value.qty_25;
        }, 0);
        const sumDataTotalBall_50 = dataForTable.reduce((acc, value) => {
            return acc + value.qty_50;
        }, 0);

        dataForTable.push({
            id: dataForTable.length,
            date: "Total",
            qty50: sumDataTotalBall50,
            qty25: sumDataTotalBall25,
            qty00: sumDataTotalBall00,
            qty_25: sumDataTotalBall_25,
            qty_50: sumDataTotalBall_50,
        });

        res.json({
            materialSelect,
            ballSelect,
            partSelect,
            mcNoSelect,
            afFilterPart,
            dataForChartDateShow,
            dataForChartBall,
            dataForChartPart,
            dataForChartMcNo,
            dataForTable,
        });
    } catch (error) {
        console.log(error);
        res.json({
            error: error,
            result: "NO DATA",
        });
    }
});

module.exports = router;
