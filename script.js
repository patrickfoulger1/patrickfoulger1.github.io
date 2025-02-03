const remainingTime = document.getElementById('remainingTime')
const add30Sec = document.getElementById('add30Sec')
const start = document.getElementById('start')
add30Sec.addEventListener('click', () => {
    let formattedRemainingTime = Number(remainingTime.textContent)
    remainingTime.textContent = formattedRemainingTime += 30
})
let intervalID
start.addEventListener('click', () => {
    if (start.textContent === 'Pause') {
        clearInterval(intervalID)
    }
    else {
        startCount()
    }
})
function startCount() {
    let formattedRemainingTime = Number(remainingTime.textContent)
    // if (formattedRemainingTime === 0) {
    //     return
    // }
    intervalID = setInterval(() => {
        remainingTime.textContent = formattedRemainingTime - 1
    }, 1000)
    start.textContent = 'Pause'
}

function stopCount(intervalID) {
    clearInterval(intervalID)
    start.textContent = 'Resume'
}