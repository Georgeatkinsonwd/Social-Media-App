const User = require('../models/User')



module.exports = {
    getRegister: (req,res)=>{
        res.render('register.ejs')
    },
    getLogin:(req,res)=>{
        res.render('login.ejs')
    },
    postRegister:(req,res)=>{
     const {name,email,password,password2} = req.body;
     let errors = []
     console.log(' Name ' + name+ ' email :' + email+ ' pass:' + password);
     if(!name || !email || !password || !password2) {
        errors.push({msg : "Please fill in all fields"})
    }
    // check match
    if (password !== password2){
        errors.push ({msg : 'passwords do not match'})
    }
    // check p/w length more than 6
    if(password.length < 6){
        errors.push({msg: 'password needs to be atleast 6 characters'})
    }
    if (errors.length > 0){
        res.render('register',{
            errors: errors,
            name: name,
            email: email,
            password: password,
            password2: password2
        })
    }
    else {
        // validation passed
        User.findOne({email: email}).exec((err,user)=>{
            console.log(user)
            if(user){
                errors.push({msg: 'email already registered'});
                res.render('register',{errors,name,email,password,password2});
            }
            else {
                const newUser = new User({
                    name: name,
                    email: email,
                    password: password
                })
            }
        })
    }
    },
    postLogin:(req,res,next)=>{

    }



}