const authenticate = {
    baseUrl: /*'https://auth.nomoreparties.co'*/ 'http://localhost:3000',
    headers: {
        "Content-Type": "application/json",
    }

  }


export default class AuthApi {

    constructor(authenticate) {
      this._url = authenticate.baseUrl;
      this._headers = authenticate.headers;
    }
  
    #onResponse(res){
      if (res.ok) {
        return res.json();
      } return Promise.reject(`Ошибка: ${res.statusText}`);
     
    }
  /*
    getAllInfo() {
      return Promise.all([this.fetchUserInfo(), this.getInitialCards()])
    }
  */
    registerUser(data) {
      return fetch(`${this._url}/signup`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
            email: data.email,
            password: data.password            
        })
      })
      .then((res) => {
        return this.#onResponse(res)
    
      })
    }

   signInUser(data) {
    return fetch(`${this._url}/signin`, {
        method: "POST",
        headers: this._headers,
        body: JSON.stringify({
            email: data.email,
            password: data.password
             })
        })
        .then((res) => {
            return this.#onResponse(res)
        })
   }

   checkRegistration(jwt) {
    return fetch(`${this._url}/users/me`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${jwt}`
        }})
        .then((res) => {
            return this.#onResponse(res)
        })
   }

}

const authApi = new AuthApi(authenticate);
export { authApi };
/*
addNewCard(data) {
    return fetch (`${this._url}/cards`, {
      method: 'POST' ,
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then((res) => {
      return this.#onResponse(res)
    })
  }
  authorization: 'b5a51fa0-278d-4d53-aa46-c911f2ff46ff',
  */