// This file will handle the connection logic to the mongodb database

const mongoose = require('mongoose');
const db = "mongodb+srv://nadirathoha:fawavirzD3g1OWga@ictacasestudy-south.93t4xud.mongodb.net/BooksDB?retryWrites=true&w=majority";
// const db = 'mongodb://localhost:27017/BookDb'
const connectionParams={
    useNewUrlParser:true,
    useUnifiedTopology:true
};
mongoose.connect(db,connectionParams)
.then(()=>{ 
    console.log('Connected to', db);
}).catch((err)=>{ 
    console.log(err )
})
// mongoose.connect('mongodb+srv://nadirathoha:ehanev@2019@ictacasestudy-south.93t4xud.mongodb.net/test');
const Schema = mongoose.Schema;

var NewBookSchema = new Schema({
    bookId : Number,
    bookName : String,
    authorName : String,
    description : String,
    imageUrl : String
});

var Bookdata = mongoose.model('bookdata', NewBookSchema);                        //UserData is the model and NewBookData is the schema

module.exports = Bookdata;