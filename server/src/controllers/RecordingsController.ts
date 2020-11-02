
import * as express from 'express';
import { Request, Response } from 'express';
import { OpenViduService } from '../services/OpenViduService';
import { OPENVIDU_URL, OPENVIDU_SECRET } from '../config';

export const recSess = express.Router({
    strict: true
});

const openviduService = new OpenViduService();


recSess.get('/', async (req: Request, res: Response) => {
	const result = await openviduService.listRecordings()
	res.status(200).send(JSON.stringify(result));
});

recSess.get('/:id', async (req: Request, res: Response) => {
	let sessionId: string = req.params.id;
	if (sessionId == "") {
		return res.status(404).send();
	}
	const result = await openviduService.getRecording(sessionId)
	res.status(200).send(JSON.stringify(result));
});

recSess.get('/:id', async (req: Request, res: Response) => {
	let sessionId: string = req.params.id;
	if (sessionId == "") {
		return res.status(404).send();
	}
	const result = await openviduService.getRecording(sessionId)
	res.status(200).send(JSON.stringify(result));
});