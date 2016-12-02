var express = require('express');
var path = require('path');
var http = require('http');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var request = require('request');

var routes = require('./routes/index');
var users = require('./routes/users');
var producer = require('./routes/producer');
var mockdata = require('./routes/mockdata');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public'))

// app.use('/', routes);
// app.use('/users', users);

/// catch 404 and forwarding to error handler
// app.use(function(req, res, next) {
//     var err = new Error('Not Found');
//     err.status = 404;
//     next(err);
// });

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.listen(8080, function() {
    console.log('Express.js is running...');
});

// font end
app.get('/', routes.index);
app.get('/product', routes.productCatagory);
app.get('/product/:productID', routes.productDetail);

// producer page
app.get('/producer/:producerID', producer.index);
app.get('/producer/:producerID/list', producer.list);
app.get('/producer/:producerID/product/:productID', producer.detail);
app.get('/producer/:producerID/productadd', producer.add);

// mock data
app.get('/product/list/all', mockdata.listAll);
app.get('/product/list/all_detail', mockdata.listAll_detail);
app.get('/product/search/:productID', mockdata.search); //search product data by product id
app.get('/product/search_detail/:productID', mockdata.search_detail); //search product detail by product id
app.get('/product/search_producer/:producerID', mockdata.search_producer); //search product data by producer id
app.get('/product/search_detail_producer/:producerID', mockdata.search_detail_producer); //search product detail by producer id

app.use(session({secret: 'ssshhhhh'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var herokuapp = "http://takraexpress.herokuapp.com";

app.post('/login', function(req, res){
  var userID = { email : req.body.email, password : req.body.pass };
  // JSON.stringify(userID);
  console.log(userID);
  request.post(
    herokuapp+'/auth/sign_in',
    { json: userID },
    function (error, response, body) {
      console.log(body);
        if (!error && response.statusCode == 200) {
          console.log(response);
        }else{
          res.send("error");
        }
    }
  );
});
//////////////////////////
// app.engine('html', require('ejs').renderFile);
// var sess;
//
// app.get('/',function(req,res){
// sess = req.session;
// //Session set when user Request our app via URL
// if(sess.email) {
// /*
// * This line check Session existence.
// * If it existed will do some action.
// */
//     res.redirect('/admin');
// }
// else {
//     res.render('admin/login');
// }
// });
//
// app.post('/login',function(req,res){
//   sess = req.session;
// //In this we are assigning email to sess.email variable.
// //email comes from HTML page.
//   sess.email=req.body.email;
//   res.end('done');
// });
//
// app.get('/admin',function(req,res){
//   sess = req.session;
// if(sess.email) {
// res.write('<h1>Hello '+sess.email+'</h1>');
// res.end('<a href="+">Logout</a>');
// } else {
//     res.write(' <h1>Please login first.</h1>  ');
//     res.end('<a href="+">Login</a>');
// }
// });
// }
// app.get('/logout',function(req,res){
// req.session.destroy(function(err) {
//   if(err) {
//     console.log(err);
//   } else {
//     res.redirect('/');
//   }
// });
// }
