import express from 'express';
import Brand from '../../../../database/model/brand/brand.js';

const productRouter = express.Router();

productRouter.get('/productslist', async (req, res) => {});
productRouter.post('/createproduct', async (req, res) => {});

export default productRouter();
