const asynchandler = require('express-async-handler')
//desc  Get goals
//routes GET /api/goals
//access private
const getGoals = asynchandler(async (req,res) =>{
    res.status(200).json({message :'Get goals'})
})
//desc  create goals
//routes POST /api/goals
//access private
const CreateGoals = asynchandler(async (req,res)=>{
    if(!req.body.text){
       res.status(400)
       throw new Error('please add a text')
    };
    res.status(200).json({message :'set goals'})
})
//desc  update goals
//routes PUT /api/goals/:id
//access private
const UpdateGoals = asynchandler(async (req,res)=>{
    res.status(200).json({message :`Update goals ${req.params.id}`})
})
//desc  Delete goals
//routes Delete /api/goals/:id
//access private
const DeleteGoals = asynchandler(async (req,res)=>{
    res.status(200).json({message :`Delete goals ${req.params.id}`})
}
)
module.exports = {getGoals ,CreateGoals,UpdateGoals,DeleteGoals}