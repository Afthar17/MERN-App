const asynchandler = require('express-async-handler')
const Goal = require('../model/goalmodel')
const { text } = require('express')
//desc  Get goals
//routes GET /api/goals
//access private
const getGoals = asynchandler(async (req,res) =>{
const goals = await Goal.find()

    res.status(200).json(goals)
})
//desc  create goals
//routes POST /api/goals
//access private
const CreateGoals = asynchandler(async (req,res)=>{
    if(!req.body.text){
       res.status(400)
       throw new Error('please add a text')
    };
    const goal = await Goal.create({
        text: req.body.text
    })
    res.status(200).json(goal)
})
//desc  update goals
//routes PUT /api/goals/:id
//access private

const UpdateGoals = asynchandler(async (req,res)=>{
    const goal = await Goal.findById(req.params.id,req.body,{new :true})
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id,req.body,{new:true})
    res.status(200).json(updatedGoal)
})
//desc  Delete goals
//routes Delete /api/goals/:id
//access private
const DeleteGoals = asynchandler(async (req,res)=>{
    const goal = await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    await goal.deleteOne()
    res.status(200).json({id :req.params.id})
}
)
module.exports = {getGoals ,CreateGoals,UpdateGoals,DeleteGoals}