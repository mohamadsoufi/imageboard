const spicedPg = require("spiced-pg");
const db = spicedPg(process.env.DATABASE_URL || "postgres:postgres:postgres@localhost:5432/caper-imageboard");

module.exports.getImages = function () {
    let q = "SELECT * FROM images ";
    return db.query(q);
};


module.exports.addImage = function (params) {
    let q = `INSERT INTO images (title, description, username, url) 
    VALUES ($1, $2, $3 ,$4 ) 
    RETURNING * `;

    return db.query(q, params);
}

module.exports.getImage = function (params) {
    let q = `SELECT * FROM images 
             WHERE $1 = id
    `;
    return db.query(q, params);
};

module.exports.getcomments = function (params) {
    let q = `SELECT * FROM images 
             WHERE $1 = id
    `;
    return db.query(q, params);
};

