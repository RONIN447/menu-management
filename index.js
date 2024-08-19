const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();

// importing the rooutes 
const categoryRoutes = require('./routes/category');
const subcategoryRoutes = require('./routes/subcategory');
const itemRoutes = require('./routes/item');
const { error } = require('console');


app.use(express.json());

// const uri = "mongodb+srv://akshatsthapak4420:process.env.MONGO_PASSWORD@cluster0.bx63x.mongodb.net/?retryWrites=true&w=majority&appname=Cluster0"

// Sir , the database was not connecting  if i was using process.env for the usernaame and password thats why i had written directly 
mongoose.connect(`mongodb+srv://akshatsthapak4420:kYjCszqX8qJNZH63@cluster0.bx63x.mongodb.net/?retryWrites=true&w=majority&appname=Cluster0`)
    .then(() => console.log('Connected to the mongoDB'))
    .catch(error => console.error('Error connecting to the mongoDB:', error));

// Using the  routes
app.use('/api/category', categoryRoutes);
app.use('/api/subcategory', subcategoryRoutes);
app.use('/api/items', itemRoutes);

// app.get("/", (req, res) => {
//     res.send("Hello World welcome to the menu-management system ");
// });


app.listen(PORT, () => {
    console.log(`Server successfully connected and  running on the port ${PORT}`);
});
