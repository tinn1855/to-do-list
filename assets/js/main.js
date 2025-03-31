let inputBox = document.getElementById("input-box");
let tableTasks = document.getElementById("tableTasks");

const listTasks = [
  {
    id: 1,
    description: "Quét nhà",
    status: "incomplete",
  },
  {
    id: 2,
    description: "Rửa chén",
    status: "completed",
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
            <select class="${task.status}">
              <option value="incomplete" ${
                task.status === "incomplete" ? "selected" : ""
              } >Chưa hoàn thành</option>
              <option value="completed" ${
                task.status === "completed" ? "selected" : ""
              } >Hoàn thành</option>
            </select>
        </td>
        <td>
            <button class="btn-edit">Sửa</button>
            <button class="btn-delete">Xóa</button>
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
      "Công việc đã có trong danh sách. Bạn có chắc chắc muốn thêm không?"
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
