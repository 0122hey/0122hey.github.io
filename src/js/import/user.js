'use strict';

const userForm = document.getElementById("js-user-form"),
    userInput = userForm.querySelector("input"),
    userInsert = document.querySelector(".js-user-insert"),
    userGreeting = document.querySelector(".js-user-greeting"),
    userName = userGreeting.querySelector(".js-user-name");

const LS_USER = "userName";

function saveName(text) {
    localStorage.setItem(LS_USER, text);
}

function handleSubmit(event) {
    event.preventDefault();

    const name = userInput.value;

    paintGreeting(name);
    saveName(name);
  
    userInput.value = "";
}

function askForName() {
    userInsert.style.display = "block";
    userGreeting.style.display = "none";

    userForm.addEventListener("submit", handleSubmit);
}

function paintGreeting(name) {
    userInsert.style.display = "none";
    userGreeting.style.display = "block";
    userName.innerText = name;
}

export function loadUser() {
    const userName = localStorage.getItem(LS_USER);
    userName === null ? askForName() : paintGreeting(userName);

    return userName;
}