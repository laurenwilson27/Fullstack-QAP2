const { sendStaticFile } = require("./files");
const myEmitter = require("./logEvents");

// Function to route incoming HTTP requests to the appropriate function
const routeRequest = async (req, res) => {
  // Switch based on the requested URL
  switch (req.url) {
    case "/":
      if (DEBUG) console.log("Route: /");
      sendStaticFile(res, "./views/root.html");
      break;

    case "/about":
      if (DEBUG) console.log("Route: about");
      sendStaticFile(res, "./views/about.html");
      break;

    case "/contact":
      if (DEBUG) console.log("Route: contact");
      sendStaticFile(res, "./views/contact.html");
      break;

    case "/products":
      if (DEBUG) console.log("Route: products");
      sendStaticFile(res, "./views/products.html");
      break;

    case "/subscribe":
      if (DEBUG) console.log("Route: subscribe");
      sendStaticFile(res, "./views/subscribe.html");
      break;

    // Handle the favicon.ico request which is expected from browsers
    case "/favicon.ico":
      if (DEBUG) console.log("Route: favicon");
      sendStaticFile(res, "./resources/favicon.ico", 200, "image/x-icon");
      break;

    default:
      if (DEBUG) console.log("Route: unknown (404)");
      myEmitter.emit("error", "Unknown route was requested: " + req.url);
      sendStaticFile(res, "./views/404.html", 404);
  }
};

module.exports = {
  routeRequest,
};
