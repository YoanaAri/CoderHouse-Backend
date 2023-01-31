import express from 'express';
import productsRoutes from './products/products.routes.js';
import carritosRoutes from './carritos/carritos.routes.js';

const router = express.Router();

//aca va la logica de la vista
router.get('/', (req, res) => {
    res.render('index', {});
});
router.use('/products', productsRoutes);
router.use('/carts', carritosRoutes); 

export default router;