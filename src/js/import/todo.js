'use strict';

const todoForm = document.getElementById("js-todo-form"),
    todoInput = todoForm.querySelector("input"),
    todoList = document.querySelector(".js-todo-list"),
    user = document.querySelector(".js-user-greeting");

const LS_TODO = 'todo';
let todoSet = [];

export function loadTodos() {
    const loadTodos = localStorage.getItem(LS_TODO);

    if (loadTodos !== null) {
        const parseTodos = JSON.parse(loadTodos);
        parseTodos.forEach(function (todo) {
            paintTodo(todo)
        });
    }

    todoForm.addEventListener("submit", handleSubmit);
}

function saveTodos() {
    localStorage.setItem(LS_TODO, JSON.stringify(todoSet));
}


function handleSubmit(event) {
    event.preventDefault();

    const date = new Date(),
        todoObj = {
            id: date.getTime(),
            value: todoInput.value,
            finish: false,
        }
    paintTodo(todoObj);
    todoInput.value = "";
}

function handleRemove(event) {
    event.preventDefault();
    const btn = event.target,
        li = btn.parentNode;

    todoList.removeChild(li);

    const cleanTodos = todoSet.filter(function (todo) {
        return todo.id !== parseInt(li.dataset.id);
    });

    console.log(li.dataset.id)
    todoSet = cleanTodos;
    saveTodos();
}

function handleFinish(event) {
    event.preventDefault();

    const btn = event.target,
        li = btn.parentNode,
        btnAttr = btn.getAttribute("aria-pressed");


    todoSet.filter(function (todo) {
        if (todo.id === parseInt(li.dataset.id) && btnAttr === "false") {
            todo.finish = true;
            btn.setAttribute("aria-pressed", "true");
            li.classList.add("type_finish");
        }
        else if (todo.id === parseInt(li.dataset.id) && btnAttr === "true"){
            todo.finish = false;
            btn.setAttribute("aria-pressed", "false");
            li.classList.remove("type_finish");
        }
    })

    saveTodos();
}

function paintTodo(todo) {
    const todoItem = document.createElement("li"),
        text = document.createElement("span"),
        btnRemove = document.createElement("button"),
        btnFinish = document.createElement("button");

    text.classList.add("st_todo", "js-todo-text");
    text.innerText = `${todo.value}`;

    btnRemove.classList.add("st_btn_remove", "js-todo-finish");
    btnRemove.setAttribute("type", "button");
    btnRemove.innerText = "❌";
    btnRemove.addEventListener("click", handleRemove);

    btnFinish.classList.add("st_btn_finish", "js-todo-finish");
    btnFinish.setAttribute("type", "button");
    btnFinish.setAttribute("aria-pressed", "false");
    btnFinish.innerText = "✔️";
    btnFinish.addEventListener("click", handleFinish);

    todoItem.classList.add("st_todo_item");
    todoItem.dataset.id = todo.id;
    todoItem.appendChild(text);
    todoItem.appendChild(btnFinish);
    todoItem.appendChild(btnRemove);

    todoList.append(todoItem);

    todoSet.push(todo);
    saveTodos();
}
