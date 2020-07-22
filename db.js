const spicedPg = require("spiced-pg");
const db = spicedPg(process.env.DATABASE_URL || "postgres:postgres:postgres@localhost:5432/caper-imageboard");

module.exports.getImages = function () {
    let q = "SELECT * FROM images ";
    return db.query(q);
};