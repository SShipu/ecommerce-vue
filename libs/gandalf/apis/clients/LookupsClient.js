import BaseClient from './BaseClient';

class LookupsClient extends BaseClient {
    constructor(host, apiKey, endpoint) {
        super(host, apiKey, endpoint);
    }

    async status(data) {
        let queryParams = {};
        if (data && data.id) queryParams.id = data.id;
        if (data && data.status) queryParams.status = data.status;
        if (data && data.type) queryParams.type = data.type;

        let url = this.getUrl(this._host + this._endpoint + '/status', queryParams);

        let headers = {
            'Content-Type': 'application/json',
        };

        headers['X-API-KEY'] = this._apiKey;
        headers['X-DEVICE-ID'] = 'aa=';
        if (process.client) {
            let token = localStorage.getItem("token");
            if (token && token.length > 0) headers["X-AUTH-TOKEN"] = token;
        }

        return this.makeRequest(url, 'PATCH', {}, headers);
    }

    async deleteInactive(params) {
        let url = this.getUrl(this._host + this._endpoint + '/inactive', params);
        let headers = {
            'Content-Type': 'application/json',
        };
        headers['X-API-KEY'] = this._apiKey;
        headers['X-DEVICE-ID'] = 'aa=';
        if (process.client) {
            let token = localStorage.getItem("token");
            if (token && token.length > 0) headers["X-AUTH-TOKEN"] = token;
        }

        return this.makeRequest(url, 'DELETE', {}, headers);
    }
}

export default LookupsClient;
