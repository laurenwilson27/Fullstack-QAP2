// Function to route incoming HTTP requests to the appropriate function
const routeRequest = (req, res) => {
  // Switch based on the requested URL
  switch (req.url) {
    case "/":
      if (DEBUG) console.log("Route: /");
      break;
    case "/about":
      if (DEBUG) console.log("Route: about");
      break;
    case "/contact":
      if (DEBUG) console.log("Route: contact");
      break;
    case "/products":
      if (DEBUG) console.log("Route: products");
      break;
    case "/subscribe":
      if (DEBUG) console.log("Route: subscribe");
      break;
    default:
      if (DEBUG) console.log("Route: unknown (404)");
  }
};

module.exports = {
  routeRequest,
};
