const NewsAPI = require("newsapi");
const news = new NewsAPI("596fa1c076094fbc994f13dd4442774e");

const getHeadlines = async () => {
  let headlines = await news.v2.topHeadlines({ country: "ca" });

  return headlines;
};

module.exports = {
  getHeadlines,
};
