const express = require("express")
const cors = require("cors")
const cookies = require("cookie-parser");
require("dotenv").config();
const allowedOrigins = ['http://localhost:3000', 'https://mern-finance-tracker-frontend.vercel.app'];



const app = express(); 
const port = 5001;

app.use(express.json())
app.use(express.urlencoded({extended:true})) 
// app.use(cors({
//     credentials:true,
//     // origin: 'http://localhost:3000'
//     origin: 'https://mern-finance-tracker-frontend.vercel.app'
// }));

app.use(cors({
    credentials: true,
    origin: function (originVal, callback) {
      // Check if the request origin is in the allowed origins list or if it's not provided (e.g., same-origin requests)
      if (!originVal || allowedOrigins.includes(originVal)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    allowedHeaders: ['Content-Type', 'Authorization']
  }));


app.use(cookies()) //Now our app has the abilities to send and read cookies with each request/response


require("./config/mongoose.config")



require('./routes/user.routes')(app)
require('./routes/expense.routes')(app)




app.listen( port, () => console.log(`Listening on port: ${port}`) );