/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//var url = "http://lyle.smu.edu/~jmmurphy/cse3345/http/menu.json";
//var request = new XMLHttpRequest();
//request.open('GET', url, false);
//request.send();

//if(request.status === 200){
//    var json = JSON.parse(request.responseText);
//}

//document.getElementById("signInEmail").removeAttribute("required");
//document.getElementById("signInPass").removeAttribute("required");

var meatPrices = new Array();
var bunPrices = new Array();
var cheesePrices = new Array();
var toppingPrices = new Array();
var saucePrices = new Array();
var sidePrices = new Array();
var tempTopping;
var tempSauce;


var totalPrices = new Array();

var subTotal;
var total;
var tax;



function Meat(name, price){
    this.price = price;
    this.name = name;
}

function Buns(name, price){
    this.price = price;
    this.name = name;
}


function Cheese(name, price){
    this.price = price;
    this.name = name;
}

function Topping(name, price){
    this.price = price;
    this.name = name;
}

function Sauce(name, price){
    this.price = price;
    this.name = name;
}

function Sides(name, price){
    this.price = price;
    this.name = name;
}

function reviewOrder() { 
    console.log("review order function");

    var temp = document.getElementById("burgerMeat").innerHTML;
    console.log(temp);

    document.getElementById("reviewMeat").innerHTML = temp;
    document.getElementById("reviewMeat").innerHTML = document.getElementById("burgerMeat").innerHTML;
    document.getElementById("reviewBun").innerHTML = document.getElementById("burgerBun").innerHTML;
    document.getElementById("reviewCheese").innerHTML = document.getElementById("burgerCheese").innerHTML;
    document.getElementById("reviewToppings").innerHTML = document.getElementById("burgerToppings").innerHTML;
    document.getElementById("reviewSauces").innerHTML = document.getElementById("burgerSauces").innerHTML;
    document.getElementById("reviewSide").innerHTML = document.getElementById("burgerSide").innerHTML;
    document.getElementById("reviewSubtotal").innerHTML = document.getElementById("subtotal").innerHTML;
    document.getElementById("reviewTax").innerHTML = document.getElementById("tax").innerHTML;
    document.getElementById("reviewTotalPrice").innerHTML = document.getElementById("totalPrice").innerHTML;
    
    //console.log(document.getElementById("burgerMeat").innerHTML);
}

// on review order click, populate the pop up with the order and fade in
$('#payNowButton').click( function() { 
    reviewOrder(); 
    $('#orderPayment').fadeIn("slow");
    return false; 
});

// on exit click, fade out
$('#exitOrderPayment').click( function() {
    $('#orderPayment').fadeOut("slow");
});

/*GETTING THE VALUES FROM THE FORM */
    
function addItem(type, name, value){
var printOut = value;

var price;
	if(type == "1"){
		
		for(var i = 0; i < meatPrices.length; i++) {
			var tempMeat = meatPrices[i];
			if(tempMeat.name == value){
				price = tempMeat.price;
				totalPrices[1]=price;
			}
		} if (price > 0){
			printOut = value+"    ("+price+")";
		}
		document.getElementById("burgerMeat").innerHTML = printOut;
		
	} else if(type == "2"){

		for(var i = 0; i < bunPrices.length; i++) {
			var temp = bunPrices[i];
			if(temp.name == value){
				price = temp.price;
				totalPrices[2]=price;
			}
		} if (price > 0){
			printOut = value+"    ("+price+")";
		}
		document.getElementById("burgerBun").innerHTML = printOut;
	} if(type == "3"){
		totalPrices[3]="0.0";
		document.getElementById("burgerCheese").innerHTML = value;
	} if(type == "4"){
		totalPrices[4]="0.0";
		document.getElementById("burgerToppings").innerHTML = value;
	} if(type == "6"){
	
		for(var i = 0; i < sidePrices.length; i++) {
			var temp = sidePrices[i];
			if(temp.name == value){
				price = temp.price;
				totalPrices[6]=price;
			}
		} if (price > 0){
			printOut = value+"    ("+price+")";
		}
		document.getElementById("burgerSide").innerHTML = printOut;
	}
	
	
	calculatePrice();
	document.getElementById("totalPrice").innerHTML = "Total Price: $" + total;
	document.getElementById("tax").innerHTML = "Tax(8%): $" + tax;
    document.getElementById("subtotal").innerHTML = "SubTotal: $" +subTotal;
	
	return;
}


