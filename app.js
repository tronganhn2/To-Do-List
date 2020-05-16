const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const date = require(__dirname+"/date.js");
var mongoose = require('mongoose');
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect('mongodb://localhost:27017/todoListDB', {useNewUrlParser: true});


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// let items = []
const itemsSchema = {
    name: {
        type: String,
        required: true
    }
}
const Item = mongoose.model("List", itemsSchema);


app.get("/", function(req,res){
    let day = date.getDate();
    
    Item.find({}, function(err,result){
        res.render('todo', {listTitles: day, newListItems: result})
    })
});

app.post("/", function(p_req,p_res){
    let itemName = p_req.body.newItem;
    // items.push(item);
    // p_res.redirect("/");
    const item = new Item({
        name: itemName
    });
    item.save();

    p_res.send({item_name: itemName, key_Name: item._id})    
});

app.post("/delete", function(p_req,p_res){
    const checkItemId =  p_req.body.key;
    Item.findByIdAndRemove(checkItemId, function(err){
        if(err){
            console.log(err);
        }
    })
});

app.post("/update_task", function(req, res){
    let old_up = req.body.old_name;
    let new_up = req.body.new_name;
    let query = {name: old_up}
    Item.findOneAndUpdate(query, {name: new_up}, function(err){
        if(err){
            console.log(err);
        }
    })
});


app.listen(3000, () => {
    console.log('Listening on port 3000!')
});