const express = require('express');
const router = express.Router();
const mobiesController = require('../controllers/mobiescontroller');


router.get('/', mobiesController.index);

router.get('/:id', mobiesController.show);

module.exports = router;