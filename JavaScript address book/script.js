
const addBtn = document.getElementById('submit-btn');
const search_on = document.getElementById('search_on');
const cancelBtn = document.getElementById('cancel-btn');
const resetBtn = document.getElementById('reset-btn');
const recordContainer = document.querySelector('.record-container');
const deleteBtn = document.getElementById('delete-btn');
const editBtn = document.getElementById('edit-btn');
const update_sec = document.getElementById('update_sec');

/************************************************ */
const name = document.getElementById('name');
const email = document.getElementById('email');
const number = document.getElementById('number');
const updated_id = document.getElementById('updated_id');
let ContactArray = [];
let id = 0;
	// Object constructor for Contact
	function Contact(id, name, email, number){
		this.id = id;
		this.name = name;
		this.email = email;
		this.number = number;
	}
	// Display available record
	document.addEventListener('DOMContentLoaded', function(){
		//localStorage.setItem('contacts',{id:1,name:'John Doe',email:'test2@example.com','number':'1234567890'});
		if(localStorage.getItem('contacts')=='[]'){
			const ContactArray_default=[];
			const defaultDate = new Contact(1, 'John Doe','test2@example.com' , '123 45 678');
			ContactArray_default.push(defaultDate);
			const defaultDate1 = new Contact(2, 'Joe Sixpack','test1@example.com' , '12345678');
			ContactArray_default.push(defaultDate1);
			const defaultDate2 = new Contact(3, 'Average Joe','test@uis.no' , '12324567');
			ContactArray_default.push(defaultDate2);
			// Storing contact record in local storage
			localStorage.setItem('contacts', JSON.stringify(ContactArray_default));
			id=3;
		}
		if(localStorage.getItem('contacts') == null){
			ContactArray = [];
		} else {
			ContactArray = JSON.parse(localStorage.getItem('contacts'));
			lastID(ContactArray);
		}
		displayRecord();
	});
	// Display Function
	function displayRecord(){
		ContactArray.forEach(function(singleContact){
			addToList(singleContact);
		});
	}
	function SearchFun(search){
		if(localStorage.getItem('contacts') == null){
			ContactArray = [];
		} else {
			ContactArray = JSON.parse(localStorage.getItem('contacts'));
			lastID(ContactArray);
		}
		recordContainer.innerHTML="";
		ContactArray.forEach(function(singleContact){
			if(search==""||
				(
				search==singleContact.id||
				(singleContact.email).indexOf(search) !== -1||
				(singleContact.name).indexOf(search) !== -1||
				(singleContact.number).indexOf(search) !== -1																
				)
			)
			{
			addToList(singleContact);
			}
			
		});
	}
	// Finding the last id
	function lastID(ContactArray){
		if(ContactArray.length > 0){
			id = ContactArray[ContactArray.length - 1].id;
		} else {
			id = 0;
		}
	}

	// Adding contact and checks
	// Phone number check
	function phoneNumCheck(inputtxt){
		let phoneNo = /^[0-9()+-\s]*$/;
		if(phoneNo.test(inputtxt)){
		  return true;
		}
		else{
		  return false;
		 }
	} 
	// email number check
	function EmailCheck(inputtxt){
		let Email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		if(Email.test(inputtxt)){
		  return true;
		}
		else{
		  return false;
		 }
	} 
	search_on.addEventListener('keyup', function(){
		SearchFun(this.value);
	});
	addBtn.addEventListener('click', function(res){
		if(addBtn.getAttribute('data-action')){
			UpdateTicket();
			return;
		}	
		var checkErrorMessage=checkInputFields([name, email, number]);
		console.log(checkErrorMessage);
		if(checkErrorMessage=='empty'){
			setMessage("error", "Empty input fields or invalid input!");
		}
		if(checkErrorMessage===1){
			setMessage("error", 'E-mail format is wrong!');
		}else if(checkErrorMessage==2){
			setMessage("error", 'Phone Number format is wrong!');
		}
		else
		if(checkErrorMessage==true){
			setMessage("success", "Record added successfully!");
			id++;
			const contact = new Contact(id, name.value, email.value, number.value);
			ContactArray.push(contact);
			// Storing contact record in local storage
			localStorage.setItem('contacts', JSON.stringify(ContactArray));
			clearInputFields();
			// Adding to list
			addToList(contact);
		}
    
	});
	function UpdateTicket(){
		var checkErrorMessage=checkInputFields([name, email, number]);
		console.log(checkErrorMessage);
		if(checkErrorMessage=='empty'){
			setMessage("error", "Empty input fields or invalid input!");
		}
		if(checkErrorMessage===1){
			setMessage("error", 'E-mail format is wrong!');
		}else if(checkErrorMessage==2){
			setMessage("error", 'Phone Number format is wrong!');
		}
		else
		if(checkErrorMessage==true){
			setMessage("success", "Record Updated successfully!");
			let tempContactList = ContactArray.filter(function(record){
				return (record.id != parseInt(updated_id.textContent));
			});
			ContactArray = tempContactList;
			const contact_upd = new Contact(updated_id.textContent, name.value, email.value, number.value);
			ContactArray.push(contact_upd);
			// Storing contact record in local storage
			localStorage.setItem('contacts', JSON.stringify(ContactArray));
			clearInputFields();
			// Adding to list
			AddContactDesign();
			document.location.reload(true)
		}
		
		var id =updated_id.textContent;

		let tempContactList = ContactArray.filter(function(record){
					if(record.id === parseInt(id)){
						return record;
					}			
		});
	}
	// Adding to List (on the DOM)
    function addToList(item){
        const newRecordDiv = document.createElement('div');
        newRecordDiv.classList.add('record-item');
        newRecordDiv.innerHTML = `
        <div class = "record-el">
            <span id = "labelling">Contact ID: </span>
            <span id = "contact-id-content">${item.id}</span>
        </div>
        <div class = "record-el">
            <span id = "labelling">Name: </span>
            <span id = "name-content">${item.name}</span>
        </div>
        <div class = "record-el">
            <span id = "labelling">E-mail: </span>
            <a href="mailto:${item.email}" id = "email-content">${item.email}</a>
        </div>
        <div class = "record-el">
            <span id = "labelling">Number: </span>
            <span id = "number-content">${item.number}</span>
        </div>
        <button type = "button" id = "edit-btn" onclick=EditItem(${item.id})>
            <span>
                <i class = "fas fa-pen"></i>
            </span> Edit
        </button>
        <button type = "button" id = "delete-btn">
            <span>
                <i class = "fas fa-trash"></i>
            </span> Delete
        </button>
        `;
        recordContainer.appendChild(newRecordDiv);
    }

	// Contact edit
	function EditItem(Itemid){
		console.log("Id : "+Itemid);
		console.log("Id : "+ContactArray);
		let tempContactList_update = ContactArray.filter(function(record_upd){
            console.log(record_upd);
			if(record_upd.id == parseInt(Itemid)){
				return record_upd;
			}
        });
		updated_id.textContent= tempContactList_update[0].id;
		name.value= tempContactList_update[0].name;
		email.value=tempContactList_update[0].email;
		number.value=tempContactList_update[0].number;
		UpdateDesign();
        //ContactArray = tempContactList;
	}
	// Contact deletion 
	recordContainer.addEventListener('click', function(event){
		if(event.target.id === 'delete-btn'){
			let removecontact = window.confirm('You sure you want to delete this contact?');
			if(removecontact == true)
			//console.log(event.target);
			if(event.target.id === 'delete-btn'){
				// removing from DOM
				let recordItem = event.target.parentElement;
				recordContainer.removeChild(recordItem);
				let tempContactList = ContactArray.filter(function(record){
					return (record.id !== parseInt(recordItem.firstElementChild.lastElementChild.textContent));
				});
				ContactArray = tempContactList;
				//removing from localstorage by overwriting
				localStorage.setItem('contacts', JSON.stringify(ContactArray));
			}		
		}
	});
	// resetting everything (id will get set to 0)
	resetBtn.addEventListener('click', function(){
		ContactArray = [];
		localStorage.setItem('contacts', JSON.stringify([]));
		location.reload();
	})

	// Displaying status/alerts
	function setMessage(status, message){
		let messageBox = document.querySelector('.message');
		if(status == "error"){
			messageBox.innerHTML = `${message}`;
			messageBox.classList.add('error');
			removeMessage(status, messageBox);
		}
		if(status == "success"){
			messageBox.innerHTML = `${message}`;
			messageBox.classList.add('success');
			removeMessage(status, messageBox);
		}
	}
	// Clearing all input fields
	cancelBtn.addEventListener('click', function(){
		clearInputFields();
	});

	function clearInputFields(){
		name.value = "";
		email.value = "";
		number.value = "";
		AddContactDesign();
	}
	// Removing status/alerts
	function removeMessage(status, messageBox){
		setTimeout(function(){
			messageBox.classList.remove(`${status}`);
		}, 2000);
	}
	// Input field validation
	function checkInputFields(inputArr){
		for(let i = 0; i < inputArr.length; i++){
			if(inputArr[i].value === ""){
				return 'empty';
			}
		}
		if(!EmailCheck(inputArr[1].value)){
			return 1;
		}
		if(!phoneNumCheck(inputArr[2].value)){
			return 2;
		}
			
		return true;
	}
	function AddContactDesign(){
		update_sec.style.display = "none";
		addBtn.innerHTML='<span><i class="fas fa-plus" aria-hidden="true"></i></span> Add Contact';
	}
	function UpdateDesign(){
		update_sec.style.display = "block";
		addBtn.setAttribute('data-action','update');
		addBtn.innerHTML='Update contact';
	}