import express from 'express';
import { authAdmin } from '../../../middleware/authadmin/authadmin.js';
import verifyToken from '../../../middleware/verifytoken/verifytoken.js';
import brandRouter from './brandrouter/brandrouter.js';

const brandApiRouter = express.Router();

brandApiRouter.use('/brand', verifyToken, brandRouter);

export default brandApiRouter;
