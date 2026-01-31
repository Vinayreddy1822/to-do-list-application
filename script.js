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


const goals = [];

const printTasks = (goals) => {
    renderTask.innerHTML = "";

    let filteredTask = [];

    if (filter === "all") {
        filteredTask = goals;
    }else if (filter == "open"){
        filteredTask = goals.filter(task => task.open === true);
    }else {
        filteredTask = goals.filter(task => task.open === false);
    }

    filteredTask = filteredTask(task => task.text.toLowerCase().includes(searchInput.value.toLowerCase))

    goals.map(task => {
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
        task.open ? btn.classList.add("status-btn-open") : btn.classList.add("status-btn-closed")

        //creating button even listener
        btn.addEventListener('click', () => {
            task.open = !task.open;
            printTasks(goals);
        })

        //Append items to task wrapper
        taskWrapper.append(text);
        taskWrapper.append(btn);

        renderTask.append(taskWrapper)
    })
}
printTasks(goals);

allBtn.addEventListener('click', () => {
    filter = "all";
});

openBtn.addEventListener('click', () => {
    filter = "open";
    printTasks(openTasks);
});

closedBtn.addEventListener('click', () => {
    filter = "closed"
    printTasks(closedTasks);
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
        taskText.value = "";
        printTasks(goals);
    }
})