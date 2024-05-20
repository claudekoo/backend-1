import { request, response } from 'express';
import productManager from '../productManager.js';

export const checkProductData = async (req = request, res = response, next) => {
    try {
        const { title, description, price, code, stock, category } = req.body;
        const newProduct = { 
            title,
            description,
            price,
            code,
            stock,
            category,
        };

    const products = await productManager.getProducts();

    const productExists = products.find(product => product.code === code);

    if (productExists) { 
        return res.status(400).json({ status: 'error', message: `Product with code ${code} already exists` });
    };

    const checkData = Object.values(newProduct).includes(undefined);
    if (checkData) {
        return res.status(400).json({ status: 'error', message: 'Missing data' });
    };

    next();

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
};