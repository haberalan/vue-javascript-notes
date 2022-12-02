const express = require('express');

const notesController = require('../controllers/notesController');
const isAuthorized = require('../middlewares/isAuthorized');

const router = express.Router();

router.use(isAuthorized);

router.get('/one/:id', notesController.getOne);

router.get('/all', notesController.getMany);

router.post('/create', notesController.createOne);

router.patch('/update/:id', notesController.updateOne);

router.delete('/delete/:id', notesController.deleteOne);

module.exports = router;
