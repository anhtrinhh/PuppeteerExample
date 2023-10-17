import http = require('http');
import https = require('https');

type ResponseData = {
    data?: any;
    statusCode?: number;
    statusText?: string;
}

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH'
}

export default class HttpClient {

    public async request(url: string, method = HttpMethod.GET, data = null, headers = null) {
        try {
            let response = await this.createRequest(url, method, data, headers);
            return {
                data: response.data,
                status: response.statusCode,
                statusText: response.statusText,
            };
        } catch (e) {
            console.error('HttpClient.request error:', e.message);
            return {
                status: e.statusCode ? e.statusCode : 500,
                statusText: e.message,
                data: null
            };
        }
    }

    private createRequest(url, method = HttpMethod.GET, data = null, headers = null): Promise<ResponseData> {
        data = data ? data : {};
        const dataString = JSON.stringify(data);
        const options: http.RequestOptions = {
            method: method,
            headers: headers
        }
        return new Promise((resolve, reject) => {
            let req: http.ClientRequest;
            if (url.toLowerCase().startsWith('https')) {
                const agent = new https.Agent({
                    rejectUnauthorized: false
                });
                options.agent = agent;
                req = https.request(url, options, res => this.requestCallback(res, resolve, reject));
            } else req = http.request(url, options, res => this.requestCallback(res, resolve, reject));
            req.on('error', (err) => {
                reject(err);
            });
            req.on('timeout', () => {
                req.destroy();
                reject(new Error('Request time out'));
            });
            req.write(dataString);
            req.end();
        });
    }

    private requestCallback(res: http.IncomingMessage, resolve: (value: ResponseData) => void, reject: (reason?: any) => void) {
        if (res.statusCode < 200 || res.statusCode > 299) {
            return reject({
                message: res.statusMessage,
                statusCode: res.statusCode
            });
        }
        const body = [];
        res.on('data', (chunk) => body.push(chunk));
        res.on('end', () => {
            const resString = Buffer.concat(body).toString();
            resolve({
                data: JSON.parse(resString),
                statusCode: res.statusCode,
                statusText: res.statusMessage
            });
        });
    }
}