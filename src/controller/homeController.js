

const Io = require('../utiles/Io')
const User = new Io('./db/user.json')
const UserM = require('../models/userM')
const jwt = require('jsonwebtoken')
const PostDB = new Io('./db/data.json')
const { v4: uuid } = require('uuid')

const bcrypt = require('bcrypt')
// const { render } = require('ejs')



exports.register = async (req, res) => {
   try {
      const { username, password } = req.body
      const users = await User.read()
      const findUser = await users.find((el) => el.username === username)
      const posts = await PostDB.read()
      res.cookie("posts", posts)
      if (findUser) {
         res.render('notFound')
         return
      }
      const id = (users[users.length - 1]?.id || 0) + 1
      const date = new Date()
      const heshPas = await bcrypt.hash(password, 12)
      const newData = new UserM(id, username, heshPas, date, "false")
      const data = users.length ? [...users, newData] : [newData]
      const token = jwt.sign({ id: id }, process.env.SECRET_KEY, { expiresIn: '24h' })
      res.cookie("token", token)
      res.cookie("profil", username)
      const arr = username[0].toUpperCase()
      console.log(username[0]);
      if (req.cookies.token) {
         const posts = req.cookies.posts
         res.render("home", { arr, posts })
      }
      res.render("home", { posts })
      // res.status(200).json({ token: req.cookies.token })
      User.write(data)
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: "INTERNAL SERVER ERROR" })
   }
}


exports.register2 = async (req, res) => {
   res.render("index")
}



exports.login = async (req, res) => {
   try {
      const { username, password } = req.body
      const users = await User.read()
      const findUser = await users.find((el) => el.username === username)
      if (!findUser) {
         res.render('notFound')
         return
      }
      const comparePass = await bcrypt.compare(password, findUser.password)
      if (!comparePass) {
         res.render('notFound')
         return
      }
      const arr = username[0].toUpperCase()
      res.cookie("profil", username)
      if (req.cookies.token) {
         const posts = req.cookies.posts
         res.render("home", { arr, posts })
      } else {
         res.render("index")
      }
   } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'INTERNAL ERROR' })
   }
}
exports.login2 = (req, res) => {
   res.render("login")
}