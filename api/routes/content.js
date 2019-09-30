const express = require("express");
const router = express.Router();

const contentController = require('../controllers/content');
const checkAuth = require('../middleware/check-auth');
const checkUserRole = require('../middleware/check-role');

router.post('/insert', contentController.insert);
router.post('/view_content/:id', contentController.view_content);
router.patch('/:id', contentController.update);
router.delete('/:id', contentController.delete);
router.post("/search_n_list/:limit/:skip", contentController.search_n_list);

module.exports = router;