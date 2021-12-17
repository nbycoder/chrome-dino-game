import { updateGround, setupGround } from './ground.js'
import { updateDino, setupDino } from './dino.js'
import { updateCactus, setupCactus } from './cactus.js'

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
    lastTime = time
    window.requestAnimationFrame(update) 
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

