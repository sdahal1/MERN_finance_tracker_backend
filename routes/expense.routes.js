const ExpenseController = require("../controllers/expense.controller");
const {authenticate}= require('../config/jwt');

module.exports = (app)=>{
    app.get("/api/expenses", ExpenseController.getAllExpenses);
    app.post("/api/expenses",authenticate, ExpenseController.createExpense);
    app.get("/api/getCurrentUserExpenses", ExpenseController.getUserExpenses);
    app.get("/api/expenses/:id", ExpenseController.getOneExpense);
    app.put("/api/expenses/:id", ExpenseController.updateExpense);
    app.delete("/api/expenses/:id", ExpenseController.deleteOneExpense);
}
