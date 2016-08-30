import express from 'express';
import http from 'http';

const api = express.Router();

const hostname =  'api.douban.com';
const pathPrefix = '/v2';


api.route('*')
    .all((req, res) => {
        const path = req.originalUrl.replace(/\/api/, '');

        const request = http.request({
            hostname,
            path: pathPrefix + path,
        }, resp => {
            let json = '';
            resp.on('data', (chunk) => {
                json += chunk;
            });
            resp.on('end', () => {
                res.append('Access-Control-Allow-Origin', '*');
                res.send(json);
            });
        });

        request.on('error', (e) => {
            console.log(`problem with request of douban api: ${e.message}`);
        });

        request.end();
    })

export default api;