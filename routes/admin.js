var request = require('request');
var http = require('request');
//var link = "http://takraexpress.herokuapp.com"
var link = "http://localhost:8080";

exports.login = function(req, res) {
  res.render('admin/login', { title: 'Admin'});
}

// exports.index = function(req, res) {
//   //var adminID = res.render('admin/index', { title: 'Admin'});
//   var adminID =
//     {
//       "email" : "o_k_t@hotmail.com",
//       "password" : "password"
//     };
//
// request({
//     url: "http://takraexpress.herokuapp.com/auth/sign_in",
//     method: "POST",
//     json: true,   // <--Very important!!!
//     body: adminID
// }, function (error, response, body){
//     console.log(response);
//     //console.log(body);
// });
// }

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
