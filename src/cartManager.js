import fs from 'fs';
import { get } from 'http';

const pathFile = './src/data/carts.json';
let carts = [];

const getCarts = async () => {
    const cartsJson = await fs.promises.readFile(pathFile, 'utf8');
    const cartsParse = JSON.parse(cartsJson);
    carts = cartsParse || [];
};

const createCart = async () => {
    carts = await getCarts();

    const newCart = {
        id: carts.length + 1,
        products: [],
    };

    carts.push(newCart);

    await fs.promises.writeFile(pathFile, JSON.stringify(carts));
    return newCart;
};

const getCartById = async (cid) => {
    await getCarts();
    const cart = carts.find(cart => cart.id === cid);

    return cart;
}

const addProductToCart = async (cid, pid) => {
    await getCarts();
    const product = {
        product: pid,
        quantity: 1,
    };

    const index = carts.findIndex(cart => cart.id === cid);
    
    const existingProduct = carts[index].products.find(p => p.product === pid);
    
    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        carts[index].products.push(product);
    }

    await fs.promises.writeFile(pathFile, JSON.stringify(carts));

    return carts[index];
};

export default {
    getCarts,
    createCart,
    getCartById,
    addProductToCart,
}
