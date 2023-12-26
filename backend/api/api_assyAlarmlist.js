const express = require("express");
const router = express.Router();
const dbms = require("../instance/ms_instance");

// /assy/alarm
router.post("/alarmlist", async (req, res) => {
    try {
        let resultTopicAlarmlist = await dbms.query(
            `
                SELECT DISTINCT [topic]
                FROM [DATA_ALARMLIST_ASSY]
                ORDER by [topic]
            `
        );
        console.log(resultTopicAlarmlist[0]);
        res.json({
            resultTopicAlarmlist
        });
    } catch (error) {
        console.log(error);
        res.json({
            error: error,
        });
    }
});

module.exports = router;
