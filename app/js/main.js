import { updateGround, setupGround } from './ground.js'
import { updateDino, setupDino, getDino, setDinoLose } from './dino.js'
import { updateCactus, setupCactus, getCactus } from './cactus.js'

const WORLD_WIDTH = 100
const WORLD_HEIGHT = 30
//? ^values in units
const SPEED_SCALE_INCREASE = 0.00001

const world = document.querySelector('[data-world]')
const scoreElem = document.querySelector('[data-score]')
const startElem = document.querySelector('[data-start]')

setPixelToWorldScale()
window.addEventListener('resize', setPixelToWorldScale) //* whenever screen size changes, fire function
document.addEventListener('keydown', handleStart, {once: true})

//! update loops
let lastTime;
let speedScale;
let score;
function update(time) {
    if (lastTime == null) { //! rate dino moves at
        lastTime = time
        window.requestAnimationFrame(update) 
        return    
    }
    const delta = time - lastTime
    updateGround(delta, speedScale) //! loops ground
    updateDino(delta, speedScale)
    updateCactus(delta, speedScale)
    updateSpeedScale(delta) //! increases speed
    updateScore(delta)
    if (checkLose()) return handleLose()
    lastTime = time
    window.requestAnimationFrame(update) 
}

function checkLose() {
    const dinoRect = getDino()
    //! if any of the functions return true all of them do
    return getCactus().some(rect => isCollision(rect, dinoRect))
}

function isCollision(rect1, rect2) {
    //? check if the rectangles collide
    return (
        rect1.left < rect2.right && 
        rect1.top < rect2.bottom && 
        rect1.right > rect2.left && 
        rect1.bottom > rect2.top
        )
}

function updateSpeedScale(delta) {
    speedScale += delta * SPEED_SCALE_INCREASE
}

function updateScore(delta) {
    score += delta * 0.01 //! for every second that passes we get 10 point
    scoreElem.textContent = Math.floor(score)
}

function handleStart() { //! every time we start the game
    lastTime = null 
    speedScale = 1
    score = 0
    setupGround()
    setupDino()
    setupCactus()
    startElem.classList.add("hide") //! this is the hide class from the css file! it's only added *after* we press the key!
    window.requestAnimationFrame(update) 
}

function handleLose() {
    setDinoLose()
    setTimeout(() => {
        startElem.classList.remove("hide")
        document.addEventListener("keydown", handleStart, {once: true})
    }, 100)
}

function setPixelToWorldScale() {
    let worldToPx;
    if (window.innerWidth / window.innerHeight < WORLD_WIDTH / WORLD_HEIGHT ) { //! if our window is wider than our world
        worldToPx = window.innerWidth / WORLD_WIDTH //! scale based on width
        }
    else {
        worldToPx = window.innerHeight / WORLD_HEIGHT //! scale based on height
    }

 //! styling the width and height removed from css
 world.style.width = `${WORLD_WIDTH * worldToPx}px`
 world.style.height = `${WORLD_HEIGHT * worldToPx}px`
}

