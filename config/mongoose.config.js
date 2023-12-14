const mongoose = require('mongoose');

const db_name = "finance_tracker";
mongoose.set('strictQuery', true);
// mongoose.connect(`mongodb://localhost/${db_name}`, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(() => console.log('Established a connection to the database'))
//     .catch(err => console.log('Something went wrong when connecting to the database ', err));

//connecting to cloud mongodb instead
mongoose.connect(`mongodb+srv://raabdahl:${process.env.MONGO_DB_PW}@cluster1.isqvgvd.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Established a connection to the database'))
    .catch(err => console.log('Something went wrong when connecting to the database ', err));