/* eslint-disable prettier/prettier */
import BaseClient from "./BaseClient";

class OrdersPlaceClient extends BaseClient {
    constructor(host, apiKey, endpoint) {
        super();
        this._host = host;
        this._apiKey = apiKey;
        this._endpoint = endpoint;
    }

    async orderPlace(data) {
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
    };

    async confirmPayment(invoiceId) {
      let query = { 
        invoiceId: invoiceId
      }
      let url = this.getUrl(this._host + this._endpoint + "/confirm",query);
      let headers = {
        "Content-Type": "application/json",
      };
      if (process.client) {
        let token = localStorage.getItem("token");
        if (token && token.length > 0) headers["X-AUTH-TOKEN"] = token;
    }
    //   if (localStorage.getItem("token")) {
    //     headers["X-AUTH-TOKEN"] = localStorage.getItem("token");
    //   }
      headers["X-API-KEY"] = this._apiKey;
      headers["X-DEVICE-ID"] = "aa=";
  
      return this.makeRequest(url, "PATCH", {}, headers);
  };

  async cancelPayment(invoiceId) {
      let query = { 
        invoiceId: invoiceId
      }
      let url = this.getUrl(this._host + this._endpoint + "/cancel",query);
      let headers = {
        "Content-Type": "application/json",
      };
      if (process.client) {
        let token = localStorage.getItem("token");
        if (token && token.length > 0) headers["X-AUTH-TOKEN"] = token;
    }
    //   if (localStorage.getItem("token")) {
    //     headers["X-AUTH-TOKEN"] = localStorage.getItem("token");
    //   }
      headers["X-API-KEY"] = this._apiKey;
      headers["X-DEVICE-ID"] = "aa=";

      return this.makeRequest(url, "PATCH", {}, headers);
  };

  async failurePayment(invoiceId) {
      let query = { 
        invoiceId: invoiceId
      }
      let url = this.getUrl(this._host + this._endpoint + "/failure",query);
      let headers = {
        "Content-Type": "application/json",
      };
      if (process.client) {
        let token = localStorage.getItem("token");
        if (token && token.length > 0) headers["X-AUTH-TOKEN"] = token;
    }
    //   if (localStorage.getItem("token")) {
    //     headers["X-AUTH-TOKEN"] = localStorage.getItem("token");
    //   }
      headers["X-API-KEY"] = this._apiKey;
      headers["X-DEVICE-ID"] = "aa=";

      return this.makeRequest(url, "PATCH", {}, headers);
  };
}
export default OrdersPlaceClient;
