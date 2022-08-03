const path = require('path');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const home_controller = require('../controllers/homeController');
const item_controller = require('../controllers/itemController');
const category_controller = require('../controllers/categoryController');

/* GET home page. */
router.get('/', home_controller.home_detail);

// ITEM ROUTES

// GET request to create Item
router.get('/item/create', item_controller.item_create_get);

// POST request to create Item
router.post('/item/create', upload.single('image'), item_controller.item_create_post);

// GET request to delete Item
router.get('/item/:id/delete', item_controller.item_delete_get);

// POST request to delete Item
router.post('/item/:id/delete', item_controller.item_delete_post);

// GET request to update Item
router.get('/item/:id/update', item_controller.item_update_get);

// POST request to update Item
router.post('/item/:id/update', upload.single('image'), item_controller.item_update_post);

// GET request for one item
router.get('/item/:id', item_controller.item_detail);

// CATEGORY ROUTES

// GET request to create Category
router.get('/category/create', category_controller.category_create_get);

// POST request to create Category
router.post('/category/create', category_controller.category_create_post);

// GET request to delete Category
router.get('/category/:id/delete', category_controller.category_delete_get);

// POST request to delete Category
router.post('/category/:id/delete', category_controller.category_delete_post);

// GET request to update Category
router.get('/category/:id/update', category_controller.category_update_get);

// POST request to update Category
router.post('/category/:id/update', category_controller.category_update_post);

// GET request for one Category
router.get('/category/:id', category_controller.category_detail);

module.exports = router;
