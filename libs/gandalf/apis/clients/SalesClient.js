// import HttpClient from "../http-commons/HttpClient.js";
import BaseClient from "./BaseClient";

class SalesClient extends BaseClient {
    constructor(host, apiKey, endpoint) {
        super();
        this._host = host;
        this._apiKey = apiKey;
        this._endpoint = endpoint;
        // this._bookingsEndpoint = "/api/sales/search";
        // this._salesPinEndpoint = "/api/sales/pin";
        // this._cancelBookingOrderEndpoint = "/api/sales/cancel";
    }

    async fetchAll(data) {
        let url = this._host + this._endpoint;
        let headers = {
        "Content-Type": "application/json",
        };
        if (process.client) {
            let token = localStorage.getItem("token");
            if (token && token.length > 0) headers["X-AUTH-TOKEN"] = token;
        }
        // if (localStorage.getItem("token")) {
        // headers["X-AUTH-TOKEN"] = localStorage.getItem("token");
        // }
        headers["X-API-KEY"] = this._apiKey;
        headers["X-DEVICE-ID"] = "aa=";

        return this.makeRequest(url, "POST", data, headers);
    }

  async fetchBookings(data) {
    let url = this._host + this._endpoint;
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

    return this.makeRequest(url, "POST", data, headers);
  }

  async fetchSalePin(id) {
    let query = {
      id: id,
    }
    let url = this.getUrl(this._host + this._endpoint, query);
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

  async cancelBookingOrderById(id) {
    let query = {
      id: id,
    }
    let url = this.getUrl(this._host + this._endpoint, query);
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

    return this.makeRequest(url, "PATCH", {}, headers);
  }
  async paymentsAttachment(data) {
    let url = this._host + this._endpoint + "/payments/attachments";
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

    return this.makeRequest(url, "PATCH", data, headers);
  }
}

export default SalesClient;
