const express = require('express');
const BookData = require('./src/model/Bookdata');
const path = require('path');

const cors = require('cors');
var bodyparser=require('body-parser');
var app = new express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyparser.json()); 
app.use(express.static('./dist/library'));

const PORT = process.env.PORT ||3000;


app.get('/api/books',function(req,res){
    // console.log('app.js - get api/books');
    BookData.find()
                .then(function(books){
                    // console.log('books-->', books);
                    res.send(books);
                }).catch((err)=> {
                    console.log(err);
                });
});


app.get('/api/:id',  (req, res) => {
  
  const id = req.params.id;
    BookData.findOne({"_id":id})
    .then((book)=>{
        res.send(book);
    });
})


app.put('/api/update',(req,res)=>{
    console.log(req.body)
    id=req.body._id,
    bookId= req.body.bookId,
    bookName = req.body.bookName,
    authName = req.body.authName,
    description = req.body.description,
    imageUrl = req.body.imageUrl
   BookData.findByIdAndUpdate({"_id":id},
                                {$set:{"bookId":bookId,
                                "bookName":bookName,
                                "authName":authName,
                                "description":description,
                                "imageUrl":imageUrl}})
   .then(function(){
       res.send();
   })
 })
 
app.delete('/api/remove/:id',(req,res)=>{
 
   id = req.params.id;
   BookData.findByIdAndDelete({"_id":id})
   .then(()=>{
       console.log('success')
       res.send();
   })
 })
   

app.get('/', (req, res)=> {
    res.send('Listening')
});


app.get('/*', (req, res)=> {
    res.sendFile(path.join(__dirname + './dist/library'));
    });
    

app.listen(PORT, function(){
    console.log('listening to port', PORT);
});



// "bookId":bookId,
// "bookName":bookName,
// "authName":authName,
//  "description":description,
//  "imageUrl":imageUrl
