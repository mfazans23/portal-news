const newsWrapperDOM = document.querySelector('.news-wrapper')
const searchInput = document.querySelector('.search-input')
const loadingSpinnerDOM = document.querySelector('.loading-spinner')

document.addEventListener('DOMContentLoaded', async () => {
  displayLoadingSpinner()

  const headlineNews = await fetchNews(
    'https://gnews.io/api/v4/top-headlines?token=277b39cdd2ec85119c2fdf052cd777da&lang=en'
  )

  displayNews(headlineNews)
})

searchInput.addEventListener('keyup', async (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    displayLoadingSpinner()

    let searchKeyword = e.target.value.replace(/\s*$/, '')
    let url

    if (searchKeyword !== '') {
      url = `https://gnews.io/api/v4/search?q=${searchKeyword}&token=277b39cdd2ec85119c2fdf052cd777da&lang=en`
    } else {
      url =
        'https://gnews.io/api/v4/top-headlines?token=277b39cdd2ec85119c2fdf052cd777da&lang=en'
    }

    let searchResult = await fetchNews(url)

    displayNews(searchResult)
  }
})

const fetchNews = async (url) => {
  try {
    const response = await fetch(url)
    const data = await response.json()

    return data.articles
  } catch (error) {
    console.log(error.message)
  }
}

const displayNews = (newsArr) => {
  if (newsArr.length > 0) {
    newsWrapperDOM.innerHTML = ''

    newsArr.forEach((news) => {
      newsWrapperDOM.innerHTML += `<div class="news-item mb-4">                              
                                      <img class="news-image" src=${
                                        news.image
                                      } />
                                      <div class="news-content">
                                        <h2 class="news-title">
                                          ${news.title}
                                        </h2>                                       
                                        <div class="news-meta-info">
                                          <span class="author">${
                                            news.source.name
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
