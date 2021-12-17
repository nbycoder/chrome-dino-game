import { getCustomProperty, incrementCustomProperty, setCustomProperty } from "./UpdateCustomProperty.js";

const SPEED = 0.05
const CACTUS_INTERVAL_MIN = 500
const CACTUS_INTERVAL_MAX = 2000
const world = document.querySelector('[data-world]')

let nextCactusTime;

export function setupCactus() {
    nextCactusTime = CACTUS_INTERVAL_MIN;
    document.querySelectorAll('[data-cactus]').forEach(cactus => {cactus.remove()})
}

export function updateCactus(delta, speedScale) {
    document.querySelectorAll('[data-cactus]').forEach(cactus => {
        incrementCustomProperty(cactus, "--left", delta * speedScale * SPEED * -1)

        if(getCustomProperty(cactus, "--left") <= -100) { 
            cactus.remove()

        //* if the cactus is way on the edge of our screen just remove it
        }
    })

    if (nextCactusTime <= 0) {
        createCactus()
        nextCactusTime = randomNumberBetween(CACTUS_INTERVAL_MIN, CACTUS_INTERVAL_MAX) / speedScale
    }
    nextCactusTime -= delta
}

export function getCactus() {
    return [...document.querySelectorAll('[data-cactus]')].map(cactus => {
        return cactus.getBoundingClientRect() //! this returns a rectangle for every cactus on the screen so we can interact with it
    })
}

function createCactus() {
    const cactus = document.createElement("img")
    cactus.dataset.cactus = true //? dataset = data-* element, cactus is what comes afterward, so adds data-cactus attribute to this div
    cactus.src = `images/cactus.png`
    cactus.classList.add("cactus")
    setCustomProperty(cactus, "--left", 100)
    world.append(cactus)
}

function randomNumberBetween(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
    //? get random number between 0 and 1 
    //? to make sure this number falls between our min and max we multiply it by the difference between min and max + 1
    //? the + min at the end makes sure the minimum value we can get is the min
}