// This was a bit overkill, but it was good practise.
// On page load, this browser JS code queries the server's /news_data route, which responds with JSON from the API

const MAX_ARTICLES = 10;

document.addEventListener("DOMContentLoaded", async () => {
  let headlines;
  await fetch("/news_data").then(async (data) => {
    headlines = await data.json();
  });

  if (headlines.status != "ok") {
    document.querySelector("#news").innerHTML = "Failed to fetch news!";
  } else {
    // Find the div with the 'news' id - erase its contents and remember it so we can fill it in with the articles
    const newsElement = document.querySelector("#news");
    newsElement.innerHTML = "";

    // Iterate over the articles
    headlines.articles.forEach((article) => {
      // For each article, create an h4 element with the title and a link to the article
      let newPost = document.createElement("div");

      let newTitle = document.createElement("h4");
      newTitle.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
      newPost.appendChild(newTitle);

      newsElement.appendChild(newPost);
    });
  }
});
