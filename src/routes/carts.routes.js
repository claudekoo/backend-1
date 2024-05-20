import { Router } from 'express';
import cartManager from '../cartManager.js';
import productManager from '../productManager.js';

const router = Router();

router.post('/', async (req, res) => {
    try {
        const cart = await cartManager.createCart();

        res.status(201).json({ status: 'ok', cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

router.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await cartManager.getCartById(Number(cid));

        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        };

        res.status(200).json({ status: 'ok', cart });
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

router.post('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        
        const product = await productManager.getProductById(Number(pid));
        if (!product) {
            return res.status(404).json({ status: 'error', message: 'Product not found' });
        };

        const cart = await cartManager.addProductToCart(Number(cid), Number(pid));

        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        };

        res.status(200).json({ status: 'ok', cart });
    
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
});

export default router;
