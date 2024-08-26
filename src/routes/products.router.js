import { Router } from "express";
import fs from 'fs';
import path from 'path';
import __dirname from '../utils.js';

const productsRouter = Router();
const dataFilePath = path.join(__dirname, '/data/products.json');

const readData = () => {
    const data = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

productsRouter.get('/', (req, res) => {
    const products = readData();
    const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
    res.json(products.slice(0, limit));
});

productsRouter.get('/:pid', (req, res) => {
    const products = readData();
    const product = products.find(p => p.id === req.params.pid);
    if (!product) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json(product);
});

productsRouter.post('/', (req, res) => {
    const products = readData();
    const newProduct = {
        id: String(products.length + 1), 
        title: req.body.title,
        description: req.body.description,
        code: req.body.code,
        price: req.body.price,
        status: req.body.status !== undefined ? req.body.status : true, 
        stock: req.body.stock,
        category: req.body.category,
        thumbnails: req.body.thumbnails || []
    };

    if (!newProduct.title || !newProduct.description || !newProduct.code || !newProduct.price || newProduct.stock === undefined || !newProduct.category) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    products.push(newProduct);
    writeData(products);

    res.status(201).json(newProduct);
});

productsRouter.put('/:pid', (req, res) => {
    const products = readData();
    const productIndex = products.findIndex(p => p.id === req.params.pid);
    
    if (productIndex === -1) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    const updatedProduct = {
        ...products[productIndex],
        ...req.body
    };

    delete updatedProduct.id;

    products[productIndex] = updatedProduct;
    writeData(products);

    res.json(updatedProduct);
});

productsRouter.delete('/:pid', (req, res) => {
    let products = readData();
    const productIndex = products.findIndex(p => p.id === req.params.pid);
    
    if (productIndex === -1) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }

    products = products.filter(p => p.id !== req.params.pid);
    writeData(products);

    res.status(204).send();
});

export default productsRouter;
