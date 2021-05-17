// Список задач
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

// Перечень доступных тем
const themes = {
  default: {
    "--base-text-color": "#212529",
    "--header-bg": "#007bff",
    "--header-text-color": "#fff",
    "--default-btn-bg": "#007bff",
    "--default-btn-text-color": "#fff",
    "--default-btn-hover-bg": "#0069d9",
    "--default-btn-border-color": "#0069d9",
    "--danger-btn-bg": "#dc3545",
    "--danger-btn-text-color": "#fff",
    "--danger-btn-hover-bg": "#bd2130",
    "--danger-btn-border-color": "#dc3545",
    "--input-border-color": "#ced4da",
    "--input-bg-color": "#fff",
    "--input-text-color": "#495057",
    "--input-focus-bg-color": "#fff",
    "--input-focus-text-color": "#495057",
    "--input-focus-border-color": "#80bdff",
    "--input-focus-box-shadow": "0 0 0 0.2rem rgba(0, 123, 255, 0.25)",
  },
  dark: {
    "--base-text-color": "#212529",
    "--header-bg": "#343a40",
    "--header-text-color": "#fff",
    "--default-btn-bg": "#58616b",
    "--default-btn-text-color": "#fff",
    "--default-btn-hover-bg": "#292d31",
    "--default-btn-border-color": "#343a40",
    "--default-btn-focus-box-shadow": "0 0 0 0.2rem rgba(141, 143, 146, 0.25)",
    "--danger-btn-bg": "#b52d3a",
    "--danger-btn-text-color": "#fff",
    "--danger-btn-hover-bg": "#88222c",
    "--danger-btn-border-color": "#88222c",
    "--input-border-color": "#ced4da",
    "--input-bg-color": "#fff",
    "--input-text-color": "#495057",
    "--input-focus-bg-color": "#fff",
    "--input-focus-text-color": "#495057",
    "--input-focus-border-color": "#78818a",
    "--input-focus-box-shadow": "0 0 0 0.2rem rgba(141, 143, 146, 0.25)",
  },
  light: {
    "--base-text-color": "#212529",
    "--header-bg": "#fff",
    "--header-text-color": "#212529",
    "--default-btn-bg": "#fff",
    "--default-btn-text-color": "#212529",
    "--default-btn-hover-bg": "#e8e7e7",
    "--default-btn-border-color": "#343a40",
    "--default-btn-focus-box-shadow": "0 0 0 0.2rem rgba(141, 143, 146, 0.25)",
    "--danger-btn-bg": "#f1b5bb",
    "--danger-btn-text-color": "#212529",
    "--danger-btn-hover-bg": "#ef808a",
    "--danger-btn-border-color": "#e2818a",
    "--input-border-color": "#ced4da",
    "--input-bg-color": "#fff",
    "--input-text-color": "#495057",
    "--input-focus-bg-color": "#fff",
    "--input-focus-text-color": "#495057",
    "--input-focus-border-color": "#78818a",
    "--input-focus-box-shadow": "0 0 0 0.2rem rgba(141, 143, 146, 0.25)",
  },
};

(function (arrOfTasks) {
  const objOfTasks = arrOfTasks.reduce((acc, task) => {
    acc[task._id] = task;
    return acc;
  }, {});

  // UI элементы
  const listContainer = document.querySelector(
    ".tasks-list-section .list-group"
  );
  const form = document.forms["addTask"];
  const inputTitle = form.elements["title"];
  const inputDescription = form.elements["description"];
  const themeSelect = document.getElementById("themeSelect");
  let lastSelectedTheme = localStorage.getItem("app_theme") || "default";

  // События
  setTheme(lastSelectedTheme);
  renderAllTasks(objOfTasks);
  form.addEventListener("submit", onFormSubmitHandler);
  listContainer.addEventListener("click", onDeleteHandler);
  themeSelect.addEventListener("change", onThemeSelectHandler);

  // Проверка на передачу списка задач
  function renderAllTasks(tasksList) {
    if (!tasksList) {
      console.error("Нет ни одной задачи!");
      return;
    }

    // Добавление задач на страницу
    const fragment = document.createDocumentFragment();
    Object.values(tasksList).forEach((task) => {
      const li = listItemTemplate(task);
      fragment.appendChild(li);
    });
    listContainer.appendChild(fragment);
  }

  // Функция, которая собирает элементы, для добавление в fragment всех задач
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

  // Функция обратотки события приема данных с формы
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

  // Создание новой задачи
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

  // Удаление задачи
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

  function onThemeSelectHandler(e) {
    const selectedTheme = themeSelect.value;
    const isConfirmed = confirm(
      `Вы действительно хотите изменить тему: ${selectedTheme}`
    );
    if (!isConfirmed) {
      themeSelect.value = lastSelectedTheme;
      return;
    }
    setTheme(selectedTheme);
    lastSelectedTheme = selectedTheme;
    localStorage.setItem("app_theme", selectedTheme);
  }

  // Установка темы
  function setTheme(name) {
    const selectedThemeObj = themes[name];
    Object.entries(selectedThemeObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }
})(tasks);
