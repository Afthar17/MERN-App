const express = require('express')
const router = express.Router()
const {getGoals ,CreateGoals,UpdateGoals,DeleteGoals} = require('../controller/goalcontroller')

router.route('/').get(getGoals).post(CreateGoals)

router.route('/:id').put(UpdateGoals).delete(DeleteGoals)



module.exports = router