document.addEventListener("DOMContentLoaded", () => {
  const addTask = document.querySelector("#new__task");
  const closeModal = document.querySelector("#close__modal-btn");
  const closeEditModal = document.querySelector("#close__edit-modal");
  const addTaskModal = document.querySelector("#add__task-model--eff");
  const editTaskModal = document.querySelector("#edit__task-model--eff");
  const toggleEffect = document.querySelector(".toggle__effect");

  addTask.addEventListener("click", () => {
    addTaskModal.classList.add("active");
    toggleEffect.classList.add("active");
  });

  closeModal.addEventListener("click", () => {
    addTaskModal.classList.remove("active");
    toggleEffect.classList.remove("active");
  });

  closeEditModal.addEventListener("click", () => {
    editTaskModal.classList.remove("active");
    toggleEffect.classList.remove("active");
  });

  let tasksList = [];
  let taskToEdit = null;

  const form = document.querySelector("#modal__form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const taskTitle = document.querySelector("#add__title").value.trim();
    const taskPeriority = document.querySelector(
      "input[name='add__priority']:checked"
    ).value;
    const taskStatus = document.querySelector("#add__status").value;
    const taskState = document.querySelector("#add__state").value;
    const taskDate = document.querySelector("#add__date").value;
    const taskDecription = document
      .querySelector("#add__description")
      .value.trim();

    const newTask = {
      id: Date.now().toString(),
      taskTitle,
      taskStatus,
      taskState,
      taskPeriority,
      taskDate,
      taskDecription,
    };
    tasksList.push(newTask);
    renderTasks();
    form.reset();

    addTaskModal.classList.remove("active");
    toggleEffect.classList.remove("active");
  });

  const editForm = document.querySelector("#edit__modal-form");
  editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    if (taskToEdit) {
      taskToEdit.taskTitle = document
        .querySelector("#edit__title")
        .value.trim();
      taskToEdit.taskPeriority = document.querySelector(
        "input[name='edit__priority']:checked"
      ).value;
      taskToEdit.taskStatus = document.querySelector("#edit__status").value;
      taskToEdit.taskState = document.querySelector("#edit__state").value;
      taskToEdit.taskDate = document.querySelector("#edit__date").value;
      taskToEdit.taskDecription = document
        .querySelector("#edit__description")
        .value.trim();

      renderTasks();

      editTaskModal.classList.remove("active");
      toggleEffect.classList.remove("active");
    }
  });

  function editTask(taskId) {
    taskToEdit = tasksList.find((task) => task.id === taskId);

    if (taskToEdit) {
      console.log("Editing task:", taskToEdit);

      document.querySelector("#edit__title").value = taskToEdit.taskTitle;
      document.querySelector(
        "input[name='edit__priority'][value='" + taskToEdit.taskPeriority + "']"
      ).checked = true; // Update to check the correct radio button
      document.querySelector("#edit__status").value = taskToEdit.taskStatus;
      document.querySelector("#edit__state").value = taskToEdit.taskState;
      document.querySelector("#edit__date").value = taskToEdit.taskDate;
      document.querySelector("#edit__description").value =
        taskToEdit.taskDecription;

      editTaskModal.classList.add("active");
      toggleEffect.classList.add("active");
    } else {
      console.log("No task found:", taskId);
    }
  }

  function renderTasks() {
    const todoTasksList = document.getElementById("todo__cards-list");
    const goingTasksList = document.getElementById("going__cards-list");
    const doneTasksList = document.getElementById("done__cards-list");

    todoTasksList.innerHTML = "";
    goingTasksList.innerHTML = "";
    doneTasksList.innerHTML = "";

    tasksList.forEach((task) => {
      const taskItem = document.createElement("div");
      taskItem.className = "col-cards-card";
      taskItem.setAttribute("card-id", task.id);
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

      switch (task.taskState) {
        case "todo":
          todoTasksList.appendChild(taskItem);
          break;
        case "going":
          goingTasksList.appendChild(taskItem);
          break;
        case "done":
          doneTasksList.appendChild(taskItem);
          break;
      }

      const periorityColor = taskItem.querySelector(".col__card-priority");
      switch (task.taskPeriority) {
        case "High":
          periorityColor.style.backgroundColor = "#1569f1";
          periorityColor.style.color = "#fff";
          break;
        case "Medium":
          periorityColor.style.backgroundColor = "#1cab06";
          periorityColor.style.color = "#fff";
          break;
        case "Low":
          periorityColor.style.backgroundColor = "#c8b105";
          periorityColor.style.color = "#000";
          break;
      }

      taskItem.addEventListener("click", () => editTask(task.id));
    });
  }

  const today = new Date().toISOString().split("T")[0];
  let dateInput = document.querySelectorAll("input[type='date']");
  dateInput.forEach((input) => {
    input.value = today;
  });
});
