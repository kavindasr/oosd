// change credentials before run the server
const ksr = {
  connectionLimit: 10,
  user: "ksr",
  password: "ksr199841",
  host: "localhost",
  database: "oosd3",
};

const rnj = {
  connectionLimit: 10,
  user: "root",
  password: "Roshi#@97324",
  host: "localhost",
  database: "wms_db",
};

const msb = {
  connectionLimit: 10,
  user: "root",
  password: "Meelan@37562",
  host: "localhost",
  database: "wmsdb",
};

const isr = {
  connectionLimit: 10,
  user: "root",
  password: "rootisuru",
  host: "localhost",
  database: "newoosddb",
};
//dsfds
exports.dbConfig = msb;

exports.webSettings = {
  webport: 8000,
  protocol: "http",
  host: "localhost",
};
