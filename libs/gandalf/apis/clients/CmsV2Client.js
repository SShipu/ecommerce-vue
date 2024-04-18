// import HttpClient from "../http-commons/HttpClient.js";
import BaseClient from "./BaseClient";

class CmsV2Client extends BaseClient {
    constructor(host, apiKey, endpoint) {
        super(host, apiKey, endpoint);
    }

    async fetchAttributes(params) {
        let url = this.getUrl(this._host + this._endpoint + "/attrs/text", params);
        let headers = {
            'Content-Type': 'application/json',
        };

        headers['X-API-KEY'] = this._apiKey;
        headers['X-DEVICE-ID'] = 'aa=';
        let token = localStorage.getItem('token');
        if (token && token.length > 0) headers['X-AUTH-TOKEN'] = token;

        return this.makeRequest(url, 'GET', {}, headers);
    }

    async fetchArticles(data) {
        let url = this._host + this._endpoint + '/articles/search';
        let headers = {
            'Content-Type': 'application/json',
        };

        headers['X-API-KEY'] = this._apiKey;
        headers['X-DEVICE-ID'] = 'aa=';
        let token = localStorage.getItem('token');
        if (token && token.length > 0) headers['X-AUTH-TOKEN'] = token;

        return this.makeRequest(url, 'POST', data, headers);
    }

    // async fetchArticles(params) {
    //     let url = this.getUrl(this._host + this._endpoint + '/articles', params);
    //     let headers = {
    //         'Content-Type': 'application/json',
    //     };

    //     headers['X-API-KEY'] = this._apiKey;
    //     headers['X-DEVICE-ID'] = 'aa=';
    //     let token = localStorage.getItem('token');
    //     if (token && token.length > 0) headers['X-AUTH-TOKEN'] = token;

    //     return this.makeRequest(url, 'GET', {}, headers);
    // }

    async fetchBulletPoints(params) {
        let url = this.getUrl(this._host + this._endpoint + '/bullets', params);
        let headers = {
            'Content-Type': 'application/json',
        };

        headers['X-API-KEY'] = this._apiKey;
        headers['X-DEVICE-ID'] = 'aa=';
        let token = localStorage.getItem('token');
        if (token && token.length > 0) headers['X-AUTH-TOKEN'] = token;

        return this.makeRequest(url, 'GET', {}, headers);
    }

    // async fetchSliderImages(params) {
    //     let url = this.getUrl(this._host + "/api/cms/sliders/images", params);
    //     let headers = {
    //         'Content-Type': 'application/json',
    //     };

    //     headers['X-API-KEY'] = this._apiKey;
    //     headers['X-DEVICE-ID'] = 'aa=';
    //     let token = localStorage.getItem('token');
    //     if (token && token.length > 0) headers['X-AUTH-TOKEN'] = token;

    //     return this.makeRequest(url, 'GET', {}, headers);
    // }

    // async fetchVariantsImages(params) {
    //     let url = this.getUrl(this._host + "/api/items/cms/variants/images", params);
    //     let headers = {
    //         'Content-Type': 'application/json',
    //     };

    //     headers['X-API-KEY'] = this._apiKey;
    //     headers['X-DEVICE-ID'] = 'aa=';
    //     let token = localStorage.getItem('token');
    //     if (token && token.length > 0) headers['X-AUTH-TOKEN'] = token;

    //     return this.makeRequest(url, 'GET', {}, headers);
    // }
}

export default CmsV2Client;
