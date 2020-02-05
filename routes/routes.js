const express = require('express');
const router = express.Router();
const Ad = require('../models/ad');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const exjwt = require('express-jwt');

const jwtMW = exjwt({
    secret: 'this is a secret key'
});

router.get('/', function(req, res){

    if(req.query.kategorija === 'nekretnine'){
        Ad.find({ category: 'nekretnina'}).then((ads) => {
            res.locals = {
                ads: ads
            }
            res.render('home.ejs');
        });
    }
    else if(req.query.kategorija === 'automobili'){
        Ad.find({ category: 'automobil'}).then((ads) => {
            res.locals = {
                ads: ads
            }
            res.render('home.ejs');
        });
    }
    else if(req.query.kategorija === 'alati'){
        Ad.find({ category: 'alat'}).then((ads) => {
            res.locals = {
                ads: ads
            }
            res.render('home.ejs');
        });
    }
    else if(req.query.kategorija === 'bicikli'){
        Ad.find({ category: 'bicikl'}).then((ads) => {
            res.locals = {
                ads: ads
            }
            res.render('home.ejs');
        });
    }
    else if(req.query.kategorija === 'racunarskaoprema'){
        Ad.find({ category: 'racunarskaoprema'}).then((ads) => {
            res.locals = {
                ads: ads
            }
            res.render('home.ejs');
        });
    }
    else if(req.query.kategorija === 'knjige'){
        Ad.find({ category: 'knjiga'}).then((ads) => {
            res.locals = {
                ads: ads
            }
            res.render('home.ejs');
        });
    }
    else if(req.query.kategorija === 'konzoleigre'){
        Ad.find({ category: 'konzolaigra'}).then((ads) => {
            res.locals = {
                ads: ads
            }
            res.render('home.ejs');
        });
    }
    else if(req.query.kategorija === 'mobilnitelefoni'){
        Ad.find({ category: 'mobilnitelefon'}).then((ads) => {
            res.locals = {
                ads: ads
            }
            res.render('home.ejs');
        });
    }
    else if(req.query.kategorija === 'namestaj'){
        Ad.find({ category: 'namestaj'}).then((ads) => {
            res.locals = {
                ads: ads
            }
            res.render('home.ejs');
        });
    }
    else if(req.query.kategorija === 'videotv'){
        Ad.find({ category: 'videotv'}).then((ads) => {
            res.locals = {
                ads: ads
            }
            res.render('home.ejs');
        });
    }
    else{
        Ad.find({}).then((ads) => {
            res.locals = {
                ads: ads
            }
            res.render('home.ejs');
        });
    }
});

router.get('/oglas', function(req, res){
    Ad.find({ _id: req.query.id }).then((ad) => {

        User.find({ _id: ad[0].user_id }).then((user) => {
            res.locals = {
                ad: ad[0],
                user: user[0]
            }
            res.render('oglas.ejs');
        })
    })
})

router.get('/new_ad', function(req, res){
    res.render('new_ad.ejs');
});

router.post('/new_ad', jwtMW, function(req, res){
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];
    const tokenInfo = jwt.verify(token, 'this is a secret key');

    Ad.create({
        title: req.body.title,
        location: req.body.location,
        price: req.body.price,
        description: req.body.description,
        date: req.body.date,
        picture: req.body.picture,
        user_id: tokenInfo.id,
        category: req.body.category
    }).then((ad) => {
        res.send(ad);
    });
});

router.get('/oglasi', jwtMW, function(req, res){
    const authHeader = req.get('Authorization');
    const token = authHeader.split(' ')[1];
    const tokenInfo = jwt.verify(token, 'this is a secret key');

    Ad.find({ user_id: tokenInfo.id }).then((ads) => {
        res.json({
            ads: ads
        });
    });
});

router.get('/register', function(req, res){
    res.render('register.ejs');
});

router.post('/register', function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    User.create({
        username: username,
        password: password
    }).then((user) => {
        console.log('Created user: ', user);
        res.redirect('/'); //ne radi?
    });
});

router.get('/login', function(req, res){
    res.locals = {
        error: {
            state: false,
            message: ''
        }
    }
    res.render('login.ejs');
});

router.post('/login', function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    User.findOne({ username: username }).then((user) => {
        if(!user){
            return res.json({
                error: true,
                message: 'Korisnik nije pronadjen'
            });
        }

        else if(password != user.password){
            return res.json({
                error: true,
                message: 'Pogresna lozinka'
            });
        }

        else{
            let token = jwt.sign({ id: user._id, username: username }, 'this is a secret key', { expiresIn: 129600 });
            return res.json({
                error: false,
                token: token
            });
        }
    });
});

router.get('/delete', function(req, res){
    Ad.deleteOne({ _id: req.query.id }).then((response) => {
        res.redirect('/');
    })
})

module.exports = router;