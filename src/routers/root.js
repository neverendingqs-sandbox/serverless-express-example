'use strict';
const getHostUri = require('../lib/utils').getHostUri;
const viewModel = require('../views/view-model');

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('index', viewModel.index(req, req.session.id)));

router.post('/logout', (req, res) =>{
  req.session.destroy(err => {
    if(err) {
      console.error(err);
      res.render('index', viewModel.index(req, null));
      return;
    }
    res.redirect(getHostUri(req));
  });
});

module.exports = router;
