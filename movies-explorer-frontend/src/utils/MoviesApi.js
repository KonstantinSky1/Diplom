class MoviesApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  get _headers() {
    return {
      'Content-Type': 'application/json',
    }
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  getIntitialMovies() {
    return fetch(this._baseUrl, {
      method: 'GET',
      headers: this._headers
    })
      .then(res => this._getResponse(res))
      .then(res => {
        if (!res) return;

        localStorage.setItem('beatfilmMovies', JSON.stringify(res));

        return res;
      })
  }
}

const moviesApi = new MoviesApi({
  baseUrl: 'https://api.nomoreparties.co/beatfilm-movies'
});

export default moviesApi;