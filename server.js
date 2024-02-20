const express = require("express")
const cors = require("cors")
const cookies = require("cookie-parser");
require("dotenv").config();
const allowedOrigins = ['http://localhost:3000', 'https://mern-finance-tracker-frontend.vercel.app'];



const app = express(); 
const port = 5001;

app.use(express.json())
app.use(express.urlencoded({extended:true})) 
app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
      } else {
          callback(new Error('Not allowed by CORS'));
      }
  }
}));

// app.set("trust proxy",1); //Trust the first proxy
// const corsOptions = {
//     credentials: true,
//     origin: function (originVal, callback) {
//       // Check if the request origin is in the allowed origins list or if it's not provided (e.g., same-origin requests)
//       if (!originVal || allowedOrigins.includes(originVal)) {
//         callback(null, true);
//       } else {
//         callback(new Error('Not allowed by CORS'));
//       }
//     },
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     exposedHeaders: ['Set-Cookie']
//   }
// app.use(cors(corsOptions));


// app.use(cookies({secure: true, sameSite: 'none'})) //Now our app has the abilities to send and read cookies with each request/response

app.use(cookies({secure: true, sameSite: 'lax', maxAge: 1000 * 60 * 60 * 48})) //Now our app has the abilities to send and read cookies with each request/response

// console.log("server say wha")
require("./config/mongoose.config")



require('./routes/user.routes')(app)
require('./routes/expense.routes')(app)




app.listen( port, () => console.log(`Listening on port: ${port}`) );