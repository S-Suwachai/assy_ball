const Sequelize = require("sequelize");
const dbms = new Sequelize("demo", "sa", "sa@admin", {
    // host: "localhost",
    host: "192.168.64.1",
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