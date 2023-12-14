const mongoose = require ('mongoose');

//name, cost, date

const ExpenseSchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, 'Expense name is required']
    },
    price: {
        type: Number,
        required: [true, "Price is required!"],
        min: [0, "Price cannot be negative"]
    },
    date: {
        type: Date,
        required: [true, "Date is required!"]
    },
    category: {
        type: String,
        enum: {
            values: [
                "rent_and_utilities", 
                "investing",
                "grocery",
                "gas", 
                "dining", 
                "car", 
                "social", 
                "education", 
                "health", 
                "transportation",
                "travel", 
                "entertainment", 
                "insurance",
                "style",
                "other",
                ],
            message: '{VALUE} is not supported as a category'            
        },
        required: [true, "Expense Category is required!"]
    },
    description: {
        type: String
    }, 
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

  },
  {timestamps: true}
);


module.exports = mongoose.model ('Expense', ExpenseSchema);
