const Home = (argument = '') => {
  const render = () => {
    pageContent.innerHTML = `
      <section class="home">
      <h2> HOME </h2>
        <div class="articles">Hey, this page is a Home template, about : ${argument}</div>
      </section>
    `;
  };
  render();
};

export  {Home} ;