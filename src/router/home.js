const { Router } = require('express')
const { register, login, register2, login2 } = require('../controller/homeController')
const { admin, home, video, profilPage } = require('../controller/priyvet')
const routes = Router()

routes.get('/', register2)
routes.get('/login', login2)
routes.post('/auth/login2', login)
routes.post('/register', register)
routes.get('/home', home)
routes.get('/admin', admin)
routes.post('/video', video)
routes.get('/profilPage', profilPage)





// routes.get('/api', (req, res) => {
//    res.render('homePost')
// })


//  routes.get('/api',(req,res)=>{
//     res.render('homePagest')
//  })
//  routes.get('/*',(req,res)=>{
//     res.redirect('https://goole.uz')
//  })
//  routes.post('/',(req,res)=>{
//     res.redirect('/')
//  })
module.exports = routes