import express from 'express';
import Address from '../../../model/address';

const addressRouter = express.Router();

addressRouter.get('/getaddress', (req, res) => {
	return res.status(200).json({ message: 'getaddress' });
});

addressRouter.post('/createaddaddress', (req, res) => {});
