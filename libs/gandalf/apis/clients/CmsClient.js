// import HttpClient from "../http-commons/HttpClient.js";
import BaseClient from "./BaseClient";

class CmsClient extends BaseClient {
    constructor(host, apiKey, endpoint) {
        super();
        this._host = host;
        this._apiKey = apiKey;
        this._endpoint = endpoint;
    }

    async fetchAttributes(params) {
        let url = this.getUrl(this._host + "/api/v2/items/content", params);
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

    async fetchArticles(params) {
        let url = this.getUrl(this._host + this._endpoint + '/articles', params);
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

    async fetchBulletPoints(params) {
        let url = this.getUrl(this._host + this._endpoint + '/bullets', params);
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

    async fetchSliderImages(params) {
        let url = this.getUrl(this._host + "/api/cms/sliders/images", params);
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

    async fetchVariantsImages(params) {
        let url = this.getUrl(this._host + "/api/items/cms/variants/images", params);
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

    async addToWishlist(data) {
        let url = this._host + "/api/wishlists/items";
        let headers = {
            'Content-Type': 'application/json',
        };

        headers['X-API-KEY'] = this._apiKey;
        headers['X-DEVICE-ID'] = 'aa=';
        if (process.client) {
            let token = localStorage.getItem("token");
            if (token && token.length > 0) headers["X-AUTH-TOKEN"] = token;
        }

        return this.makeRequest(url, 'POST', data, headers);
    }

    async fetchWishlist(data) {
        let url = this._host + "/api/wishlists/items/search";
        let headers = {
            'Content-Type': 'application/json',
        };

        headers['X-API-KEY'] = this._apiKey;
        headers['X-DEVICE-ID'] = 'aa=';
        if (process.client) {
            let token = localStorage.getItem("token");
            if (token && token.length > 0) headers["X-AUTH-TOKEN"] = token;
        }

        return this.makeRequest(url, 'POST', data, headers);
    }

    async addAddress(data) {
        let url = this._host + "/api/addresses";
        let headers = {
            'Content-Type': 'application/json',
        };

        headers['X-API-KEY'] = this._apiKey;
        headers['X-DEVICE-ID'] = 'aa=';
        if (process.client) {
            let token = localStorage.getItem("token");
            if (token && token.length > 0) headers["X-AUTH-TOKEN"] = token;
        }

        return this.makeRequest(url, 'POST', data, headers);
    }

    async fetchAddress(data) {
        let url = this._host + "/api/addresses/search";
        let headers = {
            'Content-Type': 'application/json',
        };

        headers['X-API-KEY'] = this._apiKey;
        headers['X-DEVICE-ID'] = 'aa=';
        if (process.client) {
            let token = localStorage.getItem("token");
            if (token && token.length > 0) headers["X-AUTH-TOKEN"] = token;
        }

        return this.makeRequest(url, 'POST', data, headers);
    }

    async fetchQrs(params) {
        let url = this.getUrl(this._host + "/api/qrs", params);
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

export default CmsClient;
