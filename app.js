const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const ejs = require('ejs')

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended:true}))
app.set("view engine", "ejs");

mongoose.connect('mongodb://localhost:27017/farm_users;',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))


app.post("/sign_up",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var username = req.body.username;
    var password = req.body.password;

    var data = {
        "name": name,
        "email" : email,
        "username": username,
        "password" : password
    }

    db.collection('customs').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('vegetable.html')

})


app.post("/login", async(req,res)=>{
        const username = req.body.username;
        const password = req.body.password;
        const useremail = await db.collection('customs').findOne({username: username});
        
        if(useremail.password == password){
            res.redirect('index.html');
        }else{
            res.alert("Wrong user credentials");
        }
});

app.post("/login2", async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const farmeremail = await db.collection('farms').findOne({username: username});
    
    if(farmeremail.password == password){
        res.redirect('FarmerMain.html');
    }else{
        res.alert("Wrong user credentials");
    }
});

app.post("/add-product",(req,res)=>{
    var username = req.body.username;
    var name = req.body.name;
    var quantity = req.body.quantity;
    var price = req.body.price;
    const useremail = db.collection('items').findOne({name: name});
    var data = {
        "username": username,
        "name": name,
        "quantity":quantity,
        "price": price
    }
        db.collection('items').insertOne(data,(err,collection)=>{
            if(err){
                throw err;
            }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('FarmerMain.html');
    

})

app.post("/farmer-reg",(req,res)=>{
    var name = req.body.name;
    var phone = req.body.phone;
    var email = req.body.email;
    var block = req.body.block;
    var line = req.body.line;
    var town = req.body.town;
    var state = req.body.state;
    var pincode = req.body.pincode;
    var bank = req.body.bank;
    var branch = req.body.branch;
    var acc = req.body.acc;
    var ifsc = req.body.ifsc;


    var data = {
        "name": name,
        "phone":phone,
        "email":email,
        "block": block,
        "line":line,
        "town":town,
        "state":state,
        "pincode":pincode,
        "bank":bank,
        "branch":branch,
        "acc": acc,
        "ifsc":ifsc
    }
    
    db.collection("NewFarmers").insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Successfully");
    });
    return res.redirect('FarmerMain.html');
})

const itemsSchema = {
    username: String,
    name: String,
    price: String,
    quantity: String
 };
 
 const Item = mongoose.model("Item",itemsSchema);
 
 app.get("/product",(req,res)=>{
    //  const nameOfProduct = req.body.productName;
    Item.find({},function(err,items){
     if(items){
       res.render('product',{
          productList: items
       });
     }
    });
 });


app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(8080);


console.log("Listening on PORT 8080");
