const newsWrapperDOM = document.querySelector('.news-wrapper')
const searchInput = document.querySelector('.search-input')
const loadingSpinnerDOM = document.querySelector('.loading-spinner')

document.addEventListener('DOMContentLoaded', async () => {
  displayLoadingSpinner()

  const headlineNews = await fetchNews(
    'https://newsapi.org/v2/top-headlines?country=id&apiKey=800b96523eaa4413933c7b21f14845ff'
  )

  displayNews(headlineNews)
})

searchInput.addEventListener('keyup', async (e) => {
  displayLoadingSpinner()

  let url

  if (e.target.value !== '') {
    url = `https://newsapi.org/v2/everything?q="${e.target.value}"&language=id&sortBy=publishedAt&apiKey=800b96523eaa4413933c7b21f14845ff`
  } else {
    url =
      'https://newsapi.org/v2/top-headlines?country=id&apiKey=800b96523eaa4413933c7b21f14845ff'
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
