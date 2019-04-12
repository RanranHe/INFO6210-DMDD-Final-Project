const express = require('express');
const router = express.Router();
const category = require('../server/category_server');

// get all categories
router.get('/categories', category.getAllCategories);
// create category
router.post('/category', category.createCategory);
// delete category
router.delete('/category/:categoryId', category.checkCategoryId, category.deleteCategory);
// get category
router.get('/category/:categoryId',category.checkCategoryId, category.getCategory);
// update category
router.put('/category/:categoryId',category.checkCategoryId, category.updateCategory);

module.exports = router;