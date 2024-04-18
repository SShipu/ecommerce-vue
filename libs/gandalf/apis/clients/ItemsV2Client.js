// import HttpClient from "../http-commons/HttpClient.js";
import BaseClient from "./BaseClient";

class ItemsV2Client extends BaseClient {
    constructor(host, apiKey, endpoint) {
        super();
        this._host = host;
        this._apiKey = apiKey;
        this._endpoint = endpoint;
    }

    async findOneDescriptions(params) {
        let url = this.getUrl(this._host + '/api/items/desc', params);
        let headers = {
            'Content-Type': 'application/json',
        };

        headers['X-API-KEY'] = this._apiKey;
        headers['X-DEVICE-ID'] = 'aa=';
        if (process.client) {
            let token = localStorage.getItem("token");
            if (token && token.length > 0) headers["X-AUTH-TOKEN"] = token;
        }

        return this.makeRequest(url, 'GET', {}, headers);
    }

}

export default ItemsV2Client;
