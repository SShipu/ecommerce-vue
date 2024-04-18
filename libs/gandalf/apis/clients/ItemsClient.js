import BaseClient from './BaseClient';

class ItemsClient extends BaseClient {
    constructor(host, apiKey, endpoint) {
        super(host, apiKey, endpoint);
    }

    async fetchGlobalDiscount(data) {
        let url = this._host + '/api/global/discounts/search';
        let headers = {
            'Content-Type': 'application/json',
        };

        headers['X-API-KEY'] = this._apiKey;
        headers['X-DEVICE-ID'] = 'aa=';
        let token = localStorage.getItem('token');
        if (token && token.length > 0) headers['X-AUTH-TOKEN'] = token;

        return this.makeRequest(url, 'POST', data, headers);
    }

    async fetchGlobalCoupon(data) {
        let url = this._host + '/api/discount/coupons/search';
        let headers = {
            'Content-Type': 'application/json',
        };

        headers['X-API-KEY'] = this._apiKey;
        headers['X-DEVICE-ID'] = 'aa=';
        let token = localStorage.getItem('token');
        if (token && token.length > 0) headers['X-AUTH-TOKEN'] = token;

        return this.makeRequest(url, 'POST', data, headers);
    }

    async applyCoupon(params) {
        let url = this.getUrl(this._host + '/api/discount/coupons/apply', params);
        let headers = {
            'Content-Type': 'application/json',
        };
        headers['X-API-KEY'] = this._apiKey;
        headers['X-DEVICE-ID'] = 'aa=';
        let token = localStorage.getItem('token');
        if (token && token.length > 0) headers['X-AUTH-TOKEN'] = token;

        return this.makeRequest(url, 'GET', {}, headers);
    }
}

export default ItemsClient;
