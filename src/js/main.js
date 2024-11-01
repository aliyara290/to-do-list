const addTask = document.querySelector("#new__task"); // btn
const closeModal = document.querySelector("#close__modal-btn"); // close modal icon
const addTaskModal = document.querySelector("#add__task-model--eff"); // modal 
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
  renderTasks();

  // Reset form fields
  form.reset();

  // Update the todo cards length
  let todoLength = document.querySelector("#todo__length");
  todoLength.textContent = tasksList.length;

  // Close the modal
  addTaskModal.classList.remove("active");
  toggleEffect.classList.remove("active");
});

function renderTasks() {
  const taskList = document.querySelector(".row__col-cards");
  taskList.innerHTML = "";

  tasksList.forEach((task, index) => {
    const taskItem = document.createElement("div");
    taskItem.className = "col-cards-card";
    taskItem.innerHTML = `
                <div class="colm__card--top">
                    <div class="col__card-title">
                        <h3>${task.taskTitle}</h3>
                    </div>
                    <div class="col__card-edit">
                        <i class="fa-solid fa-pen"></i>
                    </div>
                </div>
                <div class="colm__card--middle">
                    <div class="col__card-description">
                        <p>${task.taskDecription}</p>
                    </div>
                </div>
                <div class="colm__card-bottom">
                    <div class="card__bottom-left">
                        <div class="col__card-priority">
                            <span>${task.taskPeriority}</span>
                        </div>
                        <div class="col__card-status">
                            <span>${task.taskStatus}</span>
                        </div>
                    </div>
                    <div class="card__bottom-right">
                        <p>${task.taskDate}</p>
                    </div>
                    
                </div>
        `;

    // Set the priority color for each task card
    const periorityColor = taskItem.querySelector(".col__card-priority");
    switch (task.taskPeriority) {
      case "High":
        periorityColor.style.backgroundColor = "#1569f1";
        break;
      case "Medium":
        periorityColor.style.backgroundColor = "#1cab06";
        break;
      case "Low":
        periorityColor.style.backgroundColor = "#c8b105";
        break;
    }

    taskList.appendChild(taskItem);
  });
}

console.log(tasksList);
