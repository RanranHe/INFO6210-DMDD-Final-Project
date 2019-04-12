const categoryService = require('../service/category_service');
const uuid = require('uuid/v1');

function getAllCategories(req, res) {
    categoryService.getAllCategories()
        .then(function (data) {
            res.status(200).send({"categories": data});
        })
}

function createCategory(req, res) {
    const data = req.body;
    const id = uuid();
    categoryService.createCategory(id, data.categoryName)
        .then(function (result) {
            if (result) {
                res.status(200).send({
                    "message": "Category created successfully.",
                    "categoryId": id, "categoryName": data.categoryName
                });
            } else {
                res.status(400).send({"message": "Failed to create category."});
            }
        })
}

function checkCategoryId(req, res, next) {
    const id = req.params.categoryId;
    categoryService.checkCategoryId(id)
        .then(function (check) {
            if (check) {
                return next();
            } else {
                res.status(400).send({"message": "Category doesn't exist"});
            }
        })
}

function deleteCategory(req, res) {
    const id = req.params.categoryId;
    categoryService.deleteCategory(id)
        .then(function (check) {
            if (check) {
                res.status(200).send({"message": "Category deleted successfully"});
            } else {
                res.status(400).send({"message": "Failed to delete category. The category is related to books."});
            }
        })
}

function getCategory(req, res) {
    const id = req.params.categoryId;
    categoryService.getCategory(id)
        .then(function (data) {
            console.log(data);
            if (data) {
                res.status(200).send(data);
            } else {
                res.status(400).send({"message": "Read data error"});
            }
        })
}

function updateCategory(req, res) {
    const id = req.params.categoryId;
    const data = req.body;
    categoryService.updateCategory(id, data.categoryName)
        .then(function (result) {
            if (result) {
                res.status(200).send({
                    "message": "Update category successfully", "categoryId": id,
                    "categoryName": data.categoryName
                });
            } else {
                res.status(400).send({"message": "Failed to update category"});
            }
        })
}

module.exports = {
    getAllCategories,
    createCategory,
    checkCategoryId,
    deleteCategory,
    getCategory,
    updateCategory
};