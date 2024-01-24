const Sequelize = require("sequelize");
const dbms = new Sequelize("machine_data", "sa", "sa@admin", {
    // host: "192.168.100.10",
    server: "192.168.100.10",
    port : "1433",
    dialect: "mssql",
    dialectOptions: {
        options: {
            instanceName: "SQLEXPRESS",
        },
    },
});
(async () => {
    await dbms.authenticate();
})();

module.exports = dbms;