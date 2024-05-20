import fs from 'fs';
import { get } from 'http';

const pathFile = './src/data/products.json'

let products = [];

const addProduct = async (product) => {
    await getProducts();
    const { title, description, price, code, stock, category, thumbnail } = product;

    const newProduct = {
        id: products.length + 1,
        title,
        description,
        price,
        code,
        stock,
        category,
        thumbnail,
        status: true,
    };

    products.push(newProduct);

    await fs.promises.writeFile(pathFile, JSON.stringify(products));

    return product;
};

const getProducts = async (limit) => {
    const productsJson = await fs.promises.readFile(pathFile, 'utf8');
    const productsParse = JSON.parse(productsJson);
    products = productsParse || [];

    if (!limit) return products;

    return products.slice(0, limit);
};

const getProductById = async (id) => {
    await getProducts();
    const product = products.find(product => product.id === id);

    return product;
};

const updateProduct = async (id, productData) => {
    await getProducts();

    const index = products.findIndex(product => product.id === id);
    products[index] = { ...products[index], ...productData };

    await fs.promises.writeFile(pathFile, JSON.stringify(products));
    const product = await getProductById(id);
    return product;
};

const deleteProduct = async (id) => {
    await getProducts();
    const product = await getProductById(id);
    if (!product) return false;

    products = products.filter(product => product.id !== id);
    await fs.promises.writeFile(pathFile, JSON.stringify(products));

    return true;
};

export default {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
