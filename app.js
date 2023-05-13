//jshint esversion:6

// Express Setup
const express = require("express");
const app = express();
app.use(express.static("public"));

// body parser Setup
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({
    extended: true
}));

// EJS Setup
const ejs = require("ejs");
app.set('view engine', 'ejs');


const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/wikiDB")

const articleSchema = new mongoose.Schema({
    title: String,
    content: String
});

const Article = mongoose.model("Article", articleSchema);


app.route("/articles")
    .get(function (req, res) {

        Article.find({})
            .then(function (articles) {
                res.json(articles);
            })
            .catch(function (err) {
                console.log(err);
                res.json(err);
            })

    }
    )

    .post(
        function (req, res) {
            Article.insertMany({ title: req.body.title, content: req.body.content });
            res.redirect("/articles")

        }
    )

    .delete(
        function (req, res) {
            Article.deleteMany().then(function () {
                console.log("Data deleted"); // Success
            }).catch(function (error) {
                console.log(error); // Failure
            });;
            res.redirect("/articles")
        }
    )
    ;


app.route("/articles/:articleTitle")
    .get(function (req, res) {

        Article.findOne({ title: req.params.articleTitle })
            .then(function (article) {
                res.json(article);
            })
            .catch(function (err) {
                console.log(err);
                res.json(err);
            })
    }
    )

    .put(

        function (req, res) {
            Article.findOneAndUpdate(
                { title: req.params.articleTitle },
                { title: req.body.title, content: req.body.content },
                { overwrite: true }
            )
                .then(function (response) {
                    res.json({ response: "Successfuly updated article.", previous_article: response });
                })
                .catch(function (err) {
                    console.log(err);
                })
        }
    )

    .patch(

        function (req, res) {
            Article.updateOne(
                { title: req.params.articleTitle },
                req.body
            )
                .then(function (response) {
                    res.json({ response: "Successfuly updated article.", previous_article: response });
                })
                .catch(function (err) {
                    console.log(err);
                })
        }
    )

    .delete(

        function (req, res) {
            Article.deleteOne(
                { title: req.params.articleTitle }
            )
                .then(function (response) {
                    res.json({ response: `Successfuly deleted ${req.params.articleTitle} article.`});
                })
                .catch(function (err) {
                    console.log(err);
                })
        }
    )

    ;


app.listen(3000, function () {
    console.log("Server started on port 3000");
});