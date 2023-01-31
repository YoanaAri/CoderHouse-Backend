const express = require('express');

const style = "css/index.css";

const router = express.Router();

router.get('/', (req, res) =>{
    res.render('index', {
        title: 'Desafio Entregable',
        style});
});

module.exports = router;