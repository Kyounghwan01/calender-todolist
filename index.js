
let today = new Date(); //sat May 25 2019
let currentMonth = today.getMonth(); //4
let currentYear = today.getFullYear(); //2019
let monthAndYear = document.getElementById("monthAndYear");
let todayKeyValue = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

let monthText = [
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
let weekText = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

function prevCalendar() {
  currentYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  currentMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  today = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  showCalendar(currentYear, currentMonth);
}

function nextCalendar() {
  currentYear = currentMonth === 11 ? currentYear + 1 : currentYear;
  currentMonth = currentMonth === 11 ? 0 : currentMonth + 1;
  today = new Date(today.getFullYear(), today.getMonth() + 1, today.getDate());
  showCalendar(currentYear, currentMonth);
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

let pointId;

function point(cell) {
  let Point = event.target.firstChild.nodeValue;
  pointDate.innerHTML = Point;
  pointDay.innerHTML =
    weekText[new Date(today.getFullYear(), today.getMonth(), Point).getDay()];
  if (document.querySelector(".pointDay") == null) {
    event.target.classList.add("pointDay");
  } else {
    document.querySelector(".pointDay").classList.remove("pointDay");
  }
  event.target.classList.add("pointDay");
  pointId = document.getElementById(cell.id).id;
  loadToDos(cell.id);
  write(cell.id);
  
}

// -------------------------------------------- todo list
// ------------------------------------------------------
// -------------------------------------------- todo list

let textData = [];

if(JSON.parse(localStorage.getItem(todayKeyValue)) === null){
  textData = [];
  console.log(JSON.parse(localStorage.getItem(todayKeyValue)));
}else{
  textData = (JSON.parse(localStorage.getItem(todayKeyValue)));
}


let tempKeyId;
function write(cell, currentValue) {
  if (currentValue === undefined || currentValue === "") return;
  const keyId = document.getElementById(cell).id;
  if(tempKeyId === undefined){
    tempKeyId = keyId;
  }
  if(tempKeyId !== keyId){
    if(JSON.parse(localStorage.getItem(keyId)) === null){
      textData = [];
      console.log(JSON.parse(localStorage.getItem(keyId)));
    }else{
      textData = (JSON.parse(localStorage.getItem(keyId)));
      //textData.push(JSON.parse(localStorage.getItem(keyId)));
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
  if(pointId === undefined){
    pointId = todayKeyValue;
  }
  //이거 문제얌!, cell에 들어가는 key 값
  write(pointId, currentValue);
  toDoInput.value = "";
}

function loadToDos(cell) {
  const loadId = document.getElementById(cell).id;
  const loadedToDos = JSON.parse(localStorage.getItem(loadId));
  if(loadedToDos){
    sampleData = loadedToDos;
  }
  //기존 li 다 삭제
  let lis = document.querySelectorAll("li");
  for (let i = 0; (li = lis[i]); i++) {
    li.parentNode.removeChild(li);
  }
  //li에 추가할 text 출력
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
    //삭제버튼 생성
    // const delBtn = document.createElement("i");
    // delBtn.style.cursor = "pointer";
    // delBtn.addEventListener("click", deleteToDo);
    const span = document.createElement("span");
    span.style.float = "left";
    span.style.fontSize = "15px";
    span.style.letterSpacing = "0.5px";
    //const newId = toDos.length + 1;
    // delBtn.className = "fas fa-backspace";
    // delBtn.style.float = "right";
    span.innerText = "- " + text;

    //li.appendChild(delBtn);
    li.appendChild(span);
    //li.id = newId;

    //console.log(a);
    //만약 동일한 id가 html에 있으면 리스트에 appendchild하지않음
    //console.log(toDoList.getElementsByTagName('li'));

    // const listItems = toDoList.getElementsByTagName("li");

    // if (listItems.length) {
    //   if (listItems[0].id !== li.id) {
    //     toDoList.appendChild(li);
    //   }
    // } else {
    //   toDoList.appendChild(li);
    // }
    toDoList.appendChild(li);
  }
}

showCalendar(currentYear, currentMonth);
loadToDos(todayKeyValue);
