var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../../models");


module.exports = function (app) {

    app.delete("/delete", function (req, res) {
        db.Article.remove({}, function (err) {
          if (err) {
            console.log(err)
          } else {
            res.end('success');
          }
        })
      })
      
      app.get("/scrape/:id", function (req, res) {
        console.log(req.params.id)
        axios.get("https://www.nytimes.com/section/" + req.params.id).then(function (response) {
          var $ = cheerio.load(response.data);
      
          $(".css-4jyr1y").each(function (i, element) {
            var obj = {}
            obj.title = $(this).children('a').children('h2.css-1dq8tca.e1xfvim30').text();
            obj.link = 'https://www.nytimes.com/' + $(this).children('a').attr('href');
            obj.summary = $(this).children('a').children('p.css-1echdzn.e1xfvim31').text();
      
            db.Article.create(obj)
              .then(function (dbArticle) {
                console.log(dbArticle);
              })
              .catch(function (err) {
                console.error(err);
              });
          });
          res.send("Scrape Complete");
        })
      
      });
      
      
      app.get('/saved', function (req, res) {
        db.Saved.find({})
          .then(function (dbArticle) {
            res.json(dbArticle);
          })
          .catch(function (err) {
            res.json(err);
          });
      });
      
      
      app.get("/articles", function (req, res) {
        db.Article.find({})
          .then(function (dbArticle) {
            res.json(dbArticle);
          })
          .catch(function (err) {
            res.json(err);
          });
      });
      
      app.post("/saveArticles/:id", function (req, res) {
      
        db.Saved.findOne({ title: req.body.title }, function (err, doc) {
          if (doc == null) {
            db.Saved.create(req.body)
              .then(function (save) {
                console.log('Saved: ' + save)
              })
              .catch(function (err) {
                res.json(err);
              });
          }else{
            console.log('already exists')
          }
        })
      });
      
      app.get("/articlesSaved/:id", function (req, res) {
        db.Saved.findOne({ _id: req.params.id })
          .populate("note")
          .then(function (dbArticle) {
            res.json(dbArticle);
          })
          .catch(function (err) {
            res.json(err);
          });
      });
      
      
      app.get("/articles/:id", function (req, res) {
        db.Article.findOne({ _id: req.params.id })
          .populate("note")
          .then(function (dbArticle) {
            res.json(dbArticle);
          })
          .catch(function (err) {
            res.json(err);
          });
      });
      
      app.delete("/deleteSaved/:id", function (req, res) {
        db.Saved.deleteOne({_id: req.params.id})
        .then(() => {
          console.log('deleted '+req.params.id)
          res.end('Deleted '+req.params.id)
        })
        .catch(function (err){
          res.json(err);
        });
      });
      
      app.post("/articlesSaved/:id", function (req, res) {
        db.Note.create(req.body)
          .then(function (dbNote) {
            return db.Saved.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
          })
          .then(function (dbArticle) {
            res.json(dbArticle);
          })
          .catch(function (err) {
            res.json(err);
          });
      });
      
      app.post("/articles/:id", function (req, res) {
        db.Note.create(req.body)
          .then(function (dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
          })
          .then(function (dbArticle) {
            res.json(dbArticle);
          })
          .catch(function (err) {
            res.json(err);
          });
      });

}