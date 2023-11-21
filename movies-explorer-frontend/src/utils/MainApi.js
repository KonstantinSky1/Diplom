class MainApi {
  constructor({ baseUrl }) {
    this._baseUrl = baseUrl;
  }

  get _headers() {
    return {
      'Content-Type': 'application/json',
      authorization: `Bearer ${localStorage.getItem("jwt")}`
    }
  }

  _getResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  getUserMe() {
    return fetch(`${this._baseUrl}/users/me`,
      {
        method: 'GET',
        headers: this._headers
      }
    )
      .then(res => this._getResponse(res));
  }

  updateUser(name, email) {
    return fetch(`${this._baseUrl}/users/me`,
      {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          name,
          email
        })
      }
    )
      .then(res => this._getResponse(res));
  }

  postMovie({country, director, duration, year, description, image, trailerLink, thumbnail, movieId, nameRU, nameEN}) {
    return fetch(`${this._baseUrl}/movies`,
      {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          country,
          director,
          duration,
          year,
          description,
          image,
          trailerLink,
          thumbnail,
          movieId,
          nameRU,
          nameEN
        })
      }
    )
      .then(res => this._getResponse(res));
  }

  deleteMovie(_id) {
    return fetch(`${this._baseUrl}/movies/${_id}`,
      {
        method: 'DELETE',
        headers: this._headers
      }
    )
      .then(res => this._getResponse(res));
  }

  getMovies() {
    return fetch(`${this._baseUrl}/movies`,
      {
        method: 'GET',
        headers: this._headers
      }
    )
      .then(res => this._getResponse(res));
  }
}

const mainApi = new MainApi({
  baseUrl: 'http://localhost:3001',
});

export default mainApi;