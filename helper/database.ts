import mysql from "mysql-commands"

export default mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "bancho"
})