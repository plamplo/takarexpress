var link = "http://localhost:8080";
var herokuapp = "http://takraexpress.herokuapp.com";
var http = require('request');

exports.index = function(req, res) {

  http.get({ url: link+"/product/search_detail_producer/"+req.params.producerID},
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
          // console.log(body);
          var obj = JSON.parse(body);
          // res.render('demo/content', { data:obj });
          res.render('producer/index', { title: 'หน้าแรก', data:obj, producerID: req.params.producerID });
      }
    });
  // res.render('producer/index', { title: 'Producer', producerID: req.params.producerID });
}

exports.list = function(req, res) {
  http.get({ url: link+"/product/search_detail_producer/"+req.params.producerID},
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
          // console.log(body);
          var obj = JSON.parse(body);
          // res.render('demo/content', { data:obj });
          res.render('producer/list', { title: 'รายการผลิตภัณฑ์', data:obj, producerID: req.params.producerID });
      }
    });
}

exports.detail = function(req, res) {
  http.get({ url: link+"/product/search_detail/"+req.params.productID},
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
          // console.log(body);
          var obj = JSON.parse(body);
          // console.log(obj)
          res.render('producer/detail', { title: 'รายละเอียดผลิตภัณฑ์', data:obj, producerID: req.params.producerID });
      }
    });
}

exports.add = function(req, res) {
  res.render('producer/productAdd', { title: 'เพิ่มผลิตภัณฑ์', producerID: req.params.producerID });
}

exports.checking = function(req, res){
  var obj = JSON.parse(req.body.body);
  http.get({ url: herokuapp+"/api/v1/users/"+obj.id},
    function(error, response, body) {
      if (!error && response.statusCode == 200) {
        // console.log(body);
          // console.log(body);
          var data = JSON.parse(body);
          var product = data.products;
          // console.log(product)
          res.render('producer/index', { title: 'รายละเอียดผลิตภัณฑ์', user:data, product: product });
      }else{
        console.log("fuck to");
      }
    });
}
