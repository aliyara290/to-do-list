// import Swal from 'sweetalert2';

document.addEventListener("DOMContentLoaded", () => {
  const addTask = document.querySelector("#new__task"); // Add task Button
  const closeModal = document.querySelector("#close__modal-btn"); // add modal close Icon
  const closeEditModal = document.querySelector("#close__edit-modal"); // edit modal close icon
  const addTaskModal = document.querySelector("#add__task-model--eff"); // add modal
  const editTaskModal = document.querySelector("#edit__task-model--eff"); // edit modal
  const toggleEffect = document.querySelector(".toggle__effect"); // overlay effect

  const changeBgIcon = document.querySelector("#change__bg");
  const closeBgIcon = document.querySelector("#close__bg-icon");
  const changeBgContent = document.querySelector(".header__backgrounds");

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

  // change background Icon Toggle

  changeBgIcon.addEventListener("click", () => {
    changeBgContent.classList.add("active");
    toggleEffect.classList.add("active");
  });
  closeBgIcon.addEventListener("click", () => {
    changeBgContent.classList.remove("active");
    toggleEffect.classList.remove("active");
  });

  function changeBgFunc() {
    const mainBackground = document.querySelector(".background__pics");
    const bgImages = document.querySelectorAll(".pics__list-item img");

    // get the saved bg
    const savedBg = localStorage.getItem("backgroundImage");
    if (savedBg) {
      mainBackground.style.backgroundImage = `url('${savedBg}')`;
      mainBackground.style.backgroundSize = "cover";
      mainBackground.style.backgroundPosition = "top";
    }

    bgImages.forEach((img) => {
      img.addEventListener("click", () => {
        const bgUrl = img.getAttribute("src");
        mainBackground.style.backgroundImage = `url('${bgUrl}')`;
        mainBackground.style.backgroundSize = "cover";
        mainBackground.style.backgroundPosition = "top";

        // Save the selected background to local storage
        localStorage.setItem("backgroundImage", bgUrl);

        // close the menuu
        changeBgContent.classList.remove("active");
        toggleEffect.classList.remove("active");
      });
    });
  }
  changeBgFunc();

  let tasksList = [];
  let taskToEdit = null;

  function saveData() {
    localStorage.setItem("tasks", JSON.stringify(tasksList));
  }

  function getData() {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      tasksList = JSON.parse(storedTasks);
      renderTasks(); // Render tasks after loading from local storage
    }
  }

  getData();

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
    saveData();

    // clode the modal
    addTaskModal.classList.remove("active");
    toggleEffect.classList.remove("active");

    Swal.fire({
      title: "Task Added!",
      text: `You have added a new task succefully`,
      icon: "success",
      confirmButtonText: "Nice!",
    });
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

      saveData();
    }
  });

  function editTask(taskId) {
    taskToEdit = tasksList.find((task) => task.id === taskId);

    if (taskToEdit) {
      document.querySelector("#edit__title").value = taskToEdit.taskTitle;
      document.querySelector(
        "input[name='edit__priority'][value='" + taskToEdit.taskPeriority + "']"
      ).checked = true;
      document.querySelector("#edit__status").value = taskToEdit.taskStatus;
      document.querySelector("#edit__state").value = taskToEdit.taskState;
      document.querySelector("#edit__date").value = taskToEdit.taskDate;
      document.querySelector("#edit__description").value =
        taskToEdit.taskDecription;

      editTaskModal.classList.add("active");
      toggleEffect.classList.add("active");

      saveData();
    } else {
      console.log("No task found:", taskId);
    }
  }

  function deleteTask(taskId) {
    const taskIndex = tasksList.findIndex((task) => task.id === taskId);
    if (taskIndex !== -1) {
      tasksList.splice(taskIndex, 1);
      renderTasks();
      editTaskModal.classList.remove("active");
      toggleEffect.classList.remove("active");
      console.log(`Deleted task with ID: ${taskId}`);
      saveData();

      Swal.fire("Deleted!", "Your task has been deleted.", "success");
    } else {
      console.log("Task not found:", taskId);
    }
  }

  // Event listener for the delete button in the edit modal
  document.getElementById("delete__task-btn").addEventListener("click", () => {
    if (taskToEdit) {
      deleteTask(taskToEdit.id);
    }
  });

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
      taskItem.setAttribute("draggable", "true");
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
      // change the periority bg colors
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
  // drag and drop
  const allTasksBoxes = document.querySelectorAll(".row__col-cards");
  const allTasksCards = document.querySelectorAll(".col-cards-card");

  // Add drag start and end event listeners to each task card
  allTasksCards.forEach((task) => {
    task.addEventListener("dragstart", () => {
      task.classList.add("isDragging");
    });
    task.addEventListener("dragend", () => {
      task.classList.remove("isDragging");
    });
  });

  // Add dragover event listener to each box
  allTasksBoxes.forEach((box) => {
    box.addEventListener("dragover", (e) => {
      e.preventDefault();
      const draggingTask = document.querySelector(".isDragging");
      if (draggingTask) {
        box.appendChild(draggingTask);
  
        const taskId = draggingTask.getAttribute("card-id");
        const newState = box.id.replace("__cards-list", "");
        const task = tasksList.find((task) => task.id === taskId);
  
        if (task) {
          task.taskState = newState;
          saveData(); 
        }
      }
    });
  });
  
});
