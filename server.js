const http = require("http");
const { routeRequest } = require("./modules/routes");

const PORT = 4000;

// Create a server. Incoming HTTP requests are routed by routing.js
const server = http.createServer((req, res) => routeRequest(req, res));

server.listen(PORT, () => {
  console.log(
    "Server has started, and can be reached at http://localhost:" + PORT
  );
});
