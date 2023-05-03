const showMore = document.getElementById('show-more')
const pageContent = document.getElementById('pageContent')
const choosePlatform = document.getElementById('platform')
const showmoreDOM = document.querySelector("#show-more");
const dropDown = document.querySelector(".games--dropdown")

const apikey = process.env.API_KEY
const url = `https://api.rawg.io/api/games?key=${apikey}&page_size=9`
const welcome = document.querySelector(".heading--bottom");

const PageList = (argument = '') => {
  let page = 1
  welcome.classList.remove("show-more--hide")
  showmoreDOM.classList.remove("show-more--hide")
  dropDown.classList.remove("hide")

  const preparePage = () => {
    const cleanedArgument = argument.replace(/\s+/g, "-");
  const displayResults = (articles) => {
    const resultsContent = articles.map((article) => (
      `<article class="cardGame">
          <div class="game--details" id="${article.id}">
            <a href="#pagedetail/${article.id}">
              <img class="game--image" src="${article.background_image}" >
              <div class="game--moredetails">
                <p>${article.released}</p>
                <p>${article.rating}/5 - ${article.ratings_count} votes</p>
                <p class="game--tags">${GameTags(article).join(",&nbsp")}</p>
              </div>
            </a>
          </div>
          <a class="a--underlined" href="#pagedetail/${article.id}"><h2 class="game--title">${article.name}</h2></a>
          <div class="game-platforms"></div>
      </article>`
    ));
    const resultsContainer = document.querySelector(".page-list .articles");
    resultsContainer.innerHTML += resultsContent.join("\n");
    articles.forEach((e) => {
      let gameId = document.getElementById(e.id)
      GamePlatforms(e, gameId.nextElementSibling)
    })
  };

  const fetchList = (url, argument, pagenumber) => {
    const finalURL = argument ? `${url}&search=${argument}&page=${pagenumber}` : `${url}&page=${pagenumber}&dates=2022-01-01,2023-12-31&ordering=-added`;
    fetch(finalURL)
      .then((response) => response.json())
      .then((responseData) => {
        displayResults(responseData.results)
      });
  };
      fetchList(url, cleanedArgument,page);
      console.log(cleanedArgument)
   

  showMore.addEventListener('click', () => {
    if (page < 2) {
      page += 1
      fetchList(url, cleanedArgument, page);
    } else {
      page += 1
      fetchList(url, cleanedArgument, page);
      showmoreDOM.classList.add("show-more--hide");
      page = 1
    }
  });
  };


    const render = () => {
      pageContent.innerHTML = `
      <section class="page-list">
        <div class="articles"></div>
      </section>
    `;

    preparePage();
  };

  render();
};


function GameTags(game) {
  let arrPlatforms = []
  game.tags.forEach((e) => {
    e.language == "eng" ? arrPlatforms.push(e.name) : null
  });
  return arrPlatforms.slice(0, 9);
}

function GamePlatforms(game, container) {
  const gamePlatformsContent = game.parent_platforms.map((e) => (
    `<a href='#pagelist/&platforms=${e.platform.id}'> <img class="platform--icon" src="./src/assets/images/${e.platform.slug}.svg"  > </a>`
  ));
  container.innerHTML += gamePlatformsContent.join("\n");
}

////////////// SEARCH /////////////////

let submitButton = document.getElementById("search-button")
let searchContent = document.getElementById("site-search")

submitButton.addEventListener('click', () => {
  searchContent.value == "" ? null : changeUrl(searchContent.value)
});
searchContent.addEventListener('keypress', e => e.key === 'Enter' ? changeUrl(searchContent.value) : null)


function changeUrl(value) {
  var queryParams = "#pagelist/"
  let newUrl = queryParams.concat(value + "&ordering=-added");
  window.location.href = newUrl
}

export {PageList} ;
