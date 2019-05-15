//---------------------------------------------calendar
//-----------------------------------------------------
//---------------------------------------------calendar

var today = new Date();
var date = new Date();
var TODOS_LS = null;

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

function prevCalendar() {
  today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  buildCalendar();
}

function nextCalendar() {
  today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
  buildCalendar();
}
function buildCalendar() {
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
    cell.style.cursor = "pointer";
    cell.addEventListener("click", function() {
      point();
      bringDays();
    });

    if (cnt % 7 == 1) {
      cell.innerHTML = i;
    }
    if (cnt % 7 == 0) {
      cell.innerHTML = i;
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
}
function point() {
  var Point = event.target.firstChild.nodeValue;
  pointDate.innerHTML = Point;
  pointDay.innerHTML =
    weekText[new Date(today.getFullYear(), today.getMonth(), Point).getDay()];
  if (document.querySelector(".pointDay") == null) {
    event.target.classList.add("pointDay");
  } else {
    document.querySelector(".pointDay").classList.remove("pointDay");
  }
  event.target.classList.add("pointDay");
  TODOS_LS = parseInt(Point);
}

// -------------------------------------------- todo list
// ------------------------------------------------------
// -------------------------------------------- todo list

function bringDays() {
  if (TODOS_LS === null) {
    TODOS_LS = today.getDate();
  } else {
    TODOS_LS = parseInt(event.target.firstChild.nodeValue);
  }
  const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input"),
    toDoList = document.querySelector(".js-toDoList");
    a = document.getElementById('1');
  let toDos = [];

  function deleteToDo(event) {
    //var confirm_delete = confirm("삭제하시겠습니까?");
    //if (confirm_delete === true) {
    const btn = event.target;
    const li = btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos = toDos.filter(function(toDo) {
      return toDo.id !== parseInt(li.id);
    });
    toDos = cleanToDos;
    saveToDos();
  }
  //}

  function saveToDos() {
    //   debugger;
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
  }

  function paintToDo(text) {
    if (text !== "") {
      // 리스트 넣을 li 엘리먼트 생성
      const li = document.createElement("li");
      li.style.overflow = "hidden";
      //삭제버튼 생성
      const delBtn = document.createElement("i");
      delBtn.style.cursor = "pointer";
      delBtn.addEventListener("click", deleteToDo);
      const span = document.createElement("span");
      span.style.float = "left";
      span.style.fontSize = "15px";
      span.style.letterSpacing = "0.5px";
      const newId = toDos.length + 1;
      delBtn.className = "fas fa-backspace";
      delBtn.style.float = "right";
      span.innerText = "- " + text;

      li.appendChild(delBtn);
      li.appendChild(span);
      li.id = newId;

      //console.log(a);
      //만약 동일한 id가 html에 있으면 리스트에 appendchild하지않음
      //console.log(toDoList.getElementsByTagName('li'));

      const listItems = toDoList.getElementsByTagName('li');

      if (listItems.length) {
        if(listItems[0].id !== li.id){
        toDoList.appendChild(li);
        };
      }else{
        toDoList.appendChild(li); 
      }

      const toDoObj = {
        text: text,
        id: toDos.length + 1
      };
      toDos.push(toDoObj);
      //배열 클리어해야함
      saveToDos();
    }
  }
  

  function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
  }

  function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
      const parsedToDos = JSON.parse(loadedToDos);
      parsedToDos.forEach(function(toDo) {
        paintToDo(toDo.text);
      });
    }
  }

  function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
  }

  init();
}
