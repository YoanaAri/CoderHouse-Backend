import express from 'express';
import { createCarrito, showProducts, addProduct }  from '../../api/carritos.api.js';


const router = express.Router();

//crea un carrito
router.post('/', createCarrito);

//lista los productos guardados en el carrito 
router.get('/:cid', showProducts);


//incorpora productos al carrito por su id
router.post('/:cid/products/:pid', addProduct);

export default router;