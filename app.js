const tasks = [
  {
    _id: "5d2ca9e2e03d40b326596aa7",
    title: "The standard Lorem Ipsum passage, used since the 1500s",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    completed: true,
  },
  {
    _id: "5hkjas778a7bs8dy8ba8bsd8",
    title: "1914 translation by H. Rackham",
    text:
      "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness.",
    completed: true,
  },
  {
    _id: "klasb7b6a78bs8da6sgd8ays",
    title:
      "Section 1.10.32 of 'de Finibus Bonorum et Malorum', written by Cicero in 45 BC",
    text:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    completed: true,
  },
];

(function (arrOfTasks) {
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  // Elements UI
  const listContainer = document.querySelector(
    ".tasks-list-section .list-group"
  );
  const form = document.forms["addTask"];
  const inputTitle = form.elements["title"];
  const inputDescription = form.elements["description"];

  // Events
  renderAllTasks(objOfTasks);
  form.addEventListener("submit", onFormSubmitHandler);
  listContainer.addEventListener("click", onDeleteHandler);

  function renderAllTasks(tasksList) {
    if (!tasksList) {
      console.error("Нет ни одной задачи!");
      return;
    }

    const fragment = document.createDocumentFragment();
    Object.values(tasksList).forEach((task) => {
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    });
    listContainer.appendChild(fragment);
  }

  function listItemTemplate({ _id, title, text } = {}) {
    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "align-items-center",
      "flex-wrap"
    );
    li.setAttribute("data-task-id", _id);

    const span = document.createElement("span");
    span.textContent = title;
    span.style.fontWeight = "bold";

    const deleteBtn = document.createElement("button");
    deleteBtn.insertAdjacentHTML(
      "afterbegin",
      '<i class="bi bi-trash"></i> Удалить'
    );
    deleteBtn.classList.add("btn", "btn-danger", "ms-auto", "delete-btn");

    const description = document.createElement("p");
    description.textContent = text;
    description.classList.add("mt-2", "w-100");

    li.appendChild(span);
    li.appendChild(description);
    li.appendChild(deleteBtn);
    return li;
  }

  function onFormSubmitHandler(e) {
    e.preventDefault();
    const titleValue = inputTitle.value;
    const descriptionValue = inputDescription.value;

    if (!titleValue || !descriptionValue) {
      alert("Пожалуйста введите название и описание задачи.");
      return;
    }

    const task = createNewTask(titleValue, descriptionValue);
    const listItem = listItemTemplate(task);
    listContainer.insertAdjacentElement("afterbegin", listItem);
    form.reset();
  }

  function createNewTask(title, text) {
    const newTask = {
      title,
      text,
      completed: false,
      _id: `task-${Math.random()}`,
    };

    objOfTasks[newTask._id] = newTask;
    return { ...newTask };
  }

  function deleteTask(id) {
    const { title } = objOfTasks[id];
    const isConfirmm = confirm(
      `Вы действительно хотите удалить задачу: ${title}?`
    );
    if (!isConfirmm) return isConfirmm;
    delete objOfTasks[id];
    return isConfirmm;
  }

  function deleteTaskFromHtml(confirmed, el) {
    if (!confirmed) return;
    el.remove();
  }

  function onDeleteHandler({ target }) {
    if (target.classList.contains("delete-btn")) {
      const parent = target.closest("[data-task-id]");
      const id = parent.dataset.taskId;
      const confirmed = deleteTask(id);
      deleteTaskFromHtml(confirmed, parent);
    }
  }
})(tasks);
