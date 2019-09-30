const express = require("express");
const router = express.Router();

const contentController = require('../controllers/content');
const checkAuth = require('../middleware/check-auth');
const checkUserRole = require('../middleware/check-role');

router.post('/insert', contentController.insert);
router.post('/view_by_id/:id', contentController.view_by_id);
/*router.post('/update/:id', contentController.update);
router.get('/list', contentController.list);
router.post('/list', contentController.list);// with search
router.delete('/:id', contentController.detele);*/

module.exports = router;