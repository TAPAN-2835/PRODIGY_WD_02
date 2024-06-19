// time2.js

let startTime, updatedTime, difference, tInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById('display');
const lapsList = document.getElementById('laps');

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('pause').addEventListener('click', pauseTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateDisplay, 10);
        running = true;
    }
}

function pauseTimer() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = '00:00:00.00';
    lapsList.innerHTML = '';
    lapCount = 0;
}

function recordLap() {
    if (running) {
        lapCount++;
        const lapTime = formatTime(new Date().getTime() - startTime);
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `<strong>Lap ${lapCount}:</strong> ${lapTime}`;
        lapsList.appendChild(lapItem);
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime() - startTime;
    display.innerHTML = formatTime(updatedTime);
}

function formatTime(time) {
    let date = new Date(time);
    let minutes = date.getUTCMinutes();
    let seconds = date.getUTCSeconds();
    let milliseconds = date.getUTCMilliseconds();
    return (
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds + ':' +
        (milliseconds < 100 ? '0' : '') + (milliseconds < 10 ? '0' : '') + milliseconds
    );
}
