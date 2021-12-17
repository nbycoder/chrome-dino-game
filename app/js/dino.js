import { incrementCustomProperty, getCustomProperty, setCustomProperty } from "./UpdateCustomProperty.js"

const dino = document.querySelector('[data-dino]')
const JUMP_SPEED = 0.45
const GRAVITY = 0.0015
const DINO_FRAME_COUNT = 2 //? bc we have two dino images
const FRAME_TIME = 100 //? milliseconds

let yVelocity;
let isJumping;
let dinoFrame;
let currentFrameTime;

export function setupDino() {
    isJumping = false
    dinoFrame = 0
    currentFrameTime = 0
    yVelocity = 0
    setCustomProperty(dino, "--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)
}

export function updateDino(delta, speedScale) {
    handleRun(delta, speedScale)
    handleJump(delta)
}

export function getDino() {
    return dino.getBoundingClientRect()
}
export function setDinoLose() {
    dino.src = `images/dino-lose.png`
}
function handleRun(delta, speedScale) {
    if (isJumping) {
        dino.src = `images/dino-stationary.png`
        return
    }

    if (currentFrameTime >= FRAME_TIME) {
        dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT //~ add 1 to current frame and sets the remainder of the original frame count and sets that value
        dino.src = `images/dino-run-${dinoFrame}.png` //! we have ${dinoFrame} because our value in dinoFrame is either 0 or 1
        currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale
}

function handleJump(delta) {
    if (!isJumping) return

    incrementCustomProperty(dino, "--bottom", yVelocity *delta)

    if (getCustomProperty(dino, "--bottom") <= 0) {
        setCustomProperty(dino, "--bottom", 0)
        isJumping = false
    }
    yVelocity -= GRAVITY * delta
}

function onJump(e) {
    if (e.code !== "Space" || isJumping) return 

    yVelocity = JUMP_SPEED
    isJumping = true
}