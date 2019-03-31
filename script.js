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
      document.getElementById('error').style = 'display:none';
      clearInput();
    }
    if(http.readyState == 4 && http.status != 200){
      document.getElementById('error').style = 'display:block';
      document.getElementById('error').innerHTML = `Pogresan email ili password, pokusajte ponovo!`;
      clearInput();
    }
  }
  http.open("POST", 'https://3d1pftib26.execute-api.eu-west-1.amazonaws.com/dev/user/login', true);
  http.setRequestHeader('Content-type','application/json');
  http.send(data);
}

function show () {
  let information;
  let http = new XMLHttpRequest;
  let url = "https://3d1pftib26.execute-api.eu-west-1.amazonaws.com/dev/user/profile";
  http.open('GET' , url,true);
  http.setRequestHeader('Authorization',token.token);
  http.send();
  http.onreadystatechange = function () {
    if(http.readyState==4 && http.status==200){
      console.log(http.responseText);
      document.getElementById('button').style = 'display:none';
      information = JSON.parse(http.responseText);
      let table = document.getElementsByTagName('tbody')[0];
      console.log(table);
      document.getElementById('information').style = 'display:block';
      table.innerHTML += `<tr><td>${information.first_name}</td><td>${information.last_name}</td><td>${information.email}</td><td>${information.id}</td></tr>`
    }
  }
}

function clearInput() {
  let inputs = document.getElementsByTagName('input');
  for(let i = 0; i < inputs.length; i++){
    inputs[i].value = '';
  }
}