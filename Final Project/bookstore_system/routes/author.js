const express = require('express');
const router = express.Router();
const author = require('../server/author_server');

// get all authors
router.get('/authors', author.getAllAuthors);
// create author
router.post('/author', author.createAuthor);
// delete author
router.delete('/author/:authorId', author.checkAuthorId, author.deleteAuthor);
// get author
router.get('/author/:authorId',author.checkAuthorId, author.getAuthor);
// update author
router.put('/author/:authorId',author.checkAuthorId, author.updateAuthor);

module.exports = router;