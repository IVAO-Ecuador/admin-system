const express = require('express');
const path = require('path');
const fs = require("fs");
const bodyParser = require('body-parser');
const { default: fetch } = require('node-fetch');

const mysql = require('mysql');
require('dotenv').config({path:'./.env'})

/* Express functions */
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./'));
app.use(express.json());

/***************************************************************
 *                     Database connection 
***************************************************************/

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
})

connection.connect(error => {
    if(error) throw error;
    console.log('Database server running!')
})

/***************************************************************
 *                          Routes 
***************************************************************/

app.get('/', (req, res) => {
    res.setHeader('Content-type', 'text/html');
    res.sendFile('./index.html')
})

/***************************************************************
 *                          Logs
***************************************************************/

app.get('/logs', (req, res) => {
    const sql = 'SELECT * FROM logs';
    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else{
            res.json('NoResults')
        }
    });
});

app.post('/logs/new/', (req, res) => {
    const sql = `INSERT INTO logs SET ?`;

    const logObj = {
        vid: req.body.vid,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        fecha: req.body.fecha
    };

    connection.query(sql, logObj, error => {
        if(error) throw error;
    })
});

/***************************************************************
 *                          Events 
***************************************************************/

app.get('/events', (req, res) => {
    const sql = 'SELECT * FROM noticias';
    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else{
            res.json('NoResults')
        }
    });
});

app.post('/events/new', (req, res) => {
    const sql = `INSERT INTO noticias SET ?`;

    const eventObj = {
        titulo: req.body.titulo,
        detalle: req.body.detalle,
        link_imagen: req.body.link_imagen,
        desc_imagen: "Imagen relacionada con: " + req.body.link_imagen,
        fecha_larga: req.body.fecha_larga,
        fecha_corta: req.body.fecha_corta,
        hora: req.body.hora,
        lugares: req.body.lugar,
        link_evento: "https://ec.ivao.aero/events",
        estado: req.body.estado
    };

    connection.query(sql, eventObj, error => {
        if(error) throw error;
    })
});

/***************************************************************
 *                          Users
***************************************************************/

app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM usuarios';
    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else{
            res.json('NoResults')
        }
    });
});

app.get('/users/:vid', (req, res) => {
    const {vid} = req.params;
    const sql = `SELECT * FROM usuarios WHERE vid = ${vid}`;
    connection.query(sql, (error, results) => {
        if(error) throw error;
        if(results.length > 0){
            res.json(results);
        }else{
            res.json('NoResults')
        }
    });
});

app.get('/users/delete/:vid', (req, res) => {
    const {vid} = req.params;
    console.log(vid);
    const sql = `DELETE FROM usuarios WHERE vid = ${vid}`;
    connection.query(sql, (error) => {
        if(error) throw error;
        res.json("Eliminado");
    });
});


app.get('/getUser/:user', (req,res) => {
    const userToken = req.params.user;
    fetch(`https://login.ivao.aero/api.php?type=json&token=${userToken}`)
    .then(data => data.json())
    .then(data => { 

        const staffAU = data.staff;
        const authMode = staffAU.startsWith('EC');
        if(data.vid !== null && authMode === true){
            res.send(data)
        }
    });
})

/***************************************************************
 *                          Port 
***************************************************************/

const port = process.env.port || 3050;
app.listen(port, () => console.log(`Escuchando en el puerto ${port}...`));