var breakCounter = 5;
var sessionCounter = 25;
var colorFlag = 0;
var timerFlag = 0;
var currentTime = 0;
var workOrBreak = 0;
var time;


// ----------- Selector Variables ------------


var breaker = document.getElementById('break');
var breakPlus = document.getElementById('break-plus');
var breakMinus = document.getElementById('break-minus');
var breakTitle = document.getElementById('breakTitle');

var session = document.getElementById('session');
var sessionPlus = document.getElementById('session-plus');
var sessionMinus = document.getElementById('session-minus');
var sessionTitle = document.getElementById('sessionTitle');

var reset = document.getElementById('reset');
var timer = document.getElementById('timer');
var theWindow = document.getElementById('window');
var start = document.getElementById('start');
var pause = document.getElementById('pause');
var resume = document.getElementById('resume');
var container = document.getElementById('container');


// ------------ BUTTONS -------------


breakPlus.addEventListener("click", function () {
  if (timerFlag === 0) {
    breakCounter ++;
    breaker.innerHTML = breakCounter;
  }
});

breakMinus.addEventListener("click", function () {
  if (breakCounter > 1 && timerFlag === 0) {
    breakCounter --;
    breaker.innerHTML = breakCounter;
  }
});

sessionPlus.addEventListener("click", function () {
  if (timerFlag === 0) {
    sessionCounter ++;
    session.innerHTML = sessionCounter;
    timer.innerHTML = sessionCounter + ":00";
  }
});

sessionMinus.addEventListener("click", function () {
  if (sessionCounter > 1 && timerFlag === 0) {
    sessionCounter --;
    session.innerHTML = sessionCounter;
    timer.innerHTML = sessionCounter + ":00";
  }
});

start.addEventListener("click", function () {
  time = sessionCounter * 60;
  startTimer(time, timer);
  start.style = "display: none";
  pause.style = "display: inline-block";
});

pause.addEventListener("click", function () {
  clearInterval(timerFlag);
  console.log(timerFlag);
  console.log(currentTime);
  pause.style = "display: none";
  resume.style = "display: inline-block";
});

resume.addEventListener("click", function () {
  startTimer(currentTime, timer);
  resume.style="display: none";
  pause.style="display: inline-block";
});

reset.addEventListener("click", function () {
  clearInterval(timerFlag);
  colorFlag = 1;
  colorSwap();
  timerFlag = 0;
  breakCounter = 5;
  sessionCounter = 25;
  start.style = "display: inline-block";
  resume.style="display: none";
  pause.style="display: none";
  breaker.innerHTML = breakCounter;
  session.innerHTML = sessionCounter;
  timer.innerHTML = sessionCounter + ":00";
});


// -------------- Functions ---------------

function colorSwap () {
  if (colorFlag === 0) {
    colorFlag = 1;
    theWindow.classList.remove("colorBluePink");
    theWindow.classList.add("colorPinkBlue");
    start.classList.remove("colorBluePink");
    start.classList.add("colorPinkBlue");
    reset.classList.remove("colorBluePink");
    reset.classList.add("colorPinkBlue");
    resume.classList.remove("colorBluePink");
    resume.classList.add("colorPinkBlue");
    pause.classList.remove("colorBluePink");
    pause.classList.add("colorPinkBlue");
    breakPlus.classList.remove("colorBluePink");
    breakPlus.classList.add("colorPinkBlue");
    sessionPlus.classList.remove("colorBluePink");
    sessionPlus.classList.add("colorPinkBlue");
    sessionMinus.classList.remove("colorPinkBlue");
    sessionMinus.classList.add("colorsBluePink");
    breakMinus.classList.remove("colorPinkBlue");
    breakMinus.classList.add("colorsBluePink");
    container.style = "background-color: #91A7D0";

  } else {
    colorFlag = 0;
    theWindow.classList.remove("colorPinkBlue");
    theWindow.classList.add("colorBluePink");
    start.classList.remove("colorPinkBlue");
    start.classList.add("colorBluePink");
    reset.classList.remove("colorPinkBlue");
    reset.classList.add("colorBluePink");
    resume.classList.remove("colorPinkBlue");
    resume.classList.add("colorBluePink");
    pause.classList.remove("colorPinkBlue");
    pause.classList.add("colorBluePink");
    breakPlus.classList.remove("colorPinkBlue");
    breakPlus.classList.add("colorBluePink");
    sessionPlus.classList.remove("colorPinkBlue");
    sessionPlus.classList.add("colorBluePink");
    sessionMinus.classList.remove("colorsBluePink");
    sessionMinus.classList.add("colorPinkBlue");
    breakMinus.classList.remove("colorsBluePink");
    breakMinus.classList.add("colorPinkBlue");
    container.style = "background-color: #F6CAC9";
  }
}


function startTimer (duration, display) {
  var start = Date.now(),
      diff,
      minutes,
      seconds;

  function timer() {
    diff = duration - (((Date.now() - start) / 1000) | 0); // calculates how much time has passed since we started the timer

    currentTime = diff; // log currentTime so we can start and pause

    minutes = (diff / 60) | 0;
    seconds = (diff % 60) | 0;

    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = minutes + ":" + seconds;

    if (diff <= 0) {
      clearInterval(timerFlag);
      timerFlag = 0;
      nextTimer();
      }
    }

  timer();
  timerFlag = setInterval(timer, 1000);
}

function nextTimer () {
  if (workOrBreak === 0) {
    workOrBreak = 1;
    colorSwap();
    time = breakCounter * 60;
    startTimer(time, timer);
  } else {
    workOrBreak = 0;
    colorSwap();
    time = sessionCounter * 60;
    startTimer(time, timer);
  }
}
