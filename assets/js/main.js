let inputBox = document.getElementById("input-box");
let listTasks = document.getElementById("listTasks");

function addTask() {
  if (inputBox.value === "") {
    alert("Vui lòng nhập công việc");
  } else {
    let tr = document.createElement("tr");
    tr.innerHTML = `
        <td>
            <input type="checkbox" name="" id="" />
        </td>
        <td>${inputBox.value}</td>
        <td>
            <select name="" id="">
            <option class="completed" value="">Hoàn thành</option>
            <option class="incomplete" selected value="">
                Chưa hoàn thành
            </option>
            </select>
        </td>
        <td>
            <button class="btn-edit">Sửa</button>
            <button class="btn-delete">Xóa</button>
        </td>
    `;
    document.getElementById("listTasks").appendChild(tr);
    inputBox.value = "";
  }
}
