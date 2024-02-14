const fs = require("fs");

// Function to read a local file and send it as a response
// The content-type header of the response can be manually set, but defaults to text/html
// Having this header be determined automatically would be more flexible, but this is a simple assignment
const sendStaticFile = async (res, fName, fType = "text/html") => {
  fs.readFile(fName, (error, content) => {
    // Send a HTTP 500 if there was a problem reading the file
    if (error) {
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("500 Internal Server Error");
    } else {
      res.writeHead(200, { "Content-Type": fType });
      res.end(content);
    }
  });
};

module.exports = {
  sendStaticFile,
};
