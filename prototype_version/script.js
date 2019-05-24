// let today = new Date();
// let currentMonth = today.getMonth();
// let currentYear = today.getFullYear();

// let months = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December"
// ];

// let monthAndYear = document.getElementById('monthAndYear');

// showCalendar(currentMonth,currentYear);

// function showCalendar(month,year){
//     //숫자 넣는 것으로 날짜 표현 달은 -1
//     let firstDay = new Date(year,month).getDay();
//     let daysInMonth = 32 - new Date(year,month,32).getDate();
//     let tbl = document.getElementById("calendar-body");
//     tbl.innerHTML = "";
//     monthAndYear.innerHTML = months[month] + ''+year;
//     let date = 1;
//     for(let i = 0; i < 6; i++){
//         let row = document.createElement('tr');

//         for(let j = 0; j<7;j++){

//             if(i===0 && j < firstDay){
//                 let cell = document.createElement('td');
//                 let cellText = document.createTextNode("");
//                 cell.appendChild(cellText);
//                 row.appendChild(cell);
//             }else if(date > daysInMonth){
//                 break;
//             }else{let cell = document.createElement('td');
//                 let cellText = document.createTextNode(date);
//                 cell.appendChild(cellText);
//                 row.appendChild(cell);

//             }

//             date++;
//         }

//         tbl.appendChild(row);
//     }
// }
// function previous(){
//     currentYear = (currentMonth === 0 )? currentYear -1 : currentYear ;
//     currentMonth = (currentMonth === 0 )? 11 : currentMonth -1;
//     showCalendar(currentMonth,currentYear);
// }

// function next(){
//     currentYear = (currentMonth === 11 )? currentYear +1 : currentYear ;
//     currentMonth = (currentMonth === 11 )? 0 : currentMonth +1;
//     showCalendar(currentMonth,currentYear);
// }

function CALENDAR() {
  this.today = new Date();
  this.currentMonth = this.today.getMonth();
  this.currentYear = this.today.getFullYear();
  this.previous = document.getElementById("previous");
  this.next = document.getElementById("next");

  this.months = [
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

  this.monthAndYear = document.getElementById("monthAndYear");
  this.init();
}

CALENDAR.prototype = {
  init: function() {
    const self = this;
    
    this.showCalendar(this.currentMonth, this.currentYear);
    this.eventsTrigger(self);
  },
  showCalendar: function(month, year) {
    //숫자 넣는 것으로 날짜 표현 달은 -1
    let firstDay = new Date(year, month).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    let tbl = document.getElementById("calendar-body");
    tbl.innerHTML = "";
    monthAndYear.innerHTML = this.months[month] + "" + year;
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
          let cellText = document.createTextNode(date);
          cell.appendChild(cellText);
          row.appendChild(cell);
        }
        date++;
      }
      tbl.appendChild(row);
    }
  },

  eventsTrigger : function(self){
    this.previous.addEventListener('click',function(){
        self.currentYear = self.currentMonth === 0 ? self.currentYear - 1 : self.currentYear;
        self.currentMonth = self.currentMonth === 0 ? 11 : self.currentMonth - 1;
        //console.log(self.currentMonth);
        self.showCalendar(self.currentMonth, self.currentYear);
    });
    this.next.addEventListener('click',function(){
        self.currentYear = self.currentMonth === 11 ? self.currentYear + 1 : self.currentYear;
        self.currentMonth = self.currentMonth === 11 ? 0 : self.currentMonth + 1;
        self.showCalendar(self.currentMonth, self.currentYear);
    });
  },
};

(function() {
  new CALENDAR();
})();
