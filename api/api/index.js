const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const User = require('../models/User');
const Post = require('../models/Post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const salt = bcrypt.genSaltSync(10);
const secret = process.env.SECRET;
app.use(cors({
    credentials:true, 
    origin:'https://blogpoint-mern-blog.vercel.app',
    allowedHeaders:['Content-Type', 'Authorization'],
    methods: ['GET','OPTIONS','PATCH','DELETE','POST','PUT']

}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect('mongodb+srv://'+process.env.DB_USER+':'+process.env.DB_PASS+'@'+process.env.DB_HOST);

app.post('/register', async function(req, res){
    const {username, password} = req.body;
    
    try{
        const userDoc = await User.create({
            username, 
            password: bcrypt.hashSync(password, salt)
        });
        res.json(userDoc);
    }catch(e){
        res.status(400).json(e);
    }
    
});

app.post('/login', async function(req, res){
    const {username, password} = req.body;

    const userDoc = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, userDoc.password);

    if(passOk){
        //logged in
        jwt.sign({username, username_id: userDoc._id}, secret,{} , function(err, token){
            if(err) throw err;
            res.cookie('token', token).json({
                id: userDoc._id,
                username,
            });
        });
    }else{
        res.status(400).json('wrong credentials');
    }
});


app.get('/profile', function(req, res){
    const {token}  = req.cookies;
    if(token===''){
        res.status(200).json('User not logged in');
    }else{
        jwt.verify(token, secret, {}, function(err, info){
            res.json(info);
        });
    }
});

app.post('/logout', function(req, res){
    res.cookie('token', '').json('ok'); 
});


app.post('/post', async function(req, res){

    const {token}  = req.cookies;
    jwt.verify(token, secret, {}, async function(err, info){
        if(err) throw err; 
        const {title,summary,content,imgLink} = req.body; 
        const postDoc= await Post.create({
            title,
            summary,
            content,
            coverImg: imgLink,
            author: info.username_id,
        });
        res.json(postDoc);
    });
});


app.put('/post', async function(req, res){

    const {token} = req.cookies;

    jwt.verify(token, secret, {}, async function(err, info){
        if(err) throw err;
        const {id, title, summary, imgLink, content} = req.body;
        const postDoc = await Post.findById(id);
        const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.username_id);
        
        if(!isAuthor){
            res.status(400).json("You are not the author");
            throw 'You are not author';
        }

        await postDoc.updateOne({
            title, 
            summary, 
            content,
            coverImg: imgLink ? imgLink : postDoc.coverImg,
        });
        res.json(postDoc);
    });
});

app.get('/post', async function(req, res){
    const posts = await Post.find()
        .populate('author',['username'])
        .sort({createdAt: -1})
        .limit(10);
    res.json(posts);
});


app.get('/post/:id', async function(req, res){
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author',['username']);
    res.json(postDoc);
});


app.listen('5000', function(){
    console.log("Listening on port 5000");
})


module.exports = app;