let token;

function submit () {
  let http = new XMLHttpRequest;
  let obj = {};
  obj.email = document.getElementById('email').value;
  obj.password = document.getElementById('password').value;
  let data = JSON.stringify(obj);
  console.log(data);
  http.onreadystatechange = function () {
    console.log(http.readyState);
    console.log(http.status);
    if(http.readyState==4 && http.status==200){
      document.getElementById('hide').style = 'display:none;';
      console.log(http.responseText);
      token = JSON.parse(http.responseText);
      console.log(token.token);
      document.getElementById('button').style = 'display:block';
    }
  }
  http.open("POST", 'https://3d1pftib26.execute-api.eu-west-1.amazonaws.com/dev/user/login', true);
  http.setRequestHeader('Content-type','application/json');
  http.send(data);
}

function show () {
  let http = new XMLHttpRequest;
  let url = "https://3d1pftib26.execute-api.eu-west-1.amazonaws.com/dev/user/profile";
  http.open('GET' , url,true);
  http.setRequestHeader('Authorization',token.token);
  http.send();
  http.onreadystatechange = function () {
    if(http.readyState==4 && http.status==200){
      console.log(http.responseText);
    }
  }
}