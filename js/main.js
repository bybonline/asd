// Just In Case Application
// Week: 1
// Name: Fred Williams
// Term: MIU - 0212
// Date: 02/3/2012



//Wait until the DOM is ready.
window.addEventListener("DOMContentLoaded", function(){



	//getElementById Function
	function $(x){
		var theElement = document.getElementById(x);
		return theElement;
	}

	//Create select field element and populate with options.
	function adultCount(){
		var formTag = document.getElementsByTagName("form"), //formTag is an array of all the form tags.
			selectLi = $('adult'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "adults");
		for(var i=0, j=adultGroups.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = adultGroups[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}
	function childCount(){
		var formTag = document.getElementsByTagName("form"), //formTag is an array of all the form tags.
			selectLi = $('child'),
			makeSelect = document.createElement('select');
			makeSelect.setAttribute("id", "children");
		for(var i=0, j=childGroups.length; i<j; i++){
			var makeOption = document.createElement('option');
			var optText = childGroups[i];
			makeOption.setAttribute("value", optText);
			makeOption.innerHTML = optText;
			makeSelect.appendChild(makeOption);
		}
		selectLi.appendChild(makeSelect);
	}

	//Find value of check box.

	function getCheckboxValue1(){
		if($('food').checked){
			foodValue = $('food').value;
		}else{
			foodValue = "No";
		}
	}

	function getCheckboxValue2(){
		if($('supplies').checked){
			suppliesValue = $('supplies').value;
		}else{
			suppliesValue = "No";
		}
	}

	function toggleControls(n){
		switch(n){
			case "on":
				$('storageForm').style.display = "none";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "none";
				$('addNew').style.display = "inline";
				break;
			case "off":
				$('storageForm').style.display = "block";
				$('clear').style.display = "inline";
				$('displayLink').style.display = "inline";
				$('addNew').style.display = "none";
				$('items').style.display = "none";
				break;
			default:
				return false;	
		}
	}

	function storeData(key){
		//If there is no key, this means this is a brand new item and we need a new key.
		if(!key){
			var id 					= Math.floor(Math.random()*100000001);
		}else{
			//Set the id to the existing key we're editing so that it will save over the data.
			//The key is the same key that's been passed alone from the editSubmit event handler
			//to the validate function. and then passed here, into the storeData function.
			id = key;
		}
		//Gather up all our form field values store in an object.
		//Object properties contain array with the form label and input value.
		getCheckboxValue1();
		getCheckboxValue2();
		//alert("testing");
		var item				= {};
			item.fname			= ["First Name:", $('fname').value];
			item.foodValue		= ["Food:", foodValue];
			item.suppliesValue	= ["Supplies:", suppliesValue];
			item.adult			= ["Adults:", $('adults').value];
			item.child 			= ["Children:", $('children').value];
			item.todaysDate		= ["Date:", $('date').value];
			item.income			= ["Income:", $('income').value];
			item.comments		= ["Comments:", $('comments').value];
		//Save data into local storage: Use Stringify to convert object to a string.
		localStorage.setItem(id, JSON.stringify(item));
		alert("Storage Saved");

	}

	function getData(){
		toggleControls("on");
		if(localStorage.length === 0){
			alert("Storage is currently empty so default data was added.");
			autoFillData();
		}
		//Write Data from local storage to the browser.
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		$('items').style.display = "block";
		for(var i=0, len=localStorage.length; i<len;i++){
			var makeli = document.createElement('li');
			var linksLi = document.createElement('li');
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//Convert the string from local storage value back to an object using JSON.parse
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			getImage(obj.foodValue[1], obj.suppliesValue[1], makeSubList);
			for(var n in obj){
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi);
			} 
			makeItemLinks(localStorage.key(i), linksLi); //Creat our edit and delete button/link for each item in local storage.
		}
	}
	
	//Get the image for the right storage type.
	function getImage(foodValue, suppliesValue, makeSubList){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		if(foodValue === "Yes" && suppliesValue === "No"){
			var setSrc = newImg.setAttribute("src", "images/Food.png");	
		}else if(suppliesValue === "Yes" && foodValue === "No"){
			var setSrc = newImg.setAttribute("src", "images/Supplies.png");					
		}else if(suppliesValue === "Yes" && foodValue === "Yes"){				
			var setSrc = newImg.setAttribute("src", "images/Both.png");					
		}
		imageLi.appendChild(newImg);
	}
	
	//Auto Populate Local Storage
	function autoFillData(){
		//The actual JSON obj data required for this to work is coming from our json.js file, which is loaded from our HTML page.
		//Store the JSON file into local storage.
		for(var n in json){
			var id = Math.floor(Math.random()*100000001);
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}
	
	//Make Item Links
	//Create the edit and delete links for each stored item when displayed.
	function makeItemLinks(key, linksLi){
		//add edit single item link
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Storage";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);
		
		//add line break
		//var breakTag = document.createElement('br');
		//linksLi.appendChild(breakTag);
		
		//I liked this better for a line break.
		var breakTag = document.createTextNode('\u00A0');
       	linksLi.appendChild(breakTag);
		
		//add delete single item link
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Storage";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}
	
	function editItem(){
		//Grab the data from our item from Local Storage.
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);
		
		//Show the from
		toggleControls("off");
		
		//Populate the form fields with the current loaclStorage values.
		$('fname').value = item.fname[1];
		if(item.foodValue[1] == "Yes"){
			$('food').setAttribute("checked", "checked");
		}
		if(item.suppliesValue[1] == "Yes"){
			$('supplies').setAttribute("checked", "checked");
		}
		$('adults').value = item.adult[1];
		$('children').value = item.child[1];
		$('date').value = item.todaysDate[1];
		$('income').value = item.income[1];
		$('comments').value = item.comments[1];
		
		//Remove the initial listener from the input contact button.
		save.removeEventListener("click", storeData);
		//Change Submit Button value to say Edit Button
		$('submit').value = "Edit Storage";
		var editSubmit = $("submit");
		//Save the key value established in this function as a property of the editSubmit event.
		//so we can use that value when we save the data we edited.
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}
	
	function deleteItem(){
		var ask = confirm("Are you sure you want to delete this storage?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Storage deleted!");
			window.location.reload();
		}else{
			alert("Storage was not deleted.");
		}
	}

	function clearLocal(){
		if(localStorage.length === 0){
			alert("There is no storage to clear.");
		}else{
			localStorage.clear();
			alert("Entire storage has been deleted!");
			window.location.reload();
			return false;
		}
	}
	
	function validate(e){
		//Define the elements we want to check
		var getFname = $('fname');
		var getAdult = $('adults');
		var getChild = $('children');
		
		//Reset Error Messages
		errMsg.innerHTML = "";
		getFname.style.border = "1px solid black";
		getAdult.style.border = "1px solid black";
		getChild.style.border = "1px solid black";

		
		//Get Error Messages
		var messageAry = [];
		//First Name Validation
		if(getFname.value === ""){
			var fNameError = "First name missing.";
			getFname.style.border = "1px solid red";
			messageAry.push(fNameError);
		}
		
		//Adult Validation
		if(getAdult.value === "--Number of Adults--"){
			var adultError = "Number of adults missing.";
			getAdult.style.border = "1px solid red";
			messageAry.push(adultError);
		}
		
		//Child Validation
		if(getChild.value === "--Number of Children--"){
			var childError = "Number of children missing,";
			getChild.style.border = "1px solid red";
			messageAry.push(childError);
		}
		
		//If there were errors, display them on the screen.
		if(messageAry.length >= 1){
			for(var i=0, j=messageAry.length; i < j; i++){
				var txt = document.createElement('li');
				txt.innerHTML = messageAry[i];
				errMsg.appendChild(txt);
			}
			e.preventDefault();
			return false;
		}else{
			//If all is OK, save our data! Send the key value (which came from the editData function).
			//Remember this key value was passed through the editSubmit event listener as a property.
			storeData(this.key);
		}
	}

	//Variable default Selected
	var adultGroups = ["--Number of Adults--", "0", "1", "2", "3", "4", "5"];
	adultCount();
	var childGroups = ["--Number of Children--", "0", "1", "2", "3", "4", "5"];
	childCount();
	var foodValue,
		suppliesValue = "No"
		errMsg = $('errors');
	;	
	//alert(localStorage.getItem(localStorage.key(0)));

	//Set Link & Submit Click Events


	var displayLink = $('displayLink');
	displayLink.addEventListener("click", getData);
	var clearLink = $('clear');
	clearLink.addEventListener("click", clearLocal);
	var save = $('submit');
	save.addEventListener("click", validate);
});