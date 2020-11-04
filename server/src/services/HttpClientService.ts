import axios, { AxiosRequestConfig } from 'axios';
import * as https from 'https';
var btoa = require('btoa');
import { CALL_OPENVIDU_CERTTYPE, OPENVIDU_SECRET, OPENVIDU_URL } from '../config';

export class HttpClientService {

	private options: AxiosRequestConfig = {};

	constructor(){}

	public async get(url: string): Promise<any> {
		if(CALL_OPENVIDU_CERTTYPE === 'selfsigned'){
			this.options.httpsAgent = new https.Agent({
				rejectUnauthorized: false
			});
		}

		this.options.headers = {
			Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SECRET),
			'Content-Type': 'application/json',
		};

		try {
			const response: any = await axios.get<any>(OPENVIDU_URL + url, this.options).catch(error => { console.log('caught', error.message); });
			return response.data;
		} catch (error) {
			throw error;
		}
	}

	public async post(body, url: string): Promise<any> {
		if(CALL_OPENVIDU_CERTTYPE === 'selfsigned'){
			this.options.httpsAgent = new https.Agent({
				rejectUnauthorized: false
			});
		}

		this.options.headers = {
			Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SECRET),
			'Content-Type': 'application/json',
		};

		try {
			let response:any = await axios.post<any>(OPENVIDU_URL + url, body, this.options).catch(error => { console.log('caught', error.message); });
			return response.data;
		} catch (error) {
			throw error;
		}
    }

}