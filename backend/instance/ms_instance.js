const Sequelize = require("sequelize");
// const dbms = new Sequelize("machine_data", "sa", "sa@admin", {
const dbms = new Sequelize("demo", "sa", "sa@admin", {
    // host: "192.168.100.10",
    host: "localhost",
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