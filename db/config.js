module.exports = {
    config: {
        server: process.env.SQL_SERVER,
        database: process.env.SQL_DATABASE,
        user: process.env.SQL_USER,
        password: process.env.SQL_PASSWORD,
        options:{
            encrypt: false,
            enableArithAbort: true
        }
    }
}