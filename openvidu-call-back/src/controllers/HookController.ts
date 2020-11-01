
import * as express from '../../dist/node_modules/express';
import { Request, Response } from '../../dist/node_modules/express';
import { OpenViduService } from '../services/OpenViduService';
import { OPENVIDU_URL, OPENVIDU_SECRET } from '../config';
export const appHook = express.Router({
    strict: true
});

const openviduService = new OpenViduService();


appHook.post('/', async (req: Request, res: Response) => {
	let body: string = req.body;
	console.log('webhook received', req.body);
	
});

function handleError(error: any, res: Response){
	const statusCode = error.response?.status;
	console.log(error);
	if (error.code === 'ECONNREFUSED'){
		console.error('ERROR: Cannot connect with OpenVidu Server');
		res.status(503).send('ECONNREFUSED: Cannot connect with OpenVidu Server');
		return;
	}
	if(error.code === 'DEPTH_ZERO_SELF_SIGNED_CERT' || error.code.includes('SELF_SIGNED_CERT')){
		res.status(401).send('ERROR: Self signed certificate Visit '+ OPENVIDU_URL);
		return;
	}
	res.status(statusCode).send('ERROR: Cannot create OpenVidu session');
}
