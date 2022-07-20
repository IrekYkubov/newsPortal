import renderGoods from './script/renderNews.js';
import fetchRequest from './script/fetch.js';
const newsList = document.querySelector('.news-list');
const formSearch = document.querySelector('.form-search');
const main = document.querySelector('main');
const countryValue = formSearch.country;

const init = () => {
  return Promise.all([
    fetchRequest('https://newsapi.org/v2/top-headlines?country=ru', {
      method: 'get',
      headers: {
        'X-Api-Key': '71fb3fbca1ad457cb60fd0b9ed6a12e5'
      },
      callback: renderGoods,
    }),
  ]);
}
init().then(data => {
  newsList.append(data[0]);
});
// запрос на поиск
formSearch.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchInit = () => {
    return Promise.all([
      fetchRequest(`https://newsapi.org/v2/everything?q=${formSearch.search.value}`, {
        method: 'get',
        headers: {
          'X-Api-Key': '71fb3fbca1ad457cb60fd0b9ed6a12e5'
        },
        callback: renderGoods,
      }),
    ]);
  }
  searchInit().then(data => {
    main.insertAdjacentHTML('afterbegin', `
    <div class="title-wrapper">
    <div class="container">
      <h2 class="title">По вашему запросу “${formSearch.search.value}” найдено:</h2>
    </div>
  </div>
  <section class="news">
    <h2 class="visually-hidden">Список новостей</h2>

    <div class="container">
      <ul class="news-list search-news-list">
      </ul>
    </div>
  </section>
    `);
    document.querySelector('.search-news-list').append(data[0]);
  });
})

countryValue.addEventListener('change', () => {
  newsList.innerHTML = '';
  const newsCountry = () => {
    if (countryValue.value === '' || countryValue.value === 'ru') {
      return Promise.all([
        fetchRequest(`https://newsapi.org/v2/top-headlines?country=ru`, {
          method: 'get',
          headers: {
            'X-Api-Key': '71fb3fbca1ad457cb60fd0b9ed6a12e5'
          },
          callback: renderGoods,
        }),
      ]);
    } else {
      return Promise.all([
        fetchRequest(`https://newsapi.org/v2/top-headlines?country=${countryValue.value}`, {
          method: 'get',
          headers: {
            'X-Api-Key': '71fb3fbca1ad457cb60fd0b9ed6a12e5'
          },
          callback: renderGoods,
        }),
      ]);
    }
  }

  newsCountry().then(data => {
    newsList.append(data[0]);
  });
});