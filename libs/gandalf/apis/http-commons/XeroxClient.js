/* eslint-disable prettier/prettier */
// import HttpClient from "./HttpClient";
import HttpClient from "./NuxtHttpClient";


const endPoint = "/api/files";

class XeroxClient extends HttpClient {

    constructor(host, apiKey) {
        super();
        this._host = host;
        this._apiKey = apiKey;
    }

    async upload2(data, order) {
        let queryParams = { order: order };
        let url = this.getUrl(this._host + endPoint, queryParams);
        let headers = {};
        return this.makeRequest(
            url,
            "POST",
            data,
            headers
        );
    }

    async upload(data, type) {
        return new Promise((resolve, reject) => {
            // console.log(reject);
            const formData = new FormData();
            formData.append('file', data);
            formData.append('type', type);
            let xhr = new XMLHttpRequest();
            let self = this;
            xhr.onreadystatechange = function(e) {
                if (4 === this.readyState) {
                    let data = {
                        'status': xhr.status,
                        'networkError': false,
                    };
                    try {
                        data.body = JSON.parse(xhr.responseText);
                        if (data.body.url) {
                            if (!data.body.url.startsWith('http://') && !data.body.url.startsWith('https://')) {
                                data.body.url = self._host + data.body.url;
                            }
                        }
                    } catch (e) {
                        console.log(e);
                    }

                    resolve(data);
                }
            };
            xhr.onerror = function(e) {
                let data = {
                    networkError: true,
                    body: e
                };
                resolve(data);
            };
            xhr.open('post', this._host + endPoint, true);
            if (localStorage.getItem('token') != null)
                xhr.setRequestHeader('X-AUTH-TOKEN', localStorage.getItem('token'));
            xhr.setRequestHeader('X-API-KEY', this._apiKey);
            xhr.setRequestHeader('X-DEVICE-ID', "aa=");
            xhr.send(formData);
        });
    }

}

export default XeroxClient;
