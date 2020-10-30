import { Injectable } from '@angular/core';
import { LoggerService } from '../logger/logger.service';
import { ILogger } from '../../types/logger-type';
import { throwError as observableThrowError } from 'rxjs/internal/observable/throwError';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/internal/operators/catchError';

@Injectable({
	providedIn: 'root'
})
export class NetworkService {

	private log: ILogger;
	private baseHref: string;

	constructor(private http: HttpClient, private loggerSrv: LoggerService) {
		this.log = this.loggerSrv.get('NetworkService');
		this.baseHref =  '/' + (!!window.location.pathname.split('/')[1] ? window.location.pathname.split('/')[1] + '/' : '');
	}

	async getToken(sessionId: string, openviduServerUrl: string, openviduSecret: string): Promise<string> {
			const _sessionId = await this.createSession(sessionId, openviduServerUrl, openviduSecret);
			return await this.createToken(_sessionId, openviduServerUrl, openviduSecret);
		
	}

	createSession(sessionId: string, openviduServerUrl: string, openviduSecret: string): Promise<string> {
		return new Promise((resolve, reject) => {
			const body = JSON.stringify({ customSessionId: sessionId });
			const options = {
				headers: new HttpHeaders({
					Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + openviduSecret),
					'Content-Type': 'application/json'
				})
			};
			return this.http
				.post<any>(openviduServerUrl + '/api/sessions', body, options)
				.pipe(
					catchError(error => {
						if (error.status === 409) {
							resolve(sessionId);
						}
						if (error.statusText === 'Unknown Error') {
							reject({status: 401, message: 'ERR_CERT_AUTHORITY_INVALID'});
						}
						return observableThrowError(error);
					})
				)
				.subscribe(response => {
					resolve(response.id);
				});
		});
	}

	createToken(sessionId: string, openviduServerUrl: string, openviduSecret: string): Promise<string> {
		return new Promise((resolve, reject) => {
			const body = JSON.stringify({ session: sessionId });
			const options = {
				headers: new HttpHeaders({
					Authorization: 'Basic ' + btoa('OPENVIDUAPP:' + openviduSecret),
					'Content-Type': 'application/json'
				})
			};
			return this.http
				.post<any>(openviduServerUrl + '/api/tokens', body, options)
				.pipe(
					catchError(error => {
						reject(error);
						return observableThrowError(error);
					})
				)
				.subscribe(response => {
					this.log.d(response);
					resolve(response.token);
				});
		});
	}
}