let inputBox = document.getElementById("input-box");
let tableTasks = document.getElementById("tableTasks");

const listTasks = [
  {
    id: 1,
    description: "Quét nhà",
    status: "incomplete",
    priority: "low-priority",
  },
  {
    id: 2,
    description: "Rửa chén",
    status: "completed",
    priority: "high-priority",
  },
];

function renderTasks() {
  tableTasks.innerHTML = "";
  listTasks.map((task) => {
    let row = document.createElement("tr");
    row.innerHTML = `
       <td>
            <input type="checkbox" name="" id="" />
        </td>
        <td>${task.description}</td>
        <td>
            <select 
              class="${task.status}" 
              onchange="changeStatus(${task.id}, this.value)"
            >
              <option value="incomplete" ${
                task.status === "incomplete" ? "selected" : ""
              } >Chưa hoàn thành</option>
              <option value="completed" ${
                task.status === "completed" ? "selected" : ""
              } >Hoàn thành</option>
            </select>
        </td>
        <td>
            <select 
              class="${task.priority}" 
              onchange="changePriority(${task.id}, this.value)"
            >
              <option 
                value="high-priority" 
                ${task.priority === "high-priority" ? "selected" : ""}
              > 
                Cao 
              </option>
              <option 
                value="medium-priority"
                ${task.priority === "medium-priority" ? "selected" : ""}
              >
                Vừa
              </option>
              <option 
                value="low-priority"
                ${task.priority === "low-priority" ? "selected" : ""}
              >
                Thấp
              </option>
            </select>
        </td>
        <td>
            <button class="btn-edit" onclick="editTask(${task.id})">Sửa</button>
            <button class="btn-delete" onclick="deleteTask(${
              task.id
            })">Xóa</button>
        </td>
    `;
    tableTasks.appendChild(row);
    inputBox.value = "";
  });
}
renderTasks();

function addTask() {
  let tasks = inputBox.value.trim();
  if (tasks === "") {
    alert("Vui lòng nhập công việc!");
    return;
  }

  let checkTask = listTasks.some(
    (task) => task.description.toLowerCase() === tasks.toLowerCase()
  );
  if (checkTask) {
    let comfirmTask = confirm(
      "Công việc đã có trong danh sách. Bạn có chắc chắn muốn thêm không?"
    );
    if (!comfirmTask) {
      return;
    }
  }

  let newTask = {
    // Tạo id tự động cho mỗi công việc khi thêm vào listTasks
    id: listTasks.length ? listTasks[listTasks.length - 1].id + 1 : 1,
    description: tasks,
    status: "incomplete",
    priority: "low-priority",
  };

  listTasks.push(newTask);
  inputBox.value = "";
  renderTasks();
}

inputBox.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

function deleteTask(id) {
  let indexTask = listTasks.findIndex((task) => task.id === id);
  if (indexTask !== -1) {
    let comfirmDeleteTask = confirm("Bạn có chắc muốn xóa công việc này?");
    if (comfirmDeleteTask) {
      listTasks.splice(indexTask, 1);
      renderTasks();
    }
  }
}

function editTask(id) {
  let taskDescription = listTasks.find((task) => task.id === id);
  console.log(taskDescription);

  if (taskDescription) {
    let newDescription = prompt(
      "Nhập mô tả công việc mới:",
      taskDescription.description
    );
    if (newDescription === "") {
      alert("Công việc không thể để trống!");
      return;
    }

    let duplicateTask = listTasks.some(
      (task) =>
        task.id !== id &&
        task.description.toLowerCase() === newDescription.toLowerCase()
    );
    if (duplicateTask) {
      let confirmDuplicateTask = confirm(
        "Công việc này đã tồn tại trong danh sách!"
      );
      if (!confirmDuplicateTask) {
        return;
      }
    }

    taskDescription.description = newDescription;
    renderTasks();
  }
}

function changeStatus(id, newStatus) {
  let task = listTasks.find((task) => task.id === id);
  console.log(task);
  if (task) {
    task.status = newStatus;
    renderTasks();
  }
}

function changePriority(id, newPriority) {
  let task = listTasks.find((task) => task.id === id);
  if (task) {
    task.priority = newPriority;
    renderTasks();
  }
}
