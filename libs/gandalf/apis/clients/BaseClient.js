import HttpClient from "../http-commons/HttpClient.js";
// import HttpClient from "../http-commons/NuxtHttpClient.js";

class BaseClient extends HttpClient {
    constructor(host, apiKey, endpoint) {
        super();
        this._apiKey = apiKey;
        this._host = host;
        this._endpoint = endpoint;
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.findOne = this.findOne.bind(this);
        this.search = this.search.bind(this);
        this.delete = this.delete.bind(this);
    }

    async create(data) {
        let url = this._host + this._endpoint;
        let headers = {
            "Content-Type": "application/json",
        };

        headers["X-API-KEY"] = this._apiKey;
        headers["X-DEVICE-ID"] = "aa=";
        if (process.client) {
            let token = localStorage.getItem("token");
            if (token && token.length > 0) headers["X-AUTH-TOKEN"] = token;
        }

        return this.makeRequest(url, "POST", data, headers);
    }

    async update(data) {
        let url = this._host + this._endpoint;
        let headers = {
            "Content-Type": "application/json",
        };

        headers["X-API-KEY"] = this._apiKey;
        headers["X-DEVICE-ID"] = "aa=";
        if (process.client) {
            let token = localStorage.getItem("token");
            if (token && token.length > 0) headers["X-AUTH-TOKEN"] = token;
        }

        return this.makeRequest(url, "PUT", data, headers);
    }

    async findOne(params) {
        let url = this.getUrl(this._host + this._endpoint, params);
        let headers = {
            "Content-Type": "application/json",
        };

        headers["X-API-KEY"] = this._apiKey;
        headers["X-DEVICE-ID"] = "aa=";
        if (process.client) {
            let token = localStorage.getItem("token");
            if (token && token.length > 0) headers["X-AUTH-TOKEN"] = token;
        }

        return this.makeRequest(url, "GET", {}, headers);
    }

    async search(data) {
        let url = this._host + this._endpoint + "/search";
        let headers = {
            "Content-Type": "application/json",
        };
        headers["X-API-KEY"] = this._apiKey;
        headers["X-DEVICE-ID"] = "aa=";
        if (process.client) {
            let token = localStorage.getItem("token");
            if (token && token.length > 0) headers["X-AUTH-TOKEN"] = token;
        }

        return this.makeRequest(url, "POST", data, headers);
    }

    async delete(params) {
        let url = this.getUrl(this._host + this._endpoint, params);
        let headers = {
            "Content-Type": "application/json",
        };
        headers["X-API-KEY"] = this._apiKey;
        headers["X-DEVICE-ID"] = "aa=";
        if (process.client) {
            let token = localStorage.getItem("token");
            if (token && token.length > 0) headers["X-AUTH-TOKEN"] = token;
        }

        return this.makeRequest(url, "DELETE", {}, headers);
    }
}

export default BaseClient;
