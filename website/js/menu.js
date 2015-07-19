



function clearItems(elementName, elementID) 
{
	console.log(elementID);
	elementID = parseInt(elementID);
	document.getElementById(elementName).innerHTML = "";
	totalPrices[elementID]=0;
	console.log(totalPrices);
	calculatePrice();
	

}




function resetOrder() {

		document.getElementById("burgerMeat").innerHTML = "";
		document.getElementById("burgerBun").innerHTML = "";
		document.getElementById("burgerCheese").innerHTML = "";
		document.getElementById("burgerToppings").innerHTML = "";
		document.getElementById("burgerSide").innerHTML = "";
		document.getElementById("burgerSauces").innerHTML = "";
		setPriceBase();
		calculatePrice();

}

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
	
	return;
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
	




function setPriceBase() {
	for(var i = 0; i < 7; i++) {
		totalPrices[i] = "0.0";
	}
}



function calculatePrice(){
	console.log("CALCULATING");
	total=0;
	subTotal=0;
	
	
	for(var i = 0; i < totalPrices.length; i++) {	
		var floating = parseFloat(totalPrices[i]);
		subTotal = subTotal + floating;	
	} 
	tax = Math.round((subTotal*0.08)*100)/100;
	total = Math.round((tax + subTotal)*100)/100;
	
	document.getElementById("totalPrice").innerHTML = "Total Price: $" + total;
	document.getElementById("tax").innerHTML = "Tax(8%): $" + tax;
    document.getElementById("subtotal").innerHTML = "SubTotal: $" +subTotal;
  
	

}
   
