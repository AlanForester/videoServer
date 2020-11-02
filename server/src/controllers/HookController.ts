import { Session } from 'openvidu-browser';

import * as express from 'express';
import { Request, Response } from 'express';
import { OpenViduService } from '../services/OpenViduService';
import { OPENVIDU_URL, OPENVIDU_SECRET } from '../config';

export const appHook = express.Router({
    strict: true
});

const openviduService = new OpenViduService();

appHook.post('/', async (req: Request, res: Response) => {
	let body: any = req.body;
	console.log('HOOK:  ', body);
	if (body.event == "webrtcConnectionCreated") {
		const sessionId = body.sessionId
		const session: any = await openviduService.getSession(sessionId)
		const countConnections = session.connections.numberOfElements
		if (countConnections == 2) {
			openviduService.startRecording(session.sessionId)
		}
	}
	if (body.event == "webrtcConnectionDestroyed") {
		const sessionId = body.sessionId
		const session: any = await openviduService.getSession(sessionId)
		const countConnections = session.connections.numberOfElements
		if (countConnections  < 2) {
			openviduService.stopRecording(session.sessionId)
		}
	}
	res.status(200).send(JSON.stringify({"status": body}));
});
