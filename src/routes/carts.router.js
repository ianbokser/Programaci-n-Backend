import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import __dirname from '../utils.js';

const cartsRouter = Router();

const cartsFilePath = path.join(__dirname, '/data/carts.json');
const productsFilePath = path.join(__dirname, '/data/products.json');


const readCarts = () => {
    const data = fs.readFileSync(cartsFilePath, 'utf8');
    return JSON.parse(data);
};

const writeCarts = (data) => {
    fs.writeFileSync(cartsFilePath, JSON.stringify(data, null, 2));
};

const readProducts = () => {
    const data = fs.readFileSync(productsFilePath, 'utf8');
    return JSON.parse(data);
};

const generateCartId = (carts) => {
    if (carts.length === 0) return '1';
    const ids = carts.map(cart => parseInt(cart.id));
    const maxId = Math.max(...ids);
    return String(maxId + 1);
};

cartsRouter.post('/', (req, res) => {
    try {
        const carts = readCarts();
        const newCart = {
            id: generateCartId(carts),
            products: []
        };
        carts.push(newCart);
        writeCarts(carts);
        res.status(201).json({
            message: 'Carrito creado exitosamente',
            cart: newCart
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el carrito', error: error.message });
    }
});

cartsRouter.get('/:cid', (req, res) => {
    try {
        const { cid } = req.params;
        const carts = readCarts();
        const cart = carts.find(c => c.id === cid);

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el carrito', error: error.message });
    }
});

cartsRouter.post('/:cid/product/:pid', (req, res) => {
    try {
        const { cid, pid } = req.params;
        const { quantity = 1 } = req.body; // Por defecto, quantity = 1

        const carts = readCarts();
        const products = readProducts();

        const cartIndex = carts.findIndex(c => c.id === cid);
        if (cartIndex === -1) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        const productExists = products.some(p => p.id === pid);
        if (!productExists) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        const cart = carts[cartIndex];
        const productInCartIndex = cart.products.findIndex(p => p.product === pid);

        if (productInCartIndex !== -1) {
            // Si el producto ya existe en el carrito, incrementar la cantidad
            cart.products[productInCartIndex].quantity += quantity;
        } else {
            // Si el producto no existe en el carrito, agregarlo
            cart.products.push({
                product: pid,
                quantity: quantity
            });
        }

        carts[cartIndex] = cart;
        writeCarts(carts);

        res.status(200).json({
            message: 'Producto agregado al carrito exitosamente',
            cart: cart
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar el producto al carrito', error: error.message });
    }
});

export default cartsRouter;
