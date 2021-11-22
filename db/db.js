const sql = require("mssql");
const {config} = require("./config");
class Connection {
  constructor() {
    this.connectToDb();
  }

  connectToDb = async () => {
    try {
      this.pool = await sql.connect(config);
      console.log("Connected to database");
    } catch (error) {
      console.log(error.message);
      // throw new Error(error);
    }
  };
  query = async (query, options) => {
    const results = await this.pool.request().query(query);
    return results;
  };
}

module.exports = {
  query: new Connection().query,
};
