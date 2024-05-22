const express = require('express')
const router = express.Router()
const {
  getLocality,
  createLocality,
  updateLocality,
  deleteLocality,
} = require('../controller/localityController')
router.route('/').get(getLocality);
router.route('/').post(createLocality);
router.route('/:id').put(updateLocality).delete(deleteLocality)
module.exports = router


