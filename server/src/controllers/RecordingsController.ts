
import * as express from 'express';
import { Request, Response } from 'express';
import { OpenViduService } from '../services/OpenViduService';

export const recSess = express.Router({
    strict: true
});

const openviduService = new OpenViduService();


recSess.get('/list', async (req: Request, res: Response) => {
	
	const result = await openviduService.listRecordings()
	res.status(200).send(JSON.stringify(result));
});

recSess.get('/:id', async (req: Request, res: Response) => {
	let sessionId: string = req.params.id;
	if (sessionId == null) {
		res.status(404).send();
		return
	}
	const result = await openviduService.getRecording(sessionId)
	console.log("error ",result)
	if (result.Error == 404) {
		res.status(404).send();
		return
	}
		

	res.status(200).send(JSON.stringify(result));
});

recSess.delete('/:id', async (req: Request, res: Response) => {
	let sessionId: string = req.params.id;
	if (sessionId == null) {
		return res.status(404).send();
	}
	const result = await openviduService.getRecording(sessionId)
	res.status(200).send(JSON.stringify(result));
});