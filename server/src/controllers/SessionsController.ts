
import * as express from 'express';
import { Request, Response } from 'express';
import { OpenViduService } from '../services/OpenViduService';
import { OPENVIDU_URL, OPENVIDU_SECRET } from '../config';

export const appSess = express.Router({
    strict: true
});

const openviduService = new OpenViduService();


appSess.get('/:id', async (req: Request, res: Response) => {
	let sessionId: string = req.params.id;
	if (sessionId == "") {
		return res.status(404).send();
	}
	const session = await openviduService.getSession(sessionId)
	console.log('URL params', session);
});