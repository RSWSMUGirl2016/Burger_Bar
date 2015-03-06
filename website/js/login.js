// Login Form

var userList = new Array();



function loginInfo(name, password){
	this.name = name;
	this.password = password;
}


$(function() {
    var button = $('#loginButton');
    var box = $('#loginBox');
    var form = $('#login-content');
    button.removeAttr('href');
    button.mouseup(function(login) {
        box.toggle();
        button.toggleClass('active');
    });
    form.mouseup(function() { 
        return false;
    });
    $(this).mouseup(function(login) {
        if(!($(login.target).parent('#loginButton').length > 0)) {
            button.removeClass('active');
            box.hide();
        }
    });
});



$(function() {
    var button = $('#registerButton');
    var box = $('#registerBox');
    var form = $('#register-content');
    button.removeAttr('href');
    button.mouseup(function(login) {
        box.toggle();
        button.toggleClass('active');
    });
    form.mouseup(function() { 
        return false;
    });
    $(this).mouseup(function(login) {
        if(!($(login.target).parent('#registerButton').length > 0)) {
            button.removeClass('active');
            box.hide();
        }
    });
});


/*	VERIFYING THE USER INFORMATION AS NECESSARY */

function userTriesToLogin() {
	var userName;
	var userPass;
	
	userName = document.getElementById("signInEmail").value;
	userPass = document.getElementById("signInPass").value;
	
	console.log("NAME: "+userName+" >> PASS: "+userPass);
	getUsers();
	verification();
}

function getUsers(){
var userRequest = new XMLHttpRequest();
userRequest.open('GET', 'http://private-c05a97-burgers1.apiary-mock.com/verifyUser', false);

console.log("GET USER");
userRequest.onreadystatechange = function () {
	console.log("THIS THING");
  if (this.readyState === 4 && this.status === 200) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
    
    var userInformation = JSON.parse(this.responseText);
    populateUsers(userInformation);
    
  }
  

  userRequest.send(JSON.stringify(document.body));
  
  
}

}

function populateUsers(userArray) {
	 for(i = 0; i < userArray.length; i++) {
    	var name = JSON.stringify(userArray[i]["name"]);
    	name = name.substr(1,name.length-2);
    	var password = JSON.stringify(userArray[i]["password"]);
    	
    	var user = new loginInfo(name, password);
    	userList.push(user);
	}
}

function verification(userName, password) {
	var checkName;
	var checkPassword;
	
	for(var i = 0; i < userList.length; i++) {
		checkName = userList[i].name;
		checkPassword = userList[i].password;
		
		if(checkName == userName && checkPassword == password){
			console.log("CORRECT USER");
			return;
		}	
	
	}
	

}



