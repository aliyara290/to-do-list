const addTask = document.querySelector("#new__task");
const closeModal = document.querySelector("#close__modal-btn");
const addTaskModal = document.querySelector("#add__task-model--eff");
const toggleEffect = document.querySelector(".toggle__effect");

addTask.addEventListener("click", () => {
  addTaskModal.classList.add("active");
  toggleEffect.classList.add("active");
});
closeModal.addEventListener("click", () => {
  addTaskModal.classList.remove("active");
  toggleEffect.classList.remove("active");
});

let tasksList = [];

// Event listener for form submission
const form = document.querySelector("#modal__form");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  let taskTitle = document.querySelector("#add__title").value;
  let taskPeriority = document.querySelector(
    "input[name='add__priority']:checked"
  ).value;
  let taskStatus = document.querySelector("#add__status").value;
  let taskDate = document.querySelector("#add__date").value;
  let taskDecription = document.querySelector("#add__description").value;

  // Create a new task object
  const newTask = {
    taskTitle,
    taskStatus,
    taskPeriority,
    taskDate,
    taskDecription,
  };

  // Add the new task to the tasks array
  tasksList.push(newTask);
  this.reset();
  renderTasks();

  // close the modal
  addTaskModal.classList.remove("active");
  toggleEffect.classList.remove("active");

  // the todo cards length
  let todoLength = document.querySelector("#todo__length");
  todoLength.textContent = tasksList.length;
});

function renderTasks() {
  const taskList = document.querySelector(".row__col-cards");
  taskList.innerHTML = "";

  tasksList.forEach((task, index) => {
    const taskItem = document.createElement("div");
    console.log(task.title);
    taskItem.className = "col-cards-card";
    taskItem.innerHTML = `
                <div class="col__card-title">
                  <div class="col__card-priority"></div>
                  <h3>${task.taskTitle}</h3>
                </div>
                <div class="col__card-edit">
                  <i class="fa-solid fa-pen"></i>
                </div>
        `;
    taskList.appendChild(taskItem);
  });
}

console.log(tasksList);
