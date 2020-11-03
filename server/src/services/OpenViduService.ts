import { HttpClientService } from './HttpClientService';
import { RecordingMode, OpenVidu, Recording, 
    RecordingProperties, RecordingLayout, Session, 
    SessionProperties, TokenOptions, OpenViduRole,
    } from 'openvidu-node-client';
import { OPENVIDU_URL, OPENVIDU_SECRET } from '../config';

export class OpenViduService {

    private httpClientService: HttpClientService;
    private api: OpenVidu;

	constructor(){
        this.httpClientService = new HttpClientService()
        this.api = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
    }

    public async deleteRecording(sessionId: string): Promise<any> {
        console.log("Delete recording to ", sessionId);

        return await this.api.deleteRecording(sessionId);
    }

    public async getRecording(sessionId: string): Promise<any> {
        console.log("Get recording to ", sessionId);

        return await this.api.getRecording(sessionId).catch(err => {
            return err
        });
    }

    public async listRecordings(): Promise<any> {
        console.log("List recordings");
       
        return await this.api.listRecordings();
    }

    public async startRecording(sessionId: string): Promise<any> {
        console.log("Start recording to ", sessionId);
        var properties:RecordingProperties = {
            outputMode: Recording.OutputMode.COMPOSED, 
            recordingLayout: RecordingLayout.BEST_FIT,
        };

        return await this.api.startRecording(sessionId, properties);
    }

    public async stopRecording(sessionId: string): Promise<any> {
        console.log("Stop recording to ", sessionId);

        return await this.api.stopRecording(sessionId);
    }
    
	public async createSession(sessionId: string): Promise<Session> {
        console.log("New session to ", sessionId);
        var properties:SessionProperties = {
            customSessionId: sessionId, 
            recordingMode: RecordingMode.MANUAL,
            defaultOutputMode: Recording.OutputMode.COMPOSED
        };
        return await this.api.createSession(properties);
    }

    public async getSession(sessionId: string,) {
        const url = '/api/sessions';
        console.log("Requesting session to ", url);
        const body: string = JSON.stringify({ customSessionId: sessionId});

        return await this.httpClientService.post(body, url);
	}

    // public async getSession(sessionId: string): Promise<Session> {
    //     const url = '/api/sessions/' + sessionId;
    //     console.log("Requesting session to ", url);

    //     return await this.httpClientService.get(url);
	// }
    public async createToken(session): Promise<any> {
		const url =  '/api/tokens';
        console.log("Requesting token to ", session);
        var body = JSON.stringify({ session: session});

        return await this.httpClientService.post(body, url);
        //   console.log("New token to ", session.sessionId);
        // var properties:TokenOptions = {
        //     role: OpenViduRole.PUBLISHER, 
        // };
        // return await session.generateToken(properties);
    }

    // public async createToken(session: Session): Promise<string> {
    //     console.log("New token to ", session.sessionId);
    //     var properties:TokenOptions = {
    //         // role: OpenViduRole.PUBLISHER, 
    //     };
    //     return await session.generateToken(properties);
    // }
	// public async createToken(sessionId: string): Promise<string> {
    //     const url = '/api/tokens';
    //     console.log("Requesting token to ", url);
    //     const body: string = JSON.stringify({ session: sessionId });

    //     return await this.httpClientService.post(body, url);
        
    // }
}