const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const filterButtons = document.querySelectorAll(".filter-container button");
const totalCounterH2 = document.getElementById("total-h2");
const CompleatedCounterH2 = document.getElementById("compleated-h2");
const To_doCounterH2 = document.getElementById("to-do-h2");


function addTask(){
    if(inputBox.value === ''){
        alert("You must write something!");
    }
    else{
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";

    UpdateCounter()
    saveData();
}

listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");

        UpdateCounter()
        saveData();
    }
    else if(e.target.tagName === "SPAN"){
        e.target.parentElement.remove();

        UpdateCounter()
        saveData();
    }
}, false);

function filterTasks(type, clickedButton){
    const tasks = document.querySelectorAll("#list-container li");

    tasks.forEach(function(task){
        if(type === "all"){
            task.style.display = "block";
        }
        else if(type === "checked"){
            if(task.classList.contains("checked")){
                task.style.display = "block";
            }
            else{
                task.style.display = "none";
            }
        }
        else if(type === "unchecked"){
            if(task.classList.contains("checked")){
                task.style.display = "none";
            }
            else{
                task.style.display = "block";
            }
        }
    });

    filterButtons.forEach(function(button){
        button.classList.remove("selected");
    });

    clickedButton.classList.add("selected");

    saveFilter(type);
}

function UpdateCounter(){
    const tasks = document.querySelectorAll("#list-container li");

    let total = tasks.length;
    let compleated = 0;

    tasks.forEach(function(task){
        if(task.classList.contains("checked")){
            compleated++;
        }
    });

    let to_do = total - compleated;

    totalCounterH2.textContent = "Total: " + total;
    CompleatedCounterH2.textContent = "Compleated: " + compleated;
    To_doCounterH2.textContent = "To-Do: " + to_do;
}

function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}

function saveFilter(type){
    localStorage.setItem("filter", type);
}

function showTask(){
    const savedTasks = localStorage.getItem("data");
    
    if(savedTasks !== null){
        listContainer.innerHTML = savedTasks;
    }
}

function showFilter(){
    const savedFilter = localStorage.getItem("filter") || "all";

    if(savedFilter === "all"){
        filterTasks("all", filterButtons[0]);
    }
    else if(savedFilter === "checked"){
        filterTasks("checked", filterButtons[1]);
    }
    else if(savedFilter === "unchecked"){
        filterTasks("unchecked", filterButtons[2]);
    }
}

showTask();
showFilter();
UpdateCounter();
