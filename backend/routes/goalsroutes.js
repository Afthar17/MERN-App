const express = require('express')
const router = express.Router()
const {getGoals ,CreateGoals,UpdateGoals,DeleteGoals, } = require('../controller/goalcontroller')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect,getGoals).post(protect,CreateGoals)

router.route('/:id').put(protect,UpdateGoals).delete(protect,DeleteGoals)



module.exports = router