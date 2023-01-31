import express from 'express';
import { getProducts, getProductId, saveProduct, updateProduct, deleteProduct }  from '../../api/products.api.js';

const router = express.Router();

//Lista todos los productos
router.get('/', getProducts);

//Mustra el poducto por su id
router.get('/:pid', getProductId);

//incorpora el producto 
router.post('/', saveProduct);


//Actualiza un producto por su id
router.put('/:pid', updateProduct);

//Borra un producto por su id
router.delete('/:pid', deleteProduct);

export default router;