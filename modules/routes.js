// Function to route incoming HTTP requests to the appropriate function
const routeRequest = (req, res) => {
  console.log(req.url);

  switch (req.url) {
    case "/":
      break;
    default:
  }
};

module.exports = {
  routeRequest,
};
