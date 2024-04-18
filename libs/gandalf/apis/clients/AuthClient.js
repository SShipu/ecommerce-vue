// import HttpClient from "../http-commons/HttpClient.js";
import HttpClient from "../http-commons/NuxtHttpClient.js";

class AuthClient extends HttpClient {
  constructor(host, apiKey) {
    super();
    this._apiKey = apiKey;
    this._host = host;
    this._signInEndPoint = "/api/signin/customers";
    this._signUpEndPoint = "/api/signup";
    this._signOutEndPoint = "/api/auth/signout";
    this._forgotPasswordEndPoint = "/api/forgot";
    this._changePasswordEndpoint = "/api/auth/change";
    this._customersEndpoint = "/api/customers";
  }

  async fetchCustomer() {
    let url = this._host + this._customersEndpoint;
    let headers = {
      "Content-Type": "application/json",
    };
    if (process.client) {
        let token = localStorage.getItem("token");
        if (token && token.length > 0) headers["X-AUTH-TOKEN"] = token;
    }
    // if (localStorage.getItem("token")) {
    //   headers["X-AUTH-TOKEN"] = localStorage.getItem("token");
    // }
    headers["X-API-KEY"] = this._apiKey;
    headers["X-DEVICE-ID"] = "aa=";

    return this.makeRequest(url, "GET", {}, headers);
  }

  async signIn(data) {
    let url = this._host + this._signInEndPoint;
    let headers = {
      "Content-Type": "application/json",
    };
    headers["X-API-KEY"] = this._apiKey;
    headers["X-DEVICE-ID"] = "aa=";
    return this.makeRequest(url, "POST", data, headers);
  }

  async signUp(data) {
    let url = this._host + this._signUpEndPoint;
    let headers = {
      "Content-Type": "application/json",
    };
    headers["X-API-KEY"] = this._apiKey;
    headers["X-DEVICE-ID"] = "aa=";
    return this.makeRequest(url, "POST", data, headers);
  }

  async signOut() {
    let url = this._host + this._signOutEndPoint;
    let headers = {
      "Content-Type": "application/json",
    };
    headers["X-API-KEY"] = this._apiKey;
    headers["X-DEVICE-ID"] = "aa=";
    if (process.client) {
        let token = localStorage.getItem("token");
        if (token && token.length > 0) headers["X-AUTH-TOKEN"] = token;
    }
    return this.makeRequest(url, "POST", {}, headers);
  }

    async update(data) {
        let url = this._host + this._customersEndpoint;
        let headers = {
            'Content-Type': 'application/json',
        };

        headers['X-API-KEY'] = this._apiKey;
        headers['X-DEVICE-ID'] = 'aa=';
        if (process.client) {
            let token = localStorage.getItem("token");
            if (token && token.length > 0) headers["X-AUTH-TOKEN"] = token;
        }

        return this.makeRequest(url, 'PUT', data, headers);
    }

    async images(data) {
        let url = this._host + this._customersEndpoint + "/images";
        let headers = {
        "Content-Type": "application/json",
        };
        if (process.client) {
            let token = localStorage.getItem("token");
            if (token && token.length > 0) headers["X-AUTH-TOKEN"] = token;
        }
        headers["X-API-KEY"] = this._apiKey;
        headers["X-DEVICE-ID"] = "aa=";

        return this.makeRequest(url, "PATCH", data, headers);
    }

  async forgotPassword(data) {
    let url = this._host + this._forgotPasswordEndPoint;
    let headers = {
      "Content-Type": "application/json",
    };
    headers["X-API-KEY"] = this._apiKey;
    headers["X-DEVICE-ID"] = "aa=";
    return this.makeRequest(url, "POST", data, headers);
  }

  async changePassword(data) {
    let url = this._host + this._changePasswordEndpoint;

    let headers = {
      "Content-Type": "application/json",
    };
    headers['X-API-KEY'] = this._apiKey;
    headers['X-DEVICE-ID'] = 'aa=';

    if (process.client) {
        let token = localStorage.getItem("token");
        if (token && token.length > 0) headers["X-AUTH-TOKEN"] = token;
    }
    return this.makeRequest(url, 'POST', data, headers);
}

}

export default AuthClient;
