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
	verification(userName, userPass);
	respondToLogin();

}


function populateUsers(userArray) {
	console.log("POPULATING USERS");
	 for(i = 0; i < userArray.length; i++) {
    	var name = JSON.stringify(userArray[i]["name"]);
    	name = name.substr(1,name.length-2);
    	var password = JSON.stringify(userArray[i]["password"]);
    	password = password.substr(1,password.length-2);
    	
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
	console.log(checkName);
	console.log(checkPassword);
		
		if(checkName == userName && checkPassword == password){
			console.log("CORRECT USER");
			registered="TRUE";
			return;
		}	
	}
}


function respondToLogin(){
	console.log("RESPONDING");
	if(registered == "TRUE") {
		document.getElementById("signedIn").style.display='block';
		console.log("correct user");
	}
	
	if(registered == "FALSE") {
		document.getElementById("signedIn").style.display='none';
		console.log("bad user");
	}

}



