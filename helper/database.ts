import mysql from "mysql-commands"
import config from "../config"

export default mysql.createConnection({
    host: config.host,
    user: config.user,
    password: config.password,
    database: config.database
})