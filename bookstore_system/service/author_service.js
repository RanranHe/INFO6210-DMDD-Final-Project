const DB = require('../db');
const con = DB.con;

function getAllAuthors() {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM `db_final`.`author`;";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[VIEW AUTHORS ERROR]: " + err);
                resolve(false);
            } else {
                resolve(result);
            }
        });
    });
}

function createAuthor(id, name, dob) {
    return new Promise(function (resolve) {
        let sql = "INSERT INTO `db_final`.`author` (`author_id`, `author_name`, `date_of_birth`) " +
            "VALUES ('" + id + "', '" + name + "', '" + dob + "')";
        con.query(sql, function (err) {
            if (err) {
                console.log("[INSERT AUTHOR ERROR]: " + err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function checkAuthorId(id) {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM db_final.`author` WHERE author_id='" + id + "'";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[CHECK AUTHOR ID ERROR]: " + err);
                resolve(false);
            }
            if (result[0] == null || result[0] === undefined) {
                console.log(`[SEARCH FAILED]: NO SUCH AUTHOR`);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function deleteAuthor(id) {
    return new Promise(function (resolve) {
        let sql = "DELETE FROM `db_final`.`author` WHERE author_id='" + id + "'";
        con.query(sql, function (err) {
            if (err) {
                console.log("[DELETE AUTHOR ERROR]: " + err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

function getAuthor(id) {
    return new Promise(function (resolve) {
        let sql = "SELECT * FROM `db_final`.`author` WHERE author_id='" + id + "';";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[VIEW AUTHOR DETAILS ERROR]: " + err);
                resolve(false);
            } else {
                resolve(result[0]);
            }
        });
    });
}

function updateAuthor(id, name, dob) {
    return new Promise(function (resolve) {
        let sql = "UPDATE `db_final`.`author` SET `author_name`='" + name +"', `date_of_birth`='"+
            dob +"' WHERE author_id='" + id + "'";
        con.query(sql, function (err, result) {
            if (err) {
                console.log("[UPDATE AUTHOR ERROR]: " + err);
                resolve(false);
            } else {
                resolve(true);
            }
        });
    });
}

module.exports = {
    getAllAuthors,
    createAuthor,
    checkAuthorId,
    deleteAuthor,
    getAuthor,
    updateAuthor
};