function calculatePrice() {
	total=0;
	subTotal=0;
	
	for(var i = 0; i < totalPrices.length; i++) {	
		var floating = parseFloat(totalPrices[i]);
		subTotal = subTotal + floating;	
	} 
	tax = Math.round((subTotal*0.08)*100)/100;
	total = Math.round((tax + subTotal)*100)/100;

}


function setPriceBase() {
	for(var i = 0; i < 7; i++) {
		totalPrices[i] = "0.0";
	}
}
    
function getTopping(toppingType)
{
	tempTopping = toppingType;
}

function getSauce(sauce)
{
	tempSauce = sauce;
}

function addTopping() {
	var mydiv = document.getElementById("burgerToppings");
    var newcontent = document.createElement('div');
    newcontent.innerHTML = "<p>"+tempTopping+"</p>";

    while (newcontent.firstChild) {
        mydiv.appendChild(newcontent.firstChild);
    }
	document.getElementById("burgerToppings").innerHTML = value;
}



function addSauce() {
	var mydiv = document.getElementById("burgerSauces");
    var newcontent = document.createElement('div');
    newcontent.innerHTML = "<p>"+tempSauce+"</p>";

    while (newcontent.firstChild) {
        mydiv.appendChild(newcontent.firstChild);
    }	
	document.getElementById("burgerSauces").innerHTML = value;
}
	



var Request = new XMLHttpRequest();
Request.onreadystatechange = function () {
  if (this.readyState === 4 && this.status === 200) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);     
    var textin = JSON.parse(this.responseText);
	myFunction(textin);
	console.log(textin);
	console.log(JSON.stringify(textin));
	
  }
}
Request.open('GET', 'http://private-c05a97-burgers1.apiary-mock.com/getMenu', true);
Request.send(JSON.stringify(document.body));

function myFunction(arr) {
	setPriceBase();


    var patties = "<select class='menu' name='listOfMeat' onchange='addItem(this.id, this.name, this.value)' id='1'><option name='meat' id=0 >Meat</option>";
    var cheese ="<select class='menu'  name = 'cheeses' id ='3' onchange='addItem(this.id, this.name, this.value)'><option name='cheeseDrop'>Cheese</option>";
    var toppings="<select multiple  class='selectionMenu' name ='toppings' id ='4' onchange='getTopping(this.value)'>";
    var sideChoice="<select class='menu'  onchange='addItem(this.id, this.name, this.value)' id='6'><option name='sideDrop' >Sides</option>";
    var breads="<select class='menu' onchange='addItem(this.id, this.name, this.value)'  id='2'><option name='bunDrop' >Bun</option>";
    var sauces="<select multiple  class='selectionMenu' name ='sides' id ='4' onchange='getSauce(this.value)'>";
    var i;
    var tempItemID = 1;
    
    for(i = 0; i < arr.length; i++) {
    	var product = JSON.stringify(arr[i]["name"]);
    	product = product.substr(1,product.length-2);
    	var price = JSON.stringify(arr[i]["price"]);
    	
    	
    	var id = JSON.stringify(arr[i]["id"]);
    	
    	
    	if (id == 1) {
    		var temp = new Meat(5, product);
    		patties += '<option value="'+product+'">'+product+'</option>';  
    	
    		var newMeat = new Meat(product, price)
    		meatPrices.push(newMeat);
    		     
    		
    	} if (id == 2) {
    		var temp = new Buns(5, product);
    		breads += '<option name="bun" >'+product+'</option>';   
    		
    		
    		var newBun = new Buns(product, price)
    		bunPrices.push(newBun);    
    		
    	} if (id == 3) {
    		var temp = new Cheese(5, product);
    		cheese += '<option name="cheese" >'+product+'</option>'; 
    		
    		
    		var newProduct = new Cheese(product, price)
    		cheesePrices.push(newProduct);      
    		
    	} if (id == 4) {
    		var temp = new Topping(5, product);
    		toppings += '<option name="topping">'+product+'</option><br>';  
    		
    		var newProduct = new Topping(product, price)
    		toppingPrices.push(newProduct);         
    		
    	} if (id == 5) {
    		var temp = new Sauce(5, product);
    		sauces += '<option name="sauce">'+product+'</option><br>';     
    		
    		var newProduct = new Sauce(product, price)
    		saucePrices.push(newProduct);     
    		
    	} if (id == 6) {
    		var temp = new Sides(5, product);
    		sideChoice += '<option name="side">'+product+'</option>';  
    		
    		var newProduct = new Sides(product, price)
    		sidePrices.push(newProduct);         
    		
    	}	
    	
    	tempItemID +=1;
    }
    
    
    document.getElementById("meats").innerHTML = patties+"</form>";
    document.getElementById("cheeses").innerHTML = cheese+"</form>";
    document.getElementById("buns").innerHTML = breads+"</form>";
    document.getElementById("toppings").innerHTML = toppings+"</form>";
    document.getElementById("sides").innerHTML = sideChoice+"</form>";
    document.getElementById("sauces").innerHTML = sauces+"</form>";
}



