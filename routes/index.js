// var express = require('express');
// var router = express.Router();
//
// /* GET home page. */
// router.get('/', function(req, res) {
//   res.render('index', { title: 'Express' });
// });
//
// module.exports = router;
var link = "http://localhost:8080";
var http = require('request');
exports.index = function(req, res) {
  http.get({ url: link+"/product/list/all"},
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
          // console.log(body);
          var obj = JSON.parse(body);
          res.render('demo/content', { data:obj });
      }
    });
};

exports.productCatagory = function(req, res) {
  http.get({ url: link+"/product/list/all"},
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
          // console.log(body);
          var obj = JSON.parse(body);
          res.render('demo/productlist', { data:obj });
      }
    });
  // res.render('demo/productlist', { title: '' });
};

exports.productDetail = function(req, res) {
  http.get({ url: link+"/product/search_detail/"+req.params.productID},
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
          // console.log(body);
          var obj = JSON.parse(body);
          console.log(obj)
          res.render('demo/productdetail', {data:obj});
      }
    });
  // res.render('demo/productdetail', { title: req.params.productID });
};
