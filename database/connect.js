const mongoose = require("mongoose");
const dotenv = require("dotenv");
class dbConnect {
  async connect() {
    dotenv.config();
    try {
      await mongoose.connect(process.env.DB_CONNECT, {
      });
      console.log("Databáze úspěšně připojena.");
    } catch (err) {
      throw new Error("K databázi se nelze připojit: " + err.message);
    }
  }
}

module.exports = new dbConnect();
