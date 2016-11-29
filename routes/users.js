exports.index = function(req, res) {
  res.render('index', { title: '123' });
  // req.getConnection(function(err,connection){
  //
  //   connection.query('SELECT * FROM BOOK LEFT JOIN BOOK_AUTHOR ON BOOK.BookID = BOOK_AUTHOR.BookID LEFT Join AUTHOR ON BOOK_AUTHOR.AuthorID = AUTHOR.AuthorID',function(err,rows){
  //
  //     if(err){
  //       console.log("Error Selecting : %s ",err );
  //     }
  //     console.log(rows);
  //     // res.render('index', {data : JSON.stringify(rows)});
  //     res.render('index', {data : rows});
  //
  //   });
  //
  // });
};
