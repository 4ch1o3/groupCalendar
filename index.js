window.onload = function() { buildCal(); }

let currentMon = new Date();
let today = new Date();
today.setHours(0,0,0,0);

function buildCal() {
    let firstDate = new Date(currentMon.getFullYear(), currentMon.getMonth(), 1);
    let lastDate = new Date(currentMon.getFullYear(), currentMon.getMonth() + 1, 0);

    let tbody_Cal = document.querySelector(".Calendar > tbody");
    document.getElementById("calYear").innerText = currentMon.getFullYear();
    document.getElementById("calMonth").innerText = lPad(currentMon.getMonth() + 1);

    while(tbody_Cal.rows.length > 0) {
        tbody_Cal.deleteRow(tbody_Cal.rows.length-1);
    }

    let currentRow = tbody_Cal.insertRow();

    for(let i=0; i<firstDate.getDay(); i++) {
        let currentCol = currentRow.insertCell();
    }

    for(let currentDay = firstDate; currentDay <= lastDate; currentDay.setDate(currentDay.getDay())+1) {
        let currentCol = currentRow.insertCell();
        currentCol.innerText = lPad(currentDay.getDate());

        if (currentDay < today) { // 지난날인 경우
            currentCol.className = "pastDay";
        }
        else if (
            currentDay.getFullYear() == today.getFullYear() &&
            currentDay.getMonth() == today.getMonth() &&
            currentDay.getDate() == today.getDate()
        )
        { // 오늘인 경우
            currentCol.className = "today";
            currentCol.onclick = function ()
            {
            choiceDate(this);
            }
        }
        else { // 미래인 경우
            currentCol.className = "futureDay";
            currentCol.onclick = function ()
            {
            choiceDate(this);
            }
        }
    }
}

function choiceDate(currentCol) {
    if (document.getElementsByClassName("choiceDay")[0]) { // 기존에 선택한 날짜가 있으면
    document.getElementsByClassName("choiceDay")[0].classList.remove("choiceDay"); // 해당 날짜의 "choiceDay" class 제거
    }
    currentCol.classList.add("choiceDay"); // 선택된 날짜에 "choiceDay" class 추가
}

function prevCalendar() {
    currentMon = new Date(
        currentMon.getFullYear(),
        currentMon.getMonth() - 1,
        currentMon.getDate()
  ); // 현재 달을 1 감소
  buildCalendar(); // 달력 다시 생성
}

function nextCalendar() {
    currentMon = new Date(
        currentMon.getFullYear(),
        currentMon.getMonth() + 1,
        currentMon.getDate()
  ); // 현재 달을 1 증가
  buildCalendar(); // 달력 다시 생성
}