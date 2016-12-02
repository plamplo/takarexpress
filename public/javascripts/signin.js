function login(){
  // console.log("dkdk");
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var userID = { email : username, password : password };
  $.ajax({
      url:"http://takraexpress.herokuapp.com/auth/sign_in",
      type:"POST",
      dataType: "json",
      contentType: "application/json",
      cache:false,
      data: JSON.stringify(userID),
      success: function(res, status, jqXHR) {
          var header = jqXHR.getResponseHeader("Access-token");
          console.log(header);
          console.log(jqXHR.getAllResponseHeaders());
          // console.log(adminID.email);
          console.log(res.data.role_id);
          if(res.data.role_id === 1){
            // window.location.href="/";
          }else if(res.data.role_id === 2){
            post('/producer', {body: JSON.stringify(res.data), header: jqXHR.getAllResponseHeaders()});
          }

          // window.location.href="/producer:";
      },
      error:function(jqXHR, textStatus, errorThrown)
      {
          document.getElementById('error').innerHTML = "<div class='panel callout alert radius'><h5>Sorry.</h5><p>Your username or password is incorrect.</p></div>"
      }
  });
}
