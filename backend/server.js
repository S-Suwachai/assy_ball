const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/assy/ball", require("./api/api_assyBall"));
app.use("/assy/alarmlist", require("./api/api_assyAlarmlist"));

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});