const apikey = process.env.API_KEY 
const welcome = document.querySelector(".heading--bottom");
const dropDown = document.querySelector(".games--dropdown")



const PageDetail = (argument = '') => {

  welcome.classList.add("show-more--hide")
  dropDown.classList.add("hide")

const preparePage = () => {
  const cleanedArgument = argument.replace(/\s+/g, "-");

  const displayGame = (gameData) => {
    const { background_image, website, name, rating, ratings_count, description, released, developers, platforms, publishers, genres, tags, stores, background_image_additional, id } = gameData;
    console.log(gameData)
    const heroDOM = document.querySelector(".page-hero");
    const articleDOM = document.querySelector(".page-detail .article");
    const buyDOM = document.querySelector(".page-detail .buy");
    const screenshotsDOM = document.querySelector(".page-detail .screenshots");
    const trailersDOM = document.querySelector(".page-detail .trailers");

    heroDOM.innerHTML = `
      <img class="hero-image" src="${background_image}">
      <a href="${website}" target="_blank">
        <div href="${website}" class="check-website">
          <span>Check Website</span>
          <span>▶</span>
        </div>
      </a>
      `;
    function getTrailer(id) {
      fetch(`https://api.rawg.io/api/games/${id}/movies?key=${apikey}`)
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          showTrailer(trailersDOM.querySelector("div.video-links"), response)

        })
        .catch((error) => {
          console.error('Response error:', error.message);
        });
    }


    articleDOM.querySelector(".article--top h1.title").innerHTML = name;
    articleDOM.querySelector(".article--top p.rating").innerHTML = `${rating}/5 - ${ratings_count} votes`;
    articleDOM.querySelector(".article--middle p.description").innerHTML = description;
    articleDOM.querySelector(".article--bottom p.released").innerHTML += released;
    articleDOM.querySelector(".article--bottom p.developers").innerHTML += `<a href='#pagelist/&dates=&developers=${developers[0].id}'>${nodeDetails(developers)}</a>`;
    articleDOM.querySelector(".article--bottom p.platforms").innerHTML += `<a href='#pagelist/&dates=&platform=${platforms[0].id}'>${gamePlatforms(platforms).join(",&nbsp")}</a>`;
    articleDOM.querySelector(".article--bottom p.publishers").innerHTML += `<a href='#pagelist/&dates=&publishers=${publishers[0].id}'>${nodeDetails(publishers).join(",&nbsp")}</a>`;
    articleDOM.querySelector(".article--bottom p.genres").innerHTML += `<a href='#pagelist/&dates=&genres=${genres[0].id}'>${nodeDetails(genres).join(",&nbsp")}</a>`;
    let smallTagList = nodeDetails(tags).slice(0, 9)
    articleDOM.querySelector(".article--bottom p.tags").innerHTML += `<a href='#pagelist/&dates=&tags=${tags[0].id}'>${smallTagList.join(",&nbsp")}</a>`;
    buyDOM.querySelector("div.buy-links").innerHTML = storesPlatforms(stores).join("");
    screenshotsDOM.querySelector("div.screenshots-links").innerHTML = `<img class="screenshots-img" src="${background_image}" /><img class="screenshots-img" src="${background_image_additional}" />`;
    trailersDOM.querySelector("div.video-links").innerHTML = getTrailer(id);
  };

  const fetchGame = (url, argument) => {
    fetch(`${url}/${argument}?key=27c30023aee943aebccd69559c75a5b7`)
      .then((response) => response.json())
      .then((responseData) => {
        displayGame(responseData);
      });
  };

  fetchGame("https://api.rawg.io/api/games", cleanedArgument);
};

const render = () => {
  pageContent.innerHTML = `
      <section class="page-hero">
      </section>
      <section class="page-detail">
        <div class="article">
          <div class="article--top">
            <h1 class="title"></h1>
            <p class="rating"></p>
          </div>
          <div class="article--middle">
            <p class="description"></p>
          </div>
          <div class="article--bottom">
            <p class="released" style="width: 25%"><b>Release Date</b><br></p>
            <p class="developers" style="width: 25%"><b>Developer</b><br></p>
            <p class="platforms" style="width: 25%"><b>Platforms</b><br></p>
            <p class="publishers" style="width: 25%"><b>Publisher</b><br></p>
            <p class="genres" style="width: 50%"><b>Genre</b><br></p>
            <p class="tags" style="width: 50%"><b>Tags</b><br></p>
          </div>
        </div>
        <div class="buy">
          <h1>BUY</h1>
          <div class="buy-links"></div>
        </div>
        <div class="screenshots">
          <h1>SCREENSHOTS</h1>
          <div class="screenshots-links"></div>
        </div>
        <div class="trailers">
          <h1>TRAILERS</h1>
          <div class="video-links"></div>
        </div>
        <div class="similar">
          <h1>SIMILAR GAMES</h1>
        </div>
      </section>
    `;

  preparePage();
};

render();
};


function gamePlatforms(node) {
 let arrPlatforms = []
  node.forEach((e) => {
    arrPlatforms.push(`${e.platform.name}`)
  });
  return arrPlatforms
}

function nodeDetails(node) {
 let arrNode = []
  node.forEach((e) => {
    arrNode.push(`${e.name}`)
  });
  return arrNode
}

function storesPlatforms(node) {
  let arrPlatforms = []
  node.forEach((e) => {
    arrPlatforms.push(`<a href="https://${e.store.domain}" target="_blank"><p class="store-links">${e.store.name}</p></a>`)
  });
  return arrPlatforms
}

const showTrailer = (placeholder, response) => {
  if (response.results.length > 0) {
    placeholder.innerHTML = `<video controls width="100%"><source src="${response.results[Object.keys(response.results)[0]].data.max}" type="video/mp4">Sorry, your browser doesn't support embedded videos.</video>`
  } else {
    placeholder.innerHTML = `<p>No trailer available</p>`
  }
}



export { PageDetail };