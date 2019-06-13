let today = new Date(),
  temp = new Date(),
  currentMonth = today.getMonth(),
  currentYear = today.getFullYear(),
  monthAndYear = document.getElementById("monthAndYear"),
  deleteAll = document.getElementById("deleteAll"),
  tempKeyId,
  textData = [],
  monthText = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ],
  weekText = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ],
  todayKeyValue =
    today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector(".add-event-day"),
  toDoList = document.querySelector(".js-toDoList");

window.prevCalendar = prevCalendar;
window.nextCalendar = nextCalendar;

function prevCalendar() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  if (currentMonth === temp.getMonth() && currentYear === temp.getFullYear()) {
    today = new Date(today.getFullYear(), today.getMonth() - 1, temp.getDate());
    showCalendar(currentYear, currentMonth);
    loadToDos(
      temp.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear()
    );
  } else {
    today = new Date(today.getFullYear(), today.getMonth() - 1);
    todayKeyValue =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();
    showCalendar(currentYear, currentMonth);
    loadToDos(
      today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear()
    );
  }
}

function nextCalendar() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  if (currentMonth === temp.getMonth() && currentYear === temp.getFullYear()) {
    today = new Date(today.getFullYear(), today.getMonth() + 1, temp.getDate());
    showCalendar(currentYear, currentMonth);
    loadToDos(
      temp.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear()
    );
  } else {
    today = new Date(today.getFullYear(), today.getMonth() + 1);
    todayKeyValue =
      today.getDate() +
      "/" +
      (today.getMonth() + 1) +
      "/" +
      today.getFullYear();
    showCalendar(currentYear, currentMonth);
    loadToDos(
      today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear()
    );
  }
}
function showCalendar(year, month) {
  toDoForm.addEventListener("submit", handleSubmit);
  deleteAll.addEventListener("click", delAll);
  let firstDay = new Date(year, month).getDay();
  let daysInMonth = 32 - new Date(year, month, 32).getDate();
  let tableBodyLi = document.getElementById("calendar-body");
  tableBodyLi.innerHTML = "";
  monthAndYear.innerHTML = monthText[month] + " " + year;
  let pointDate = document.getElementById("pointDate");
  let pointDay = document.getElementById("pointDay");
  pointDate.innerHTML = today.getDate();
  pointDay.innerHTML =
    weekText[
      new Date(today.getFullYear(), today.getMonth(), today.getDate()).getDay()
    ];
  let date = 1;
  for (let i = 0; i < 6; i++) {
    let row = document.createElement("tr");
    for (let j = 0; j < 7; j++) {
      if (i === 0 && j < firstDay) {
        let cell = document.createElement("td");
        let cellText = document.createTextNode("");
        cell.appendChild(cellText);
        row.appendChild(cell);
      } else if (date > daysInMonth) {
        break;
      } else {
        let cell = document.createElement("td");
        cell.dataset.id =
          date + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
        let cellText = document.createTextNode(date);
        cell.style.cursor = "pointer";
        cell.addEventListener("click", function() {
          point(cell);
        });
        if (
          date === today.getDate() &&
          year === today.getFullYear() &&
          month === today.getMonth()
        ) {
          cell.classList.add("bg-info");
        }
        cell.appendChild(cellText);
        row.appendChild(cell);
        date++;
      }
    }
    tableBodyLi.appendChild(row);
  }
}

function point(cell) {
  let Point = event.target.firstChild.nodeValue;
  pointDate.innerHTML = Point;
  pointDay.innerHTML =
    weekText[new Date(today.getFullYear(), today.getMonth(), Point).getDay()];
  if (document.querySelector(".pointDay") === null) {
    event.target.classList.add("pointDay");
  } else {
    document.querySelector(".pointDay").classList.remove("pointDay");
  }
  event.target.classList.add("pointDay");
  todayKeyValue = cell.dataset.id;
  loadToDos(cell.dataset.id);
  write(cell.dataset.id);
}

if (JSON.parse(localStorage.getItem(todayKeyValue)) === null) {
  textData = [];
} else {
  textData = JSON.parse(localStorage.getItem(todayKeyValue));
}

function write(cell, currentValue) {
  if (currentValue === undefined || currentValue === "") return;
  const keyId = cell;
  if (tempKeyId === undefined) {
    tempKeyId = keyId;
  }
  if (tempKeyId !== keyId) {
    if (JSON.parse(localStorage.getItem(keyId)) === null) {
      textData = [];
    } else {
      textData = JSON.parse(localStorage.getItem(keyId));
    }
  }
  const textObj = { id: textData.length + 1, text: currentValue };
  textData.push(textObj);
  localStorage.setItem(keyId, JSON.stringify(textData));
  tempKeyId = keyId;
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  write(todayKeyValue, currentValue);
  toDoInput.value = "";
}

function loadToDos(cell) {
  const loadId = cell;
  const loadedToDos = JSON.parse(localStorage.getItem(loadId));
  let lis = document.querySelectorAll("li");
  for (let i = 0; (li = lis[i]); i++) {
    li.parentNode.removeChild(li);
  }
  if (loadedToDos) {
    loadedToDos.forEach(function(o) {
      paintToDo(o.text);
    });
  }
}

function paintToDo(text) {
  if (text !== "") {
    const li = document.createElement("li");
    li.style.overflow = "hidden";
    const delbtn = document.createElement("i");
    delbtn.addEventListener("click", deleteToDo);
    delbtn.className = "fas fa-backspace";
    delbtn.classList.add("paintAdd");
    const span = document.createElement("span");
    span.style.float = "left";
    span.style.fontSize = "15px";
    span.style.letterSpacing = "0.5px";
    span.innerText = "- " + text;
    li.appendChild(delbtn);
    li.appendChild(span);
    let lis = document.querySelectorAll("li");
    for (let i = 0; i <= lis.length; i++) {
      li.dataset.id = i + 1;
    }
    toDoList.appendChild(li);
  }
}

function deleteToDo(e) {
  let confirm_delete = confirm("삭제하시겠습니까?");
  if (confirm_delete === true) {
    let btn = e.target;
    let li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = textData.filter(function(toDo) {
      return toDo.id !== parseInt(li.dataset.id);
    });
    textData = cleanToDos;
    localStorage.setItem(todayKeyValue, JSON.stringify(textData));
  }
}
function delAll(e) {
  let length = e.target.parentNode.parentNode.children[2].children.length;
  if (length) {
    if (confirm(`list를 전부 삭제하시겠습니까?`)) {
      for (let i = 0; i < length; i++) {
        e.target.parentNode.parentNode.children[2].children[0].remove();
      }
      localStorage.removeItem(todayKeyValue);
    }
  }
}
showCalendar(currentYear, currentMonth);
loadToDos(todayKeyValue);
