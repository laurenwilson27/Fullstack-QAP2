const fs = require("fs");
const myEmitter = require("./logEvents");

// Function to read a local file and send it as a response
// The status and headers of the response can be manually set - by default, status is 200 and the headers are for a text/html response.
// Having this header be determined automatically would be more flexible, but this is a simple assignment
const sendStaticFile = async (
  res,
  fName,
  status = 200,
  headers = { "Content-Type": "text/html" }
) => {
  fs.readFile(fName, (error, content) => {
    // Send a HTTP 500 if there was a problem reading the file
    if (error) {
      myEmitter.emit("error", "Failed to read file: " + fName);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500 Internal Server Error");
    } else {
      myEmitter.emit("ok", "File was sent: " + fName);
      res.writeHead(status, headers);
      res.end(content);
    }
  });
};

module.exports = {
  sendStaticFile,
};
