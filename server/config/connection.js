const mongoClient = require("mongodb").MongoClient;

const state = {
  db: null,
};

module.exports.connect = function (done) {
  const url =
    "mongodb+srv://zonin:*Zonin%40143%23@cluster0.xgj4vzd.mongodb.net/ecommerce?retryWrites=true&w=majority";
  const dbname = "ecommerce";

  mongoClient.connect(url, (err, data) => {
    if (err) return done(err);
    state.db = data.db(dbname);
    done();
  });
};

module.exports.get = function () {
  return state.db;
};
