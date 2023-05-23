
const Io = require('../utiles/Io')
const User = new Io('./db/user.json')
const PostDB = new Io('./db/data.json')
const post = require('../models/post')
const { v4: uuid } = require('uuid')
const jwt = require('jsonwebtoken')

// =================

exports.home = async (req, res) => {
    try {
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "INVALID SERVER ERROR" })
    }
}

// ==========================

exports.admin = async (req, res) => {
    try {
        res.render("addVideo")
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "INVALID SERVER ERROR" })
    }
}
// ==============
exports.video = async (req, res) => {
    try {
        const { name } = req.body
        const { video } = req.files
        const videosFile = `${uuid()}.${video.mimetype.split("/")[1]}`;
        console.log(videosFile);
        video.mv(process.cwd() + "/src/uploads/" + videosFile);
        const posts = await PostDB.read()
        const id = (posts[posts.length - 1]?.id || 0) + 1
        const userId = jwt.verify(req.cookies.token, process.env.SECRET_KEY)
        const date = new Date()
        const newPost = new post(id, name, videosFile, userId.id, date)
        const data = posts.length ? [...posts, newPost] : [newPost];
        PostDB.write(data)
        const findPost = await posts.find((el) => el.name === name)
        const arr = req.cookies.profil[0].toUpperCase()
        res.render("home", { arr, posts })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "INVALID SERVER ERROR" })
    }
}
// ===============

exports.profilPage = async (req, res) => {
    try {
        const posts = await PostDB.read()
        const userId = jwt.verify(req.cookies.token, process.env.SECRET_KEY)
        const findPost = await posts.find((el) => el.userId === userId.id)
        console.log(findPost);
        const username = req.cookies.profil
        console.log(username);
        if (findPost) {
            res.render('profil', { username, findPost })
        }
        else {
            res.render('notFound')
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "INVALID SERVER ERROR" })
    }
}