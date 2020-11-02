import { Publisher } from 'openvidu-browser';
import { Output } from '@angular/core';
import { HttpClientService } from './HttpClientService';
import { RecordingMode, OpenVidu, Recording, 
    RecordingProperties, RecordingLayout, Session, 
    SessionProperties, TokenOptions, OpenViduRole,
    } from 'openvidu-node-client';
import { OPENVIDU_URL, OPENVIDU_SECRET } from '../config';
import { SessionOptions } from 'http2';

export class OpenViduService {

    private : HttpClientService;
    private api: OpenVidu;

	constructor(){
        this.api = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    public async startRecording(sessionId: string): Promise<any> {
        console.log("Start recording to ", sessionId);
        var properties:RecordingProperties = {
            outputMode: Recording.OutputMode.COMPOSED, 
            recordingLayout: RecordingLayout.BEST_FIT,
        };

        return await this.api.startRecording(sessionId, properties);
    }
    
	public async createSession(sessionId: string): Promise<Session> {
        console.log("New session to ", sessionId);
        var properties:SessionProperties = {
            customSessionId: sessionId, 
            recordingMode: RecordingMode.MANUAL,
            defaultOutputMode: Recording.OutputMode.INDIVIDUAL
        };
        return await this.api.createSession (properties);
	}

	public async createToken(session: Session): Promise<string> {
        console.log("New token to ", session.sessionId);
        var properties:TokenOptions = {
            role: OpenViduRole.PUBLISHER, 
        };
        return await session.generateToken(properties);
    }
}