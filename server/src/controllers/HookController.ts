
import * as express from 'express';
import { Request, Response } from 'express';
import { OpenViduService } from '../services/OpenViduService';
import { OPENVIDU_URL, OPENVIDU_SECRET } from '../config';

export const appHook = express.Router({
    strict: true
});

const openviduService = new OpenViduService();

appHook.post('/', async (req: Request, res: Response) => {
	let sessionId: string = req.body.sessionId;
	console.log('Session ID received', req.body);
	
		const sessionResponse = await openviduService.createSession(sessionId, OPENVIDU_URL, OPENVIDU_SECRET);
		sessionId =sessionResponse.id;
	
	
	res.status(200).send(JSON.stringify({"status": "ok"}));
});