function resetOrder() {

		document.getElementById("burgerMeat").innerHTML = "";
		document.getElementById("burgerBun").innerHTML = "";
		document.getElementById("burgerCheese").innerHTML = "";
		document.getElementById("burgerToppings").innerHTML = "";
		document.getElementById("burgerSide").innerHTML = "";
		document.getElementById("burgerSauces").innerHTML = "";

}

function placeOrder() {
    url = "./api/index.php/placeUserOrder";
    request.open('POST', url, false);
    request.send();
    if(request.status === 200){
        alert("Order Placed!");
    }
}



/*
var url = "./api/index.php/getMeats";
var request = new XMLHttpRequest();
request.open('GET', url, false);
request.send();
if(request.status === 200){
    var json = JSON.parse(request.responseText);
    var html = '';
	for(var i = 0; i < json.meats.length; i++){
                var temp = new Meat(json.meats[i].name,json.meats[i].price); 
		html += '<input type="radio" name="meat" value="'+json.meats[i].name+'" id="'+json.meats[i].name+'">'+json.meats[i].name;
                if(json.meats[i].name.indexOf("Beef") > -1){
                    html += '<img class = "MenuPics" src="img/Beef.png">';
                }
                else{
                    html+= '<img class = "MenuPics" src="img/' + json.meats[i].name + '.png">';
                }
		meatPrices.push(temp);
	}
	document.getElementById("meats").innerHTML = html;
}

url = "./api/index.php/getBuns";
request.open('GET', url, false);
request.send();
if(request.status === 200){
    var json = JSON.parse(request.responseText);
    var html = '';
	for(var i = 0; i < json.buns.length; i++){
            var temp = new Buns(json.buns[i].name,json.buns[i].price); 
		html += '<input type="radio" name="bun" value="'+json.buns[i].name+'" id="'+json.buns[i].name+'">'+json.buns[i].name;
                html += '<img class = "MenuPics" src="img/' + json.buns[i].name+'.png">';
		bunPrices.push(temp);
	}
	document.getElementById("buns").innerHTML = html;
}

url = "./api/index.php/getCheeses";
request.open('GET', url, false);
request.send();
if(request.status === 200){
    var json = JSON.parse(request.responseText);
    var html = '';
	for(var i = 0; i < json.cheeses.length; i++){
                var temp = new Cheese(json.cheeses[i].name,json.cheeses[i].price); 
		html += '<input type="radio" name="cheese" value="'+json.cheeses[i].name+'" id="'+json.cheeses[i].name+'">'+json.cheeses[i].name;
                html += '<img class = "MenuPics" src="img/' + json.cheeses[i].name+'.png">';
		cheesePrices.push(temp);
	}
	document.getElementById("cheeses").innerHTML = html;
}

url = "./api/index.php/getToppings";
request.open('GET', url, false);
request.send();
if(request.status === 200){
    var json = JSON.parse(request.responseText);
    var html = '';
	for(var i = 0; i < json.toppings.length; i++){
                var temp = new Topping(json.toppings[i].name,json.toppings[i].price); 
		html += '<input type="checkbox" name="topping" value="'+json.toppings[i].name+'" id="'+json.toppings[i].name+'">'+json.toppings[i].name;
                html += '<img class = "MenuPics" src="img/' + json.toppings[i].name+'.png">';
		toppingPrices.push(temp);
	}
	document.getElementById("toppings").innerHTML = html;
}

url = "./api/index.php/getSauces";
request.open('GET', url, false);
request.send();
if(request.status === 200){
    var json = JSON.parse(request.responseText);
    var html = '';
	for(var i = 0; i < json.sauces.length; i++){
                var temp = new Sauce(json.sauces[i].name,json.sauces[i].price); 
		html += '<input type="checkbox" name="sauce" value="'+json.sauces[i].name+'" id="'+json.sauces[i].name+'">'+json.sauces[i].name;
                html += '<img class = "MenuPics" src="img/' + json.sauces[i].name+'.png">';
		saucePrices.push(temp);
	}
	document.getElementById("sauces").innerHTML = html;
}

url = "./api/index.php/getSides";
request.open('GET', url, false);
request.send();
if(request.status === 200){
    var json = JSON.parse(request.responseText);
    var html = '';
	for(var i = 0; i < json.sides.length; i++){
                var temp = new Sides(json.sides[i].name,json.sides[i].price); 
		html += '<input type="radio" name="side" value="'+json.sides[i].name+'" id="'+json.sides[i].name+'">'+json.sides[i].name;
                html += '<img class = "MenuPics" src="img/' + json.sides[i].name+'.png">';
		sidePrices.push(temp);
	}
	document.getElementById("sides").innerHTML = html;
}


var form = document.getElementById('signInArea');
console.log("HI");
document.getElementById('register').onclick = function() {
	console.log("Registration");
    form.action = 'Registration.html';
    form.submit();
}
document.getElementById('signInBttn').onclick = function() {
    form.action = '';
    form.submit();
}

//Login
url = "./api/index.php/loginUser";
var first;
var last;
request.open('POST', url, false);
request.send();
if(request.status === 200){
    var json = JSON.parse(request.responseText);
	first = json.fName;
	last = json.lName;
}
document.cookie = "fName="+first;
document.cookie = "lName="+last;






var meats = document.getElementsByName("meat");
function selectMeat(){
	for (var i=0; i < meats.length; i++){
	   if (meats[i].checked){
	      document.getElementById("burgerMeat").innerHTML = meats[i].value + ': $' + meatPrices[i].price;
	      subTotal += meatPrices[i].price;
	      break;
	   }
	}
        tax = Math.round((subTotal*0.08)*100)/100;
            total = Math.round((tax + subTotal)*100)/100;
            document.getElementById("totalPrice").innerHTML = "Total Price: $" + total;
            document.getElementById("tax").innerHTML = "Tax(8%): $" + tax;
            document.getElementById("subtotal").innerHTML = "SubTotal: $" +subTotal;
};
for (var i = 0; i < meats.length; ++i) {
  var meat = meats[i];
  meat.addEventListener("click", selectMeat, false);
}

var buns = document.getElementsByName("bun");
function selectBun(){
	for (var i=0; i < buns.length; i++){
	   if (buns[i].checked){
	      document.getElementById("burgerBun").innerHTML = buns[i].value + ': $' + bunPrices[i].price;
	      subTotal += bunPrices[i].price;
	      break;
	   }
	}
        tax = Math.round((subTotal*0.08)*100)/100;
        total = Math.round((tax + subTotal)*100)/100;
        document.getElementById("totalPrice").innerHTML = "Total Price: $" + total;
        document.getElementById("tax").innerHTML = "Tax(8%): $" + tax;
        document.getElementById("subtotal").innerHTML = "SubTotal: $" +subTotal;
};
for (var i = 0; i < buns.length; ++i) {
  var bun = buns[i];
  bun.addEventListener("click", selectBun, false);
}

var cheeses = document.getElementsByName("cheese");
function selectCheese(){
	for (var i=0; i < cheeses.length; i++){
	   if (cheeses[i].checked){
	      document.getElementById("burgerCheese").innerHTML = cheeses[i].value + ': $' + cheesePrices[i].price;
	      subTotal += cheesePrices[i].price;
	      break;
	   }
	}
        tax = Math.round((subTotal*0.08)*100)/100;
        total = Math.round((tax + subTotal)*100)/100;
        document.getElementById("totalPrice").innerHTML = "Total Price: $" + total;
        document.getElementById("tax").innerHTML = "Tax(8%): $" + tax;
        document.getElementById("subtotal").innerHTML = "SubTotal: $" +subTotal;
};
for (var i = 0; i < cheeses.length; ++i) {
  var cheese = cheeses[i];
  cheese.addEventListener("click", selectCheese, false);
}

var sides = document.getElementsByName("side");
function selectSide(){
	for (var i=0; i < sides.length; i++){
	   if (sides[i].checked){
	      document.getElementById("burgerSide").innerHTML = sides[i].value + ': $' + sidePrices[i].price;
	      subTotal += sidePrices[i].price;
	      break;
	   }
	}
        tax = Math.round((subTotal*0.08)*100)/100;
        total = Math.round((tax + subTotal)*100)/100;
        document.getElementById("totalPrice").innerHTML = "Total Price: $" + total;
        document.getElementById("tax").innerHTML = "Tax(8%): $" + tax;
        document.getElementById("subtotal").innerHTML = "SubTotal: $" +subTotal;
}
for (var i = 0; i < sides.length; ++i) {
  var side = sides[i];
  side.addEventListener("click", selectSide, false);
}

var toppings = document.getElementsByName("topping");
for (var i = 0; i < toppings.length; ++i) {
  var t = toppings[i];
  t.addEventListener("click", selectToppings, false);
}
function selectToppings(){
	var toppingsSelected = new Array();
	var price = 0;
	for (var i = 0; i < toppings.length; ++i) {
	  if(toppings[i].checked){
	  	toppingsSelected.push(toppings[i].value);
	  	price += toppingPrices[i].price;
	  }
	}
	document.getElementById("burgerToppings").innerHTML = toppingsSelected + ': $' + price;
	subTotal += price;
        tax = Math.round((subTotal*0.08)*100)/100;
        total = Math.round((tax + subTotal)*100)/100;
        document.getElementById("totalPrice").innerHTML = "Total Price: $" + total;
        document.getElementById("tax").innerHTML = "Tax(8%): $" + tax;
        document.getElementById("subtotal").innerHTML = "SubTotal: $" +subTotal;
}

var sauces = document.getElementsByName("sauce");
for (var i = 0; i < sauces.length; ++i) {
  var sauce = sauces[i];
  sauce.addEventListener("click", selectSauces, false);
}
function selectSauces(){
	var saucesSelected = new Array();
	var price = 0;
	for (var i = 0; i < sauces.length; ++i) {
	  if(sauces[i].checked){
	  	saucesSelected.push(sauces[i].value);
	  	price += toppingPrices[i].price;
	  }
	}
	document.getElementById("burgerSauces").innerHTML = saucesSelected + ': $' + price;
	subTotal += price;
        tax = Math.round((subTotal*0.08)*100)/100;
        total = Math.round((tax + subTotal)*100)/100;
        document.getElementById("totalPrice").innerHTML = "Total Price: $" + total;
        document.getElementById("tax").innerHTML = "Tax(8%): $" + tax;
        document.getElementById("subtotal").innerHTML = "SubTotal: $" +subTotal;
}

document.getElementById("totalPrice").innerHTML = "Total Price: $" + total;
document.getElementById("tax").innerHTML = "Tax(8%): $" + tax;
document.getElementById("subtotal").innerHTML = "SubTotal: $" +subTotal;

function addPrice(){
    var meat = document.getElementById("meat");
    var bread = document.getElementById("bread");
    var cheese = document.getElementById("cheese");
    var toppings = document.getElementBySomething;
    var sauces = document.getElementById("sauce");
    for(var i = 0; i < meatPrices.length; i++){
        if(meat === meatPrice[i].name){
            subTotal += meatPrices[i].price; 
        }
    }
    
    for(var i = 0; i < bunPrices.length; i++){
        if(meat === bunPrice[i].name){
            subTotal += bunPrices[i].price; 
        }
    }
    
    for(var i = 0; i < cheesePrices.length; i++){
        if(meat === cheesePrice[i].name){
            subTotal += cheesePrices[i].price; 
        }
    }
    
    for(var i = 0; i < toppingPrices.length; i++){
        if(meat === toppingPrice[i].name){
            subTotal += toppingPrices[i].price; 
        }
    }
    
    for(var i = 0; i < saucePrices.length; i++){
        if(meat === saucePrice[i].name){
            subTotal += saucePrices[i].price; 
        }
    }
    
    for(var i = 0; i < sidePrices.length; i++){
        if(meat === sidePrice[i].name){
            subTotal += sidePrices[i].price; 
        }
    }
    tax = subTotal*0.08
    Total = tax + subTotal;
    document.getElementById("totalPrice").innerHTML = "Total Price: $" + total;
    document.getElementById("tax").innerHTML = "Tax(8%): $" + tax;
    document.getElementById("subtotal").innerHTML = "SubTotal: $" +subTotal;
}

function getPreviousOrder(){
    var url = "./api/index.php/getLastOrder/";
    var request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send();
    if(request.status === 200){
        var json = JSON.parse(request.responseText);
        for(var key in json){
            for(var i = 0; i < json[key].components.length; i++){
                //for(var j = 0; j < meatPrices.length; j++)
            }
            var q = json[key].quantity;
            //put the quantity on the order paper
        }
    }
}
*/