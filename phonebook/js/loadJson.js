var parseJson = function(response){
    return response.json();
}

// stores the contact data, include those loaded from json and those added by user
var contacts;

// load the page based on current variable contacts
var loadPage = function(contacts){
    console.log(contacts);
    contacts.sort(function(a, b){
        return (a.name.familyName.toUpperCase() > b.name.familyName.toUpperCase()) ? 1 : (a.name.familyName.toUpperCase() < b.name.familyName.toUpperCase())? -1 : 0;
    });
    document.getElementById("info").classList.add("invisible");
    for(var i = 0; i < contacts.length; i++){
        createContactDivs(contacts[i]);
    }
}
// fetch json data
fetch('../data/phonebook.json')
        .then(parseJson)
        .then(function(j){      
            contacts = j.entry;
            loadPage(contacts);
            // return contacts;
        });
        // }).then(loadPage);

// got called to add one contact into the page, based on its json object
var createContactDivs = function(contactJson){
    var contact = document.createElement("div");
    contact.className = "contact";
    var header = document.createElement("h1");
    header.appendChild(document.createTextNode(contactJson.name.familyName + " " + contactJson.name.givenName));
    contact.appendChild(header);
    // this is a function called to view this contact detail
    contact.onclick = function(){
        addNewContact();
        document.getElementById("first-name").value = contactJson.name.givenName;
        document.getElementById("last-name").value = contactJson.name.familyName;
        document.getElementById("phonenumber").value = contactJson.phone;
        document.getElementById("address").value = contactJson.address;
        document.getElementById("birthday").value = contactJson.birthday;
        document.getElementById("thumburl").value = contactJson.photos[0].value;
        var img = contactJson.photos[0].value;
        document.getElementById("photo").setAttribute('src', img);
        document.getElementById("thumb").classList.remove("invisible");
        document.getElementById("submit").classList.add("invisible");
        console.log(contactJson);
    };
    document.getElementsByTagName("section")[0].appendChild(contact);
}

// get the input form for user to add new contact
function addNewContact(){
    document.getElementById("info").classList.remove("invisible");
    document.getElementById("phonebook").classList.add("invisible");
    document.getElementById("submit").classList.remove("invisible");
    document.getElementById("thumb").classList.add("invisible");
    document.getElementById("myform").reset();
}
// create new contact based on information user put in
// add the data to contacts variable
function createNewContact(){
    var clearSec = document.getElementsByTagName("section")[0];
    while (clearSec.firstChild) {
        clearSec.removeChild(clearSec.firstChild);
    }
    var firstName = document.getElementById("first-name").value;
    var lastName = document.getElementById("last-name").value;
    var phone = document.getElementById("phonenumber").value;
    var address = document.getElementById("address").value;
    var birthday = document.getElementById("birthday").value;
    var thumbnail = '[{"value" : "' +  document.getElementById("thumburl").value + '", "type" : "thumbnail"}]';
    var name = '{"givenName" : "' + firstName + '", "familyName" : "' + lastName + '"}';
    var newContact = '{"displayName" : "' + firstName + '" , "id" : "1", "phone" : "' + phone + '", "address" : "' + address + '", "birthday" : "' + birthday + '",  "photos" : ' + thumbnail + ', "name" : ' + name + '}';
    contacts.push(JSON.parse(newContact));
    document.getElementById("phonebook").classList.remove("invisible");
    document.getElementById("info").classList.add("invisible");
    loadPage(contacts);
}
// go back to the sorted page
// reload the data
function goback(){
    var clearSec = document.getElementsByTagName("section")[0];
    while (clearSec.firstChild) {
        clearSec.removeChild(clearSec.firstChild);
    }
    document.getElementById("phonebook").classList.remove("invisible");
    document.getElementById("info").classList.add("invisible");
    loadPage(contacts);
}


