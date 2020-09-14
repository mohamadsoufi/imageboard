const spicedPg = require("spiced-pg");
const db = spicedPg(process.env.DATABASE_URL || "postgres:postgres:postgres@localhost:5432/caper-imageboard");

module.exports.getImages = function () {
    let q = `SELECT * FROM images
             ORDER BY images.id DESC
             LIMIT 9 `;
    return db.query(q);
};

// exports.getMoreImages = lastId => db.query(
//     `SELECT * FROM images
//         WHERE id < $1
//         ORDER BY id DESC
//         LIMIT 6`,
//     [lastId]
// )

exports.getMoreImages = lastId => db.query(
    `SELECT url, title, id, (
     SELECT id FROM images
     ORDER BY id ASC
     LIMIT 1
     ) AS "lowestId" FROM images
     WHERE id < $1
     ORDER BY id DESC
     LIMIT 9;`,
    [lastId]
)

module.exports.addImage = function (params) {
    let q = `INSERT INTO images (title, description, username, url) 
    VALUES ($1, $2, $3 ,$4 ) 
    RETURNING * `;

    return db.query(q, params);
}

// module.exports.getImage = function (params) {
//     let q = `SELECT * FROM images 
//              WHERE $1 = id`;
//     return db.query(q, params);
// };

module.exports.addComment = function (params) {
    let q = `INSERT INTO comments (comment_username,comment,image_id) 
    VALUES ($1, $2, $3 ) RETURNING * `;

    return db.query(q, params);
}

module.exports.getImgAndComments = function (params) {
    let q = `SELECT * , images.created_at AS created_at FROM images 
             LEFT JOIN comments 
             ON images.id = comments.image_id
             WHERE images.id = $1 
              `;
    return db.query(q, params);
};

// `SELECT * FROM images 
//              LEFT JOIN comments 
//              ON images.id = comments.image_id 
//              ORDER BY images.id DESC`