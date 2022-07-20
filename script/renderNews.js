const renderNews = (err, data) => {
  if (err) {
    console.warn(err, data);
    return;
  }

  const template = document.createDocumentFragment();
  const dataLimit = data.articles.slice(0, 8);
  const goods = dataLimit.map(item => {
    if (item.urlToImage === null) {
      item.urlToImage = '/img/image-no.png';
    }
    const card = document.createElement('li');
    card.className = 'news-item';
    card.innerHTML = `
    <img src="${item.urlToImage}" alt="${item.title}" class="news-image" height="200">
    <h3 class="news-title">
      <a href="${item.url}" class="news-link" target="_blank">${item.title}</a>
    </h3>
    <p class="news-description">${item.description}</p>
    <div class="news-footer">
      <time class="news-datetime" datetime="${item.publishedAt}">
        <span class="news-date">16/03/2022</span> 11:06
      </time>
      <p class="news-author">${item.author}</p>
    </div>
    `;
    return card;
  });

  template.append(...goods);
  return template;
};

export default renderNews;