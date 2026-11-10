const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const path = require('path');
const auth = require('http-auth');
const Registration = mongoose.model('Registration');
const { check, validationResult } = require('express-validator');
const basic = auth.basic({
    file: path.join(__dirname, '../users.htpasswd'),
});

router.get('/', function(req, res) {
    res.render('form', { title: 'Registration Form'});
});

router.post('/',
    [
        check('name')
            .isLength({ min: 1 })
            .withMessage('Please enter your name'),
        check('email')
            .isEmail()
            .withMessage('Please enter an email'),
    ],
    function(req, res) {
        console.log(req.body);
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const registration = new Registration(req.body);
            registration.save()
                .then(() => res.send('Thank you for Registering'))
                .catch((err) => {
                    console.error(err);
                    res.send('Sorry! Something went wrong');
                });
        } else { 
            res.render('form', {
                title: 'Registration Form',
                errors: errors.array(),
                data: req.body,
            });
        }
    });

        router.get('/registrations', basic.check((req, res) => {
        Registration.find()
            .then((registrations) => {
                res.render('index', { title: 'Listing registrations', registrations });
            })
            .catch((err) => { res.send('Sorry! Something went wrong'); });
        }));


module.exports = router;