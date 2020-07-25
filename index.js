const express = require('express')
const app = express()
const port = 8080
const db = require("./db");
const s3 = require('./s3')
const { s3Url } = require("./config.json")

app.use(express.static('public'))
app.use(express.json());
const multer = require('multer');
const uidSafe = require('uid-safe');
const path = require('path');
const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + '/uploads');
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});


////////////////////////////////////////////

app.get('/images', (req, res) => {
    db.getImages().then((results) => {

        result = results.rows.sort((a, b) => b.id - a.id)

        res.json(result);
    })
})


app.post('/upload', uploader.single('file'), s3.upload, function (req, res) {
    // If nothing went wrong the file is already in the uploads directory
    const { title, description, username } = req.body
    const { filename } = req.file
    const url = s3Url + filename

    // if (req.file) {
    //     res.json({
    //         success: true
    //     });
    // } else {
    //     res.json({
    //         success: false
    //     });
    // }
    db.addImage([title, description, username, url]).then(({ rows }) => {

        res.json({ image: rows[0] })
    }).catch((err) => {
        console.log('err in add image:', err);
    });
})

app.post('/comment/', function (req, res) {
    // console.log('req.body in comments :', req.body);
    const { comment, username, id } = req.body
    db.addComment([username, comment, id]).then((res) => {
        //come here later <<<<<<<<<<<<<<<<<<<<<<<<<<<
        // console.log('res :', res);
    }).catch(function (err) {
        console.log('err in app POST /comment: ', err);
    });

})


app.get('/image-card/:id', (req, res) => {
    let id = req.params
    // console.log('id :', id);
    let idNum = Number(id.id)
    // console.log('id params:', i  d);
    // db.getImage([idNum]).then(({ rows }) => {
    //     // console.log('results in get image :', results);

    //     res.json({ image: rows[0] });
    // }).catch((err) => {
    //     console.log('err in add image card:', err);
    // });
    db.getImgAndComments([idNum]).then((response) => {

        console.log('response :', response);
        res.json(response);
    }).catch((err) => {
        console.log('err in add image card:', err);
    });

})
app.listen(port, () => console.log(`Example app listening on port port!`))