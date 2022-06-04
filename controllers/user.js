const User = require('../models/User')
const bcrypt = require('bcrypt')
const passport = require('passport')



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
        errors.push ({msg : 'Passwords do not match.'})
    }
    // check p/w length more than 6
    if(password.length < 6){
        errors.push({msg: 'Password needs to be atleast 6 characters.'})
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
                errors.push({msg: 'Email already registered.'});
                res.render('register',{errors,name,email,password,password2});
            }
            else {
                const newUser = new User({
                    name: name,
                    email: email,
                    password: password
                })
                // hash password
                bcrypt.genSalt(10,(err,salt)=>
                bcrypt.hash(newUser.password,salt,
                   (err,hash)=>{
                       if(err) throw err
                       // save pass to hash
                       newUser.password = hash;

                       newUser.save()
                       .then((value)=>{
                           console.log(value)
                           req.flash('success_msg','You have now registered!')
                           res.redirect('/users/login')
                       })
                       .catch(value=> console.log(value));
                   }))
            }
            // else statement ends
        })
    }
    },
    postLogin:(req,res,next)=>{
        passport.authenticate('local',{
            successRedirect : '/users/dashboard',
            failureRedirect : '/users/login',
            failureFlash : true,
            })
    },

    getDashboard:(req,res)=>{
        res.render('dashboard.ejs')

    }


}