
import * as express from 'express';
import { Request, Response } from 'express';
import { OpenViduService } from '../services/OpenViduService';

export const appHook = express.Router({
    strict: true
});

const openviduService = new OpenViduService();

var isec = {};

appHook.post('/', async (req: Request, res: Response) => {
	let body: any = req.body;
	console.log('HOOK:  ',  body);
	if (body.event == "participantJoined") {
		const sessionId = body.sessionId
		const session: any = await openviduService.getSession(sessionId)
		const countConnections = session.connections.numberOfElements
		console.log("connections: ", countConnections)
		if (countConnections >= 2) {
			openviduService.startRecording(session.sessionId)
			isec[sessionId] = true 
		}
	}
	if (body.event == "participantLeft") {
		const sessionId = body.sessionId
		const session: any = await openviduService.getSession(sessionId)
		const countConnections = session.connections.numberOfElements
		if (countConnections  < 2) {
			openviduService.stopRecording(session.sessionId)
			delete(isec[sessionId])
		}
	}
	res.status(200).send(JSON.stringify({"status": isec}));
});
