import { Router } from 'express';
import productManager from '../productManager.js';
import { checkProductData } from '../middlewares/checkProductData.middleware.js';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const { limit } = req.query;
        const products = await productManager.getProducts(limit);
        res.status(200).json({ status: 'ok', products });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

router.get('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.getProductById(Number(pid));
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        };
        res.status(200).json({ status: 'ok', product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

router.post('/', checkProductData, async (req, res) => {
    try {
        const body = req.body;
        const product = await productManager.addProduct(body);
        res.status(201).json({ status: 'ok', product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

router.put('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const body = req.body;
        const product = await productManager.updateProduct(Number(pid), body);
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        };
        res.status(200).json({ status: 'ok', product });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

router.delete('/:pid', async (req, res) => {
    try {
        const { pid } = req.params;
        const product = await productManager.deleteProduct(Number(pid));
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        };
        res.status(200).json({ status: 'ok', message: `Product ${pid} deleted`});
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

export default router;