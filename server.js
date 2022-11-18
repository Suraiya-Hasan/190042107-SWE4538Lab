var express = require('express');
var bodyParser = require("body-parser");
var app = express();

var server = app.listen(3000, () => {
    console.log('server is running on port', server.address().port);
});

app.use(express.static(__dirname));
// app.set("view engine",ejs);
// app.set(__dirname+"/index");

//Database
var mongoose = require('mongoose');
DATABASE_URL = 'mongodb+srv://suraiya:suraiya@cluster0.aznqwjj.mongodb.net/message';
mongoose.connect(DATABASE_URL, (err) => {
    console.log('Database connected', err);
})
var Message = mongoose.model('Message', { sender: String, reciever: String, message: String })
var User = mongoose.model('User',{username: String})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/users', (req, res)=>{
    User.find({},(err,users)=>{
        res.send(users);
    })
})
app.post('/users',(req,res)=>{
    var user = new User(req.body);
    user.save((err)=>{
        if(err)
            sendStatus(500);
        res.sendStatus(200);
    })
})
app.get('/messages', (req, res) => {
    Message.find({}, (err, messages) => {
        res.send(messages);
    })
})

app.post('/messages', (req, res) => {
    var message = new Message(req.body);
    message.save((err) => {
        if (err)
            sendStatus(500);
        res.sendStatus(200);
    })
})

const getUserList = async (req, res) => {
    let data = [];
    let users = [];
    try {
      data = await User.find();
      //console.log(data);
      data.forEach((user) => {
        users.push({ name: user.username });
      });
    } catch (error) {
      console.log(error);
    } finally {
      res.render("userList", { users: users, data: data });
    }
  };