const Expense = require("../models/expense.model");
const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const {secret} = require("../config/jwt");



module.exports.createExpense = async (req, res)=>{
    const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
    let foundUser = await User.findOne({_id: decodedJWT.payload.id});
    let {...expenseData} = req.body;
    expenseData.owner = foundUser;
    Expense.create(expenseData)
        .then(newExpense=>{
            User.findOneAndUpdate(
                {_id: decodedJWT.payload.id},
                { $push: { expenses: newExpense  } }
            )
            .then(updatedUser=>{
                res.json({results: newExpense})
            })

        })
        .catch(err=>{
            res.json(err)
        })
}



module.exports.getAllExpenses = (req,res)=>{
    Expense.find().populate("owner", "firstName lastName")
        .then(allExpenses=>{
            res.json({results: allExpenses})
        })
        .catch(err=>res.json(err))
}

module.exports.getUserExpenses = async (req,res)=>{
    const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
    let foundUser = await User.findOne({_id: decodedJWT.payload.id});
    Expense.find({owner: foundUser}).sort({date:-1})
        .then(expenses=>{
            res.json({results: expenses})
        })
        .catch(err=>{
            res.json(err)
        })
}

module.exports.getOneExpense = (req,res)=>{
    Expense.find({_id: req.params.id})
        .then(foundExpense=>{
            res.json({results: foundExpense})
        })
        .catch(err=>{
            res.json(err)
        })
}

module.exports.updateExpense = (req,res)=>{
  console.log("we here")
  const expenseId = req.params.id;
  const updateData = req.body;
  Expense.findByIdAndUpdate(expenseId, updateData, { new: true, runValidators:true }) // { new: true } returns the modified document
  .then(updatedExpense => {
    if (!updatedExpense) {
      // If no expense is found with the given ID
      return res.status(404).json({ error: 'Expense not found' });
    }

    res.json({ results: updatedExpense });
  })
  .catch(err => {
    res.status(500).json({ error: 'Internal Server Error', errors: err.errors });
  });
}

module.exports.deleteOneExpense = (req,res)=>{
    Expense.deleteOne({_id: req.params.id})
        .then(expense=>{
            res.json({results: expense})
        })
        .catch(err=>{
            res.json(err)
        })
}