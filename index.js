let today = new Date(),
  temp = new Date(),
  currentMonth = today.getMonth(),
  currentYear = today.getFullYear(),
  monthAndYear = document.getElementById("monthAndYear"),
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
  todayKeyValue = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

window.prevCalendar = prevCalendar;
window.nextCalendar = nextCalendar;

function prevCalendar() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  if (currentMonth === temp.getMonth() && currentYear === temp.getFullYear()) {
    today = new Date(today.getFullYear(), today.getMonth() - 1, temp.getDate());
    showCalendar(currentYear, currentMonth);
    loadToDos(temp.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear());
  } else {
    today = new Date(today.getFullYear(), today.getMonth() - 1);
    todayKeyValue = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear()
    showCalendar(currentYear, currentMonth);
    loadToDos(today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear());
  }
}

function nextCalendar() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  if (currentMonth === temp.getMonth() && currentYear === temp.getFullYear()) {
    today = new Date(today.getFullYear(), today.getMonth() + 1, temp.getDate());
    showCalendar(currentYear, currentMonth);
    loadToDos(temp.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear());
  } else {
    today = new Date(today.getFullYear(), today.getMonth() + 1);
    todayKeyValue = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();
    showCalendar(currentYear, currentMonth);
    loadToDos(today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear());
  }
}

function showCalendar(year, month) {
  toDoForm.addEventListener("submit", handleSubmit);
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
        cell.id =
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
  todayKeyValue = cell.id;
  loadToDos(cell.id);
  write(cell.id);
}

if (JSON.parse(localStorage.getItem(todayKeyValue)) === null) {
  textData = [];
} else {
  textData = JSON.parse(localStorage.getItem(todayKeyValue));
}

function write(cell, currentValue) {
  if (currentValue === undefined || currentValue === "") return;
  const keyId = document.getElementById(cell).id;
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
  const textObj = { text: currentValue };
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
  const loadId = document.getElementById(cell).id;
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
    const span = document.createElement("span");
    span.style.float = "left";
    span.style.fontSize = "15px";
    span.style.letterSpacing = "0.5px";
    span.innerText = "- " + text;
    li.appendChild(span);
    toDoList.appendChild(li);
  }
}

showCalendar(currentYear, currentMonth);
loadToDos(todayKeyValue);
