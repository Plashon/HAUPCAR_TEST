const express = require('express');
const router = express.Router();
const {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
} = require('../controllers/carController');

router.route('/').get(getCars).post(createCar);
router.route('/:id').get(getCarById).put(updateCar).delete(deleteCar);

module.exports = router;