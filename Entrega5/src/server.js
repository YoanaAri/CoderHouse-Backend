import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './dirname.js';
import productsRoutes from './routes/products.routes.js'
import viewsRoutes from './routes/views.routes.js'
import mongoose from 'mongoose';
import Handlebars from 'handlebars';
import { allowInsecurePrototypeAccess } from '@handlebars/allow-prototype-access'


const app = express();

//MongoDB local
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/ecommerce', (error) => {
    if(error) {
        console.log('Error al conectar a MongoDB', error);
      } else {
        console.log('Conectado a MongoDB');
      }
    });

//Handlebars
app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));

app.set('view engine', 'hbs');
app.set('views', `${__dirname}/views`);
app.use(express.static(`${__dirname}/public`));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routes
app.use('/api/products', productsRoutes);
app.use('/', viewsRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=> {
    console.log(`Server is up and running on port ${PORT}`);
});
//app.listen(8080, () => { console.log('Servidor escuchando en el puerto 8080') })
