require('dotenv').config();
const express = require('express');

const app = express();
const port = process.env.PORT;

app.use( express.static('public') );

app.get('*', function (_, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.listen(port, () => {
    console.log(`Escuchando en el puerto ${port}`)
});