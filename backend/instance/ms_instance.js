const Sequelize = require("sequelize");

// const dbms = new Sequelize("machine_data", "sa", "sa@admin", {
//     server: "192.168.100.10",
//     port : "1433",
//     dialect: "mssql",
//     dialectOptions: {
//         options: {
//             instanceName: "SQLEXPRESS",
//         },
//     },
// });

const dbms = new Sequelize({
    dialect: 'mssql',
    host: "192.168.100.10",
    username: "sa",
    password: "sa@admin",
    database: "machine_data",
    dialectOptions: {
        options: {
            // instanceName: "SQLEXPRESS",
            instanceName: "",
        }
    }
});

(async () => {
    await dbms.authenticate();
})();

module.exports = dbms;