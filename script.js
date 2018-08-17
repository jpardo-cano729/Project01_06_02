 /*
       Project 01_06_02

       Author:Jonathan Pardo-Cano
       Date:08.16.18  

       Filename: script.js
    */
 "use strict";

 var formValidity = true;

// run intial form configuration functions
function setUpPage(){
    createEventListeners();
    generatePlaceholder();
}

//validate the ssn
function advanceSsn(){
    var ssnFields = document.getElementsByClassName("ssn");
    var currentField = document.activeElement;
    if(currentField.value.length === currentField.maxLength){
        if(currentField === ssnFields[0]){
            ssnFields[1].focus();
        }
        if(currentField === ssnFields[1]){
            ssnFields[2].focus();
        }
        if(currentField === ssnFields[2]){
            document.getElementById("submitBtn").focus()
        }
    }
} 

//add placeholder text for browser that don't support placeholder attribute
function generatePlaceholder(){
    if(!Modernizr.input.placeholder){
        var addressBox = document.getElementById("addrinput");
        addressBox.value = addressBox.placeholder;
        addressBox.style.color = "rgb(178,184,183)";
        if(addressBox.addEventListener){
            addressBox.addEventListener("focus", zeroPlaceholder, false);
            addressBox.addEventListener("blur", checkPlaceholder, false);
        }
        else if(addressBox.attachEvent){
            addressBox.attachEvent("onfocus", zeroPlaceholder);
            addressBox.attach("onblur", checkPlaceholder);
        }
    }
} 

// validates all of the input fields
function validateRequired(){
    var inputElements = document.querySelectorAll("#contactinfo input");
    var errorDiv = document.getElementById("errorText");
    var currentElement = null;
    var fieldsetValidity = true;
    try{
        for(var i = 0; i < inputElements.length; i++){
            currentElement = inputElements[i];
            if(currentElement.value === ""){
                currentElement.style.background = "rgb(255,233,233)";
                fieldsetValidity = false;
            }
            else{
                currentElement.style.background = "white"
            }  
        }
        if(fieldsetValidity === false){
            throw "Please complete the entire form";
        }
        else{
            formValidity = true;
            errorDiv.style.display = "none"
        }
    }
    catch(msg){
        errorDiv.style.display = "block"
        errorDiv.innerHTML = msg;
        formValidity = false
     }
    
}

 // The function to validate the form
 function validateForm(evt){
     if (evt.preventDefault){
         evt.preventDefault();
     } else {
         evt.returnValue = false;
     }
     validateRequired();
     
     if(formValidity === true){
         document.getElementsByTagName("form")[0].submit();
     }
 }


 //Create the event listeners for the othere function 
 function createEventListeners(){
     var ssnFields = document.getElementsByClassName("ssn");
     for(var i = 0; i <ssnFields.length; i++){
         if(ssnFields[i].addEventListener){
             ssnFields[i].addEventListener("input", advanceSsn, false);
         }
         else if(ssnFields[i].attachEvent){
             ssnFields[i].attachEvent("oninput", advanceSsn);
         }
     }
     var form = document.getElementsByTagName("form")[0];
     if (form.addEventListener) {
         form.addEventListener("submit", validateForm, false);
     } 
     else if (form.attachEvent) {
         form.attachEvent("onsubmit", validateForm);
     }
 }

 if (window.addEventListener) {
     window.addEventListener("load", setUpPage, false)
 } else if (window.attachEvent) {
     window.attachEvent("load", setUpPage)
 }
