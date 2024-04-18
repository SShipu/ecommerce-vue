import BaseClient from './BaseClient';

class StocksClient extends BaseClient {
    constructor(host, apiKey, endpoint) {
        super(host, apiKey, endpoint);
    }

    async stockSearch(data) {
        let url = this._host + this._endpoint + '/items/skus/search';
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
}

export default StocksClient;
