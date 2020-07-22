const express = require('express')
const app = express()
const port = 8080
const db = require("./db");
const { urlencoded } = require('express');

app.use(express.static('public'))

// let cities = [
//     {
//         name: 'Berlin',
//         country: 'DE'
//     },
//     {
//         name: 'Guayaquil',
//         country: 'Ecuador'
//     },
//     {
//         name: 'Halifax',
//         country: 'Canada'
//     }
// ];

app.get('/images', (req, res) => {
    // console.log('/cities route has been hit!!!!');
    // res.json - how we send a response to the client!!!!
    db.getImages().then((results) => {

        res.json(results.rows);
    })
});
app.listen(port, () => console.log(`Example app listening on port port!`))