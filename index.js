var today = new Date();
var date = new Date();
function prevCalendar() {
  today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  buildCalendar();
}

function nextCalendar() {
  today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
  buildCalendar();
}
function buildCalendar() {
  var monthText = [
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
  ];
  var weekText = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  var doMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  var lastDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  var tbCalendar = document.getElementById("calendar");
  var tbCalendarYM = document.getElementById("tbCalendarYM");
  var pointDate = document.getElementById("pointDate");
  var pointDay = document.getElementById("pointDay");
  pointDate.innerHTML = today.getDate();
  pointDay.innerHTML =
    weekText[
      new Date(today.getFullYear(), today.getMonth(), today.getDate()).getDay()
    ];

  tbCalendarYM.innerHTML =
    monthText[today.getMonth()] + " " + today.getFullYear();

  while (tbCalendar.rows.length > 2) {
    tbCalendar.deleteRow(tbCalendar.rows.length - 1);
  }
  var row = null;
  row = tbCalendar.insertRow();
  var cnt = 0;
  for (i = 0; i < doMonth.getDay(); i++) {
    cell = row.insertCell();
    cnt = cnt + 1;
  }

  for (i = 1; i <= lastDate.getDate(); i++) {
    cell = row.insertCell();
    cell.innerHTML = i;
    cnt = cnt + 1;
    cell.addEventListener("click", point);

    if (cnt % 7 == 1) {
      cell.innerHTML = "<font>" + i;
    }
    if (cnt % 7 == 0) {
      cell.innerHTML = "<font>" + i;
      row = calendar.insertRow();
    }
    if (
      today.getFullYear() == date.getFullYear() &&
      today.getMonth() == date.getMonth() &&
      i == date.getDate()
    ) {
      cell.bgColor = "black";
      cell.style.color = "white";
      cell.style.borderRadius = "10px";
    }
  }
  function point() {
    Point = event.target.firstChild.nodeValue;
    pointDate.innerHTML = Point;
    pointDay.innerHTML =
      weekText[new Date(today.getFullYear(), today.getMonth(), Point).getDay()];
    if (document.querySelector(".pointDay") == null) {
      event.target.classList.add("pointDay");
    } else {
      document.querySelector(".pointDay").classList.remove("pointDay");
    }
    event.target.classList.add("pointDay");
  }
}

// ----------------------------------------- todo list 
// --------------------------------------------------- 
// ---------------------------------------------------
// ----------------------------------------- todo list 

const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

function paintToDo(text) {
    // 리스트 넣을 li 엘리먼트 생성 
  const li = document.createElement("li");
  //삭제버튼 생성
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  const span = document.createElement("span");
  span.innerText = text;
  li.appendChild(delBtn);
  //li 안에 버튼 넣기
  li.appendChild(span);
  //li안에 span 넣기
  toDoList.appendChild(li);
  //toDoList안에 li 넣기 
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  //쓰고 엔터시 빈공간
  toDoInput.value = "";
}

function loadToDos() {
  const toDos = localStorage.getItem(TODOS_LS);
  if (toDos !== null) {
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
