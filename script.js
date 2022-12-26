const newsWrapperDOM = document.querySelector('.news-wrapper')
const searchInput = document.querySelector('.search-input')
const loadingSpinnerDOM = document.querySelector('.loading-spinner')

document.addEventListener('DOMContentLoaded', async () => {
  displayLoadingSpinner()

  const headlineNews = await fetchNews(
    'https://newsapi.org/v2/top-headlines?country=id&apiKey=d35e7e81adbb4b62bb8e4f9eb92109d4'
  )

  displayNews(headlineNews)
})

searchInput.addEventListener('keyup', async (e) => {
  displayLoadingSpinner()

  let searchKeyword = e.target.value.replace(/\s*$/, '')
  let url

  if (searchKeyword !== '') {
    url = `https://newsapi.org/v2/everything?q=${searchKeyword}&language=id&sortBy=publishedAt&apiKey=d35e7e81adbb4b62bb8e4f9eb92109d4`
  } else {
    url =
      'https://newsapi.org/v2/top-headlines?country=id&apiKey=d35e7e81adbb4b62bb8e4f9eb92109d4'
  }

  let searchResult = await fetchNews(url)

  displayNews(searchResult)
})

const fetchNews = async (url) => {
  try {
    const response = await fetch(url)
    const data = await response.json()

    return data.articles
  } catch (error) {
    return []
  }
}

const displayNews = (newsArr) => {
  if (newsArr.length > 0) {
    newsWrapperDOM.innerHTML = ''

    newsArr.forEach((news) => {
      newsWrapperDOM.innerHTML += `<div class="news-item mb-4">                              
                                      <img class="news-image" src=${
                                        news.urlToImage
                                      } />
                                      <div class="news-content">
                                        <h2 class="news-title">
                                          ${news.title}
                                        </h2>                                       
                                        <div class="news-meta-info">
                                          <span class="author">${
                                            news.author
                                          }</span> -
                                          <span class="publish-time">${news.publishedAt
                                            .replaceAll('-', '/')
                                            .replaceAll('T', ' ')
                                            .replaceAll('Z', '')}</span>
                                        </div>
                                        <div class="description">
                                          ${news.description}
                                        </div>
                                      </div>
                                      <a class="news-link" href=${
                                        news.url
                                      } target="_blank">  
                                        <button class="btn btn-danger ms-3 mb-2">Read more...</button>
                                      </a>
                                  </div>`
    })
  } else {
    newsWrapperDOM.innerHTML =
      '<h1 class="text-center w-100">Berita Tidak Ditemukan</h1>'
  }
  removeLoadingSpinner()
}

const displayLoadingSpinner = () => {
  newsWrapperDOM.classList.add('d-none')
  loadingSpinnerDOM.classList.remove('d-none')
}

const removeLoadingSpinner = () => {
  loadingSpinnerDOM.classList.add('d-none')
  newsWrapperDOM.classList.remove('d-none')
}
