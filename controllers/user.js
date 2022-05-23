module.exports = {
    getRegister: (req,res)=>{
        res.render('register.ejs')
    },
    getLogin:(req,res)=>{
        res.render('login.ejs')
    },

}