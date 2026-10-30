const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');

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
            return res.send('Thank you for Registering');
        }
        res.render('form', {
            title: 'Registration Form',
            errors: errors.array(),
            data: req.body,
        });
    });

module.exports = router;

