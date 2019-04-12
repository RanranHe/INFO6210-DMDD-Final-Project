const authorService = require('../service/author_service');
const uuid = require('uuid/v1');

function createAuthor(req, res) {
    const data = req.body;
    const id = uuid();
    authorService.createAuthor(id, data.authorName, data.birthday)
        .then(function (result) {
            if (result) {
                res.status(200).send({
                    "message": "Author created successfully.",
                    "authorId": id, "authorName": data.authorName,
                    "birthday": data.birthday
                });
            } else {
                res.status(400).send({"message": "Failed to create author."});
            }
        })
}

function checkAuthorId(req, res, next) {
    const id = req.params.authorId;
    authorService.checkAuthorId(id)
        .then(function (check) {
            if (check) {
                return next();
            } else {
                res.status(400).send({"message": "Author doesn't exist"});
            }
        })
}

function deleteAuthor(req, res) {
    const id = req.params.authorId;
    authorService.deleteAuthor(id)
        .then(function (check) {
            if (check) {
                res.status(200).send({"message": "Author deleted successfully"});
            } else {
                res.status(400).send({"message": "Failed to author. The author is related to books."});
            }
        })
}

function getAuthor(req, res) {
    const id = req.params.authorId;
    authorService.getAuthor(id)
        .then(function (data) {
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(400).send({"message": "Read data error"});
            }
        })
}

function updateAuthor(req, res) {
    const id = req.params.authorId;
    const data = req.body;
    authorService.updateAuthor(id, data.authorName, data.birthday)
        .then(function (result) {
            if (result) {
                res.status(200).send({
                    "message": "Update author successfully", "authorId": id,
                    "authorName": data.authorName, "birthday": data.birthday
                });
            } else {
                res.status(400).send({"message": "Failed to update author"});
            }
        })
}

module.exports = {
    createAuthor,
    checkAuthorId,
    deleteAuthor,
    getAuthor,
    updateAuthor
};