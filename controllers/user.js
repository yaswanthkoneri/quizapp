var User = require('../models/user');
var crypto = require('crypto');

function UserController (){

}

UserController.prototype.createUser = (req,res)=>{
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512',salt)
                .update(req.body.password)
                .digest("base64");
    req.body.password = salt + "$" + hash;
    User.findByEmail(req.body.email).then((user)=>{
        if (!user[0]){
            User.createUser(req.body).then((result) => {
                res.status(201).send({status:"success",message:"User Registration Successfull",id: result._id});
            });
        }
        else{
            res.status(400).send({status:"failed",message:"User Already found"});
        }
    })
}

User.createUser = (userData) => {
    const user = new User(userData);
    return user.save();
};

UserController.prototype.hasCreateUserValidFields = (req, res, next) => {
    let errors = [];
    function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    if (req.body) {
        if (!req.body.email) {
            errors.push('Missing email field');
        }
        if (!validateEmail(req.body.email)) {
            errors.push('Enter Valid email');
        }
        if (!req.body.password) {
            errors.push('Missing password field');
        }
        if (!req.body.firstName) {
            errors.push('Missing firstName field');
        }
        if (!req.body.lastName) {
            errors.push('Missing lastName field');
        }
        if (!req.body.confirmPassword) {
            errors.push('Missing confirm password field');
        }
        if (!req.body.password || req.body.password!==req.body.confirmPassword){
            errors.push('Password and Confirm password Doesnot Match');
        }
        if (!req.body.phoneNumber){
            errors.push('Missing Phone Number Field');
        }
        if (errors.length) {
            return res.status(400).send({errors: errors.join(',')});
        } else {
            return next();
        }
    } else {
        return res.status(400).send({errors: 'Please fill the fields to Register'});
    }
};


var userController = new UserController();
module.exports = userController;
