const express = require('express')
const router = express.Router()
const {
  getLocality,
  createLocality,
  updateLocality,
  deleteLocality,
} = require('../controller/localityController')
// const validate = require('../middleware/validate')
// router.use(validate)
router.route('/').get(getLocality);
router.route('/').post(createLocality);
// router.post('/xxx', createLocality)
router.route('/:id').put(updateLocality).delete(deleteLocality)
module.exports = router

// http://localhost:5000/locality
// http://localhost:5000/locality/poiuytre3456789okjhgf3456
