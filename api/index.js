const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const User = require('./models/User');
const Post = require('./models/Post');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const fs = require('fs');
const dotenv = require('dotenv').config();

const app = express();
const salt = bcrypt.genSaltSync(10);
const secret = "secretkey1233434422423423424131231313";
const upload = multer({dest:'uploads/'});
app.use(cors({credentials:true, origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));

mongoose.connect('mongodb+srv://'+dotenv.parsed.DB_USER+':'+dotenv.parsed.DB_PASS+'@'+dotenv.parsed.DB_HOST);

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
    if(token==='' || token===undefined){
        res.status(200).json('NotLoggedIn');
    }else{
        jwt.verify(token, secret, {}, function(err, info){
            // if(err) throw err;
            res.json(info);
        });
    }
});

app.post('/logout', function(req, res){
    res.cookie('token', '').json('ok'); 
});

app.post('/post', upload.single('file'), async function(req, res){
    const {originalname,path} = req.file;
    const filenameSplit = originalname.split('.');
    const ext = filenameSplit[filenameSplit.length-1];
    const finalPath = path+"."+ext;
    fs.renameSync(path, finalPath);

    const {token}  = req.cookies;
    jwt.verify(token, secret, {}, async function(err, info){
        if(err) throw err; 
        
        const {title,summary,content} = req.body; 
        const postDoc= await Post.create({
            title,
            summary,
            content,
            coverImg: finalPath,
            author: info.username_id,
        });
        res.json(postDoc);
    });
});

app.put('/post', upload.single('file'), async function(req, res){
    let finalPath=null;
    
    if(req.file){
        const {originalname,path} = req.file;
        const filenameSplit = originalname.split('.');
        const ext = filenameSplit[filenameSplit.length-1];
        const finalPath = path+"."+ext;
        fs.renameSync(path, finalPath);
    }

    const {token} = req.cookies;

    jwt.verify(token, secret, {}, async function(err, info){
        if(err) throw err;
        const {id, title, summary, content} = req.body;
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
            coverImg: finalPath ? finalPath : postDoc.coverImg,
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

app.delete('/post/:id', async function(req, res) {
    const { id } = req.params;
  
    // Delete the post by ID
    await Post.findByIdAndDelete(id).then((deletedPost) => {
        if (!deletedPost) {
            return res.status(404).json({ error: 'Post not found' });
        }
        return res.status(200).json({ message: 'Post deleted successfully' });
    })
    .catch((err) => {
    console.error(err);
    return res.status(500).json({ error: 'An error occurred while deleting the post' });
    });
});

app.get('/post/:id', async function(req, res){
    const {id} = req.params;
    const postDoc = await Post.findById(id).populate('author',['username']);
    res.json(postDoc);
});


app.listen('5000', function(){
    console.log("Listening on port 5000");
})
