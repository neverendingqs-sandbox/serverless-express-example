'use strict';
const viewModel = require('../views/view-model');

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('index', viewModel.index(req, req.session.id)));

module.exports = router;
