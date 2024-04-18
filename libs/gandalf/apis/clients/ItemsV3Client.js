// import HttpClient from "../http-commons/HttpClient.js";
import BaseClient from "./BaseClient";

class ItemsV3Client extends BaseClient {
    constructor(host, apiKey, endpoint) {
        super();
        this._host = host;
        this._apiKey = apiKey;
        this._endpoint = endpoint;
    }

    async findOneJoin(params) {
        let url = this.getUrl(this._host + this._endpoint + '/joined', params);
        let headers = {
            'Content-Type': 'application/json',
        };

        headers['X-API-KEY'] = this._apiKey;
        headers['X-DEVICE-ID'] = 'aa=';
        let token = localStorage.getItem('token');
        if (token && token.length > 0) headers['X-AUTH-TOKEN'] = token;

        return this.makeRequest(url, 'GET', {}, headers);
    }

    async findOneAttachment(data) {
        // let url = this.getUrl(this._host + '/api/items/attachments/search', params);
        let url = this._host + '/api/items/attachments/search';
        let headers = {
            'Content-Type': 'application/json',
        };

        headers['X-API-KEY'] = this._apiKey;
        headers['X-DEVICE-ID'] = 'aa=';
        let token = localStorage.getItem('token');
        if (token && token.length > 0) headers['X-AUTH-TOKEN'] = token;

        return this.makeRequest(url, 'POST', data, headers);
    }

    async fetchRelatedProduct(data) {
        let url = this._host + '/api/items/linked/search';
        let headers = {
            'Content-Type': 'application/json',
        };
        headers['X-API-KEY'] = this._apiKey;
        headers['X-DEVICE-ID'] = 'aa=';
        let token = localStorage.getItem('token');
        if (token && token.length > 0) headers['X-AUTH-TOKEN'] = token;

        return this.makeRequest(url, 'POST', data, headers);
    }

}

export default ItemsV3Client;
