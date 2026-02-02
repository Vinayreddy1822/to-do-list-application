const modal = document.getElementById("model");
const openModalBtn = document.getElementById("open-task");
const innerModal = document.getElementById("inner-modal");
const addTaskBtn = document.getElementById("btn-task");
const taskText = document.getElementById("task");
const renderTask = document.getElementById("render-task");
const allBtn = document.getElementById("all");
const openBtn = document.getElementById("open");
const closedBtn = document.getElementById("closed");
const searchInput = document.getElementById("search")
let filter = "all"; //all / open / closed


const goals = JSON.parse(localStorage.getItem("goals")) || [];

const saveTasks = () => {
    localStorage.setItem("goals", JSON.stringify(goals));
}

searchInput.addEventListener("input", () => {
    printTasks();
});

const printTasks = () => {
    renderTask.innerHTML = "";

    let filteredTask = [];

    if (filter === "all") {
        filteredTask = goals;
    }else if (filter == "open"){
        filteredTask = goals.filter(task => task.open === true);
    }else {
        filteredTask = goals.filter(task => task.open === false);
    }

    filteredTask = filteredTask.filter(task => task.text.toLowerCase().includes(searchInput.value.toLowerCase()))

    filteredTask.map(task => {
        // Creating a Wrapper div
        const taskWrapper =document.createElement("div");
        taskWrapper.classList.add("task-container");

        //creating task text
        const text = document.createElement("p");
        text.innerText = task.text;
        text.classList.add("task-text");

        //creating status button
        const btn = document.createElement("button");
        btn.innerText = task.open ? "Open" : "Finished🎉";
        task.open ? btn.classList.add("status-btn-open") : btn.classList.add("status-btn-closed");

        //creating button even listener
        btn.addEventListener('click', () => {
            task.open = !task.open;
            printTasks(goals);
        })

        //creating delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete❌";
        deleteBtn.classList.add("delete-btn");

        //delete button event listener
        deleteBtn.addEventListener('click', () => {
            const index = goals.indexOf(task);
            goals.splice(index, 1);
            localStorage.setItem("goals", JSON.stringify(goals));
            printTasks(goals);
        })

        //Append items to task wrapper
        taskWrapper.append(text);
        taskWrapper.append(btn);
        taskWrapper.append(deleteBtn);
        renderTask.append(taskWrapper);

        //saving to local storage
        localStorage.setItem("goals", JSON.stringify(goals));
    })
}
printTasks(goals);

allBtn.addEventListener('click', () => {
    filter = "all";
    allBtn.classList.add("active");
    openBtn.classList.remove("active");
    closedBtn.classList.remove("active");
    printTasks();
});

openBtn.addEventListener('click', () => {
    filter = "open";
    allBtn.classList.remove("active");
    openBtn.classList.add("active");
    closedBtn.classList.remove("active");
    printTasks();
});

closedBtn.addEventListener('click', () => {
    filter = "closed"
    allBtn.classList.remove("active");
    openBtn.classList.remove("active");
    closedBtn.classList.add("active");
    printTasks();
})

openModalBtn.addEventListener("click", () => {
    modal.classList.add("active");
});

modal.addEventListener("click", (e) => {
    if (!innerModal.contains(e.target)) { 
        modal.classList.remove("active");
    }
});

addTaskBtn.addEventListener("click", () => {
    if(taskText.value) {
        const task = { text: taskText.value, open: true };
        goals.push(task);
        saveTasks();
        taskText.value = "";
        printTasks(goals);
    }
})