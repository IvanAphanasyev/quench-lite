const app = require("./app");
const debug = require("debug")("quench-lite:server");
const http = require("http");
const config = require("dotenv").config();
//console.log("config from .env: ", config);

const port = normalizePort(process.env.PORT || "3000");
app.set("port", port);

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`server listen on port ${port} with pid ${process.pid}`);
});
server.on("error", onError);
server.on("listening", onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  var bind = typeof port === "string" ? "Pipe " + port : "Port " + port;

  switch (error.code) {
    case "EACCES":
      console.error(bind + " requires elevated privileges");
      process.exit(1);
      break;
    case "EADDRINUSE":
      console.error(bind + " is already in use");
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  const db = require("./models").sequelize.sync();
  debug("Listening on " + bind);
}